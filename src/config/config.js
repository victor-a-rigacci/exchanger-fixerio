import dotenv from "dotenv"
import path from "path"

const enviroment = process.env.NODE_ENV || "development"
const pathDir = path.join(__dirname, `${enviroment}.env`)
dotenv.config({ silent: true, path: pathDir })
