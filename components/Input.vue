<template>
  <div class="field">
    <div class="label flex items-center">
      <label class="text-sm text-gray-700">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <VField v-slot="{ field, meta }" :name="name">
            <input
              v-bind="field"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
              :class="{
                'border-green-500': meta.valid && meta.touched,
                'border-red-500': !meta.valid && meta.touched,
              }"
              :placeholder="placeholder"
              :type="type"
            />
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
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>

<style></style>
