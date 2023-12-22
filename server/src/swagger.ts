import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

const initSwagger = (app) => {
  if (process.env.NODE_ENV == "development") {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          description: "REST server including authentication using JWT",
        },
        servers: [{url: `http://localhost:${process.env.APP_PORT}`}],
      },
      apis: ["swagger.yml"],
    };
    const specs = swaggerJsDoc(options);
    console.log("swagger API on ", `http://localhost:${process.env.APP_PORT}/api-docs`);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }
}
export default {
  initSwagger,
};