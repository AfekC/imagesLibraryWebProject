import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const initSwagger = (app) => {
  if (process.env.NODE_ENV === "development") {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "Sample API",
          description: "REST server including authentication using JWT",
        },
        servers: [{ url: "https://localhost" }],
      },
      apis: ["./src/routes/*.ts", "./src/models/*.ts"],
    };
    const specs = swaggerJsdoc(options);
    console.log(specs);
    console.log("Swagger API is available at: https://localhost/api-docs");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }
};
export default {
  initSwagger,
};