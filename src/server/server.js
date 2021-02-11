import Hapi from "@hapi/hapi"

import { setRoutes } from "./routes"
import { setExtensions } from "./extensions"
import { setRegisters } from "./registers"

export const startServer = async () => {
  // Server http
  const server = Hapi.server({
    port: process.env.PORT || 4545,
    host: "0.0.0.0"
  })

  // Setup error handler
  setExtensions(server)

  // Setup Swagger, Inert and Vision
  await setRegisters(server)

  // Setup routes
  setRoutes(server)

  try {
    await server.start()
    console.log("Server running on %s", server.info.uri)
  } catch (error) {
    console.log(`Server cannot start:\n  ${error.message}`)
    process.exit(1)
  }
}
