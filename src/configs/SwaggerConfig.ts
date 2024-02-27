import swagger from "@elysiajs/swagger";

export default swagger({
  path: "/docs",
  provider: "scalar",
  documentation: {
    info: {
      title: "Vedanta API Documentation",
      version: "0.1.0",
      description: "Dokumentasi API untuk aplikasi Vedanta",
    },
  },
  exclude: ["/docs", "/docs/json", "/", "/api"],
  swaggerOptions: {
    defaultModelRendering: "model",
  },
});
