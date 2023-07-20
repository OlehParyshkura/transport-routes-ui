<template>
  <div class="flex justify-center mt-4">
    <button
      class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l-full"
      :disabled="currentPage === 1"
      @click="handleGoToPage(currentPage - 1)"
    >
      Previous
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4"
      :class="{ 'bg-gray-500': page === currentPage }"
      @click="handleGoToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r-full"
      :disabled="currentPage === totalPages"
      @click="handleGoToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  goToPage: {
    type: Function,
    required: true,
  },
});

const handleGoToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    props.goToPage(page);
  }
};
</script>
