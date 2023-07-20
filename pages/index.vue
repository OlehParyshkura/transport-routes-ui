<template>
  <Spinner v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-end w-100 py-2">
      <NuxtLink
        to="/transports/create"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create transport
      </NuxtLink>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">license plate</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">model</th>
            <th scope="col" class="px-6 py-3">purchase date</th>
            <th scope="col" class="px-6 py-3">mileage</th>
            <th scope="col" class="px-6 py-3">transport type</th>
            <th scope="col" class="px-6 py-3">edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transport in data.transports"
            :key="transport.id"
            class="bg-white border-b"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ transport.id }}
            </th>
            <td class="px-6 py-4">
              {{ transport.licensePlate }}
            </td>
            <td class="px-6 py-4">
              {{ transport.status }}
            </td>
            <td class="px-6 py-4">
              {{ transport.model }}
            </td>
            <td class="px-6 py-4">
              {{ transport.purchaseDate }}
            </td>
            <td class="px-6 py-4">
              {{ transport.mileage }}
            </td>
            <td class="px-6 py-4">
              {{ transport.transportType }}
            </td>
            <td class="px-6 py-4">
              <NuxtLink :to="`/transports/${transport.id}`">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  edit
                </button>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :current-page="data.currentPage"
      :total-pages="data.totalPages"
      :go-to-page="goToPage"
    />
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import Spinner from '../components/Spinner';

const currentPage = ref(1);
const pending = ref(true);
const data = ref(null);

onMounted(() => {
  const page = useRouter().currentRoute.value.query.page;
  if (page && page !== currentPage.value) {
    goToPage(page);
  }
});

const goToPage = (page) => {
  currentPage.value = page;
  fetchDataForPage(page);
};

const fetchDataForPage = async (page) => {
  try {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    pending.value = true;
    const response = await $fetch(`${apiUrl}/transports`, { query: { page } });
    data.value = response;
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  } finally {
    pending.value = false;
  }
};

goToPage(currentPage.value);
</script>

<style scoped></style>
