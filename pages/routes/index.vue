<template>
  <Spinner v-if="pending" />
  <div v-else>
    <div class="flex flex-col items-end w-100 py-2">
      <NuxtLink
        :to="`/routes/create`"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create route
      </NuxtLink>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">start city</th>
            <th scope="col" class="px-6 py-3">end city</th>
            <th scope="col" class="px-6 py-3">distance</th>
            <th scope="col" class="px-6 py-3">departure date</th>
            <th scope="col" class="px-6 py-3">completion date</th>
            <th scope="col" class="px-6 py-3">required transport</th>
            <th scope="col" class="px-6 py-3">expected revenue</th>
            <th scope="col" class="px-6 py-3">transport id</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="route in data.routes"
            :key="route.id"
            class="bg-white border-b"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ route.id }}
            </th>
            <td class="px-6 py-4">
              {{ route.startCity }}
            </td>
            <td class="px-6 py-4">
              {{ route.endCity }}
            </td>
            <td class="px-6 py-4">
              {{ route.distance }}
            </td>
            <td class="px-6 py-4">
              {{ route.departureDate }}
            </td>
            <td class="px-6 py-4">
              {{ route.completionDate }}
            </td>
            <td class="px-6 py-4">
              {{ route.requiredTransport }}
            </td>
            <td class="px-6 py-4">
              {{ route.expectedRevenue }}
            </td>
            <td class="px-6 py-4">
              <NuxtLink :to="`/transports/${route.transportId}`">
                {{ route.transportId }}
              </NuxtLink>
            </td>
            <td class="px-6 py-4">
              {{ route.status }}
            </td>
            <td class="px-6 py-4">
              <NuxtLink :to="`/routes/${route.id}`">
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
    const response = await $fetch(`${apiUrl}/routes`, { query: { page } });
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
