// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // @ts-ignore
  mode: 'universal',
  target: 'static',
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  plugins: [
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/toast.js' },
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
});
