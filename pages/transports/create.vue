<template>
  <div>
    <h2 class="text-center text-2xl">Create transport</h2>
    <TransportForm :initial-data="{}" :on-submit="createTransport" />
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const createTransport = async (formData) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/transports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const toast = useToast();
    toast.success('Transport created');
    navigateTo('/');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};
</script>

<style scoped></style>
