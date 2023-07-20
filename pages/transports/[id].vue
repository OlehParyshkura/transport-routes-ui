<template>
  <div>
    <Spinner v-if="pending" />
    <template v-else>
      <h2 class="text-center text-2xl">Edit transport</h2>
      <div class="flex flex-col items-end w-100">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          @click="deleteTransport"
        >
          delete
        </button>
      </div>
      <TransportForm
        :initial-data="transportData"
        :on-submit="updateTransport"
      />
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import TransportForm from '../../components/TransportForm';
const transportData = ref({});
const pending = ref(true);

const convertDate = (dateString) => {
  const dateObject = new Date(dateString);

  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

onMounted(async () => {
  try {
    const route = useRoute();
    const transportsId = route.params.id;
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
    const result = await $fetch(`${apiUrl}/transports/${transportsId}`);
    result.purchaseDate = convertDate(result.purchaseDate);
    transportData.value = result;
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  } finally {
    pending.value = false;
  }
});

const updateTransport = async (formData) => {
  const route = useRoute();
  const transportId = route.params.id;
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/transports/${transportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const toast = useToast();
    toast.success('Transport updated');
    navigateTo('/');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};
const deleteTransport = async () => {
  const route = useRoute();
  const routeId = route.params.id;
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/transports/${routeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const toast = useToast();
    toast.success('Transport deleted');
    navigateTo('/');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};
</script>

<style scoped></style>
