<template>
  <div>
    <h2 class="text-center text-2xl">Create route</h2>
    <RouteForm :initial-data="{}" :on-submit="createRoute" />
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const createRoute = async (formData) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  try {
    await $fetch(`${apiUrl}/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const toast = useToast();
    toast.success('Route created');
    navigateTo('/routes');
  } catch (e) {
    const toast = useToast();
    toast.error('Something went wrong');
    throw e;
  }
};
</script>

<style scoped></style>
