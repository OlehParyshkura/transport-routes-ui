<template>
  <div class="flex items-center justify-center">
    <div class="w-96 mx-auto">
      <VForm
        v-slot="{ meta: formMeta, errors: formErrors }"
        class="bg-white p-5 rounded-lg"
        :validation-schema="schema"
        :initial-values="initialValues"
        @submit="handleSubmit"
      >
        <Input
          name="startCity"
          label="Start city"
          placeholder="Start city"
          class="mb-4"
        />
        <Input
          name="endCity"
          label="End city"
          placeholder="End city"
          class="mb-4"
        />
        <Input
          type="number"
          name="distance"
          label="Distance"
          placeholder="Distance"
          class="mb-4"
        />
        <Input
          type="date"
          name="departureDate"
          label="Departure date"
          placeholder="Departure date"
          class="mb-4"
        />
        <Input
          type="date"
          name="completionDate"
          label="Completion date"
          placeholder="Completion date"
          class="mb-4"
        />

        <Select
          name="requiredTransport"
          label="Required transport"
          :options="['CARGO', 'PASSENGER']"
          class="mb-4"
        />
        <Input
          type="number"
          name="expectedRevenue"
          label="Expected revenue"
          placeholder="Expected revenue"
          class="mb-4"
        />
        <Select
          name="status"
          label="Status"
          :options="['PENDING', 'IN_PROGRESS', 'COMPLETED']"
          class="mb-4"
        />
        <Input
          name="transportId"
          label="Transport id"
          placeholder="Transport id"
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
          class="text-white font-bold py-2 px-4 rounded mt-4"
          :class="{
            'bg-gray-500': !formMeta.valid,
            'bg-blue-700': formMeta.valid,
          }"
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

const validateExistingTransport = async (id) => {
  if (!id) {
    return true;
  }

  try {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const result = await $fetch(`${apiUrl}/transports/${id}`);

    return !!result;
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};

const handleSubmit = (values) => {
  const valuesToSubmit = { ...values };
  if (valuesToSubmit.transportId === '') {
    valuesToSubmit.transportId = null;
  }
  props.onSubmit(valuesToSubmit);
};

configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = object({
  startCity: string().required().label('Start city'),
  endCity: string().required().label('End city'),
  distance: number().positive().required(),
  departureDate: date().required().label('Departure date'),
  completionDate: date().required().label('Completion date'),
  requiredTransport: string()
    .required()
    .oneOf(['CARGO', 'PASSENGER'])
    .label('Required transport'),
  expectedRevenue: number()
    .integer()
    .positive()
    .required()
    .label('Expected revenue'),
  status: string().oneOf(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  transportId: number()
    .positive()
    .integer()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return undefined;
      }
      return value;
    })
    .test(
      'transport-doesnt-exist',
      "Transport with that id doesn't exist",
      (value) => validateExistingTransport(value)
    )
    .default(undefined),
});

const initialValues = props.initialData;
</script>

<style scoped></style>
