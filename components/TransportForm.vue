<template>
  <div class="flex items-center justify-center">
    <div class="w-96 mx-auto">
      <VForm
        v-slot="{ meta: formMeta, errors: formErrors }"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        :validation-schema="schema"
        :initial-values="initialValues"
        @submit="handleSubmit"
      >
        <Input
          name="licensePlate"
          label="License Plate"
          placeholder="License Plate"
          class="mb-4"
        />
        <Select
          name="status"
          label="Status"
          :options="['AVAILABLE', 'BUSY']"
          class="mb-4"
        />
        <Input name="model" label="Model" placeholder="Model" class="mb-4" />
        <Input
          type="date"
          name="purchaseDate"
          label="Purchase Date"
          placeholder="Purchase Date"
          class="mb-4"
        />
        <Input
          type="number"
          name="mileage"
          label="Mileage"
          placeholder="Mileage"
          class="mb-4"
        />
        <Select
          name="transportType"
          label="Transport Type"
          :options="['CARGO', 'PASSENGER']"
          class="mb-4"
        />

        <template v-if="Object.keys(formErrors).length">
          <p class="text-red-600 font-bold mb-2">
            Please correct the following errors:
          </p>
          <ul>
            <li
              v-for="(message, field) in formErrors"
              :key="field"
              class="text-red-600"
            >
              {{ message }}
            </li>
          </ul>
        </template>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          :disabled="!formMeta.valid"
          type="submit"
        >
          Submit
        </button>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import { object, date, string, number } from 'yup';
import { configure } from 'vee-validate';
import { useToast } from 'vue-toastification';

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  onSubmit: { type: Function, required: true },
});

const validateExistingLicensePlate = async (
  licensePlate,
  initialLicencePlate
) => {
  if (!licensePlate) {
    return true;
  }
  if (initialLicencePlate === licensePlate) {
    return true;
  }

  try {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    const result = await $fetch(
      `${apiUrl}/transports-by-license-plate/${licensePlate}`
    );
    return !result;
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};

const handleSubmit = (values) => {
  props.onSubmit(values);
};

configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const schema = object({
  licensePlate: string()
    .required()
    .test(
      'license-plate-already-exist',
      'Transport with that license plate already exist',
      (value) =>
        validateExistingLicensePlate(value, props.initialData?.licensePlate)
    )
    .label('License Plate'),
  status: string().oneOf(['AVAILABLE', 'BUSY']).required().label('Status'),
  model: string().required().label('Model'),
  purchaseDate: date().required().label('Purchase Date'),
  mileage: number().positive().required().label('Mileage'),
  transportType: string()
    .oneOf(['CARGO', 'PASSENGER'])
    .required()
    .label('Transport type'),
});

const initialValues = props.initialData;
</script>

<style scoped></style>
