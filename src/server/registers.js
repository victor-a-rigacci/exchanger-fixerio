import Inert from "@hapi/inert"
import Vision from "@hapi/vision"
import HapiSwagger from "hapi-swagger"

export const setRegisters = async server => {
  const swaggerOptions = {
    info: {
      title: "Challenge API Documentation",
      version: "Final"
    }
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
}
