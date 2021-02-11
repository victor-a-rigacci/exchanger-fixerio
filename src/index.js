import "./config/config"
import { startServer } from "./server/server"
import { connectDB } from "./database/db"
import * as pairRepository from "./database/entities/pair/pair.repository"

process.on("unhandledRejection", err => {
  console.log(err)
  process.exit(1)
})
;(async () => {
  await connectDB()
  startServer()
})()
