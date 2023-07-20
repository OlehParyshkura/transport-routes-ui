<template>
  <div>
    <Spinner v-if="pending" />
    <template v-else>
      <h2 class="text-center text-2xl">Edit route</h2>
      <div class="flex flex-col items-end w-100">
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          @click="deleteRoute"
        >
          delete
        </button>
      </div>
      <RouteForm :initial-data="routeData" :on-submit="updateRoute" />
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const routeData = ref({});
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
    const routeId = route.params.id;
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const result = await $fetch(`${apiUrl}/routes/${routeId}`);
    result.departureDate = convertDate(result.departureDate);
    result.completionDate = convertDate(result.completionDate);
    routeData.value = result;
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  } finally {
    pending.value = false;
  }
});

const deleteRoute = async () => {
  const route = useRoute();
  const routeId = route.params.id;
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/routes/${routeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const toast = useToast();
    toast.success('Route deleted');
    navigateTo('/routes');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};

const updateRoute = async (formData) => {
  const route = useRoute();
  const routeId = route.params.id;
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/routes/${routeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const toast = useToast();
    toast.success('Route updated');
    navigateTo('/routes');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};
</script>

<style scoped></style>
