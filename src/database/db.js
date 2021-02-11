import Mongoose from "mongoose"

export const connectDB = () =>
  new Promise(resolve => {
    if (Mongoose.connection.readyState > 0) {
      console.error(
        `[Database] Cannot connect until finish current state: ${Mongoose.connection.readyState}`
      )
      resolve(true)
    }

    const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env

    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
    console.log(`[Database] Connecting to ${DB_HOST}/${DB_NAME}`)
    Mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
      .then(() => {
        console.info(
          `[Database] Successfully connected to ${DB_HOST}/${DB_NAME}`
        )
        resolve(true)
      })
      .catch(error => {
        console.error("[Database] Error connecting to database: ", error)
        resolve(false)
      })

    Mongoose.connection.once("error", () => {
      console.error("[Database] Error connecting to database")
    })

    Mongoose.connection.once("disconnected", () => {
      console.info("[Database] Disconnected status")
      setTimeout(() => {
        connectDB()
      }, 5000)
    })
  })
