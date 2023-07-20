<template>
  <div class="layout__container">
    <header class="bg-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-start gap-x-12 p-6 lg:px-8"
        aria-label="Global"
      >
        <NuxtLink
          class="text-sm font-semibold leading-6 text-gray-900"
          :to="`/`"
        >
          Transports
        </NuxtLink>
        <NuxtLink
          class="text-sm font-semibold leading-6 text-gray-900"
          :to="`/routes`"
        >
          Routes
        </NuxtLink>
      </nav>
    </header>
    <div class="container mx-auto pt-2 max-w-7xl">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
