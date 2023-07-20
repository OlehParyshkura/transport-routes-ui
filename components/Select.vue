<template>
  <div class="field">
    <div class="label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <VField v-slot="{ field, meta }" :name="name">
            <select
              v-bind="field"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
              :class="{
                'border-green-500': meta.valid && meta.touched,
                'border-red-500': !meta.valid && meta.touched,
              }"
            >
              <option value="">--Please choose an option--</option>
              <option v-for="option in options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <VErrorMessage
              :name="name"
              as="div"
              class="text-red-500 text-xs mt-1"
            />
          </VField>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
</script>

<style></style>
