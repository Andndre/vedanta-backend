import { API } from "sveltekit-api";
import { PUBLIC_APP_URL } from '$env/static/public'

export default new API(import.meta.glob("./**/*.ts"), {
  openapi: "3.0.0",
  info: {
    title: "Vedanta API Documentation",
    version: "1.0.0",
    description: "Dokumentasi API untuk aplikasi Vedanta",
  },
  servers: [
    {
      url: PUBLIC_APP_URL,
    }
  ]
});
