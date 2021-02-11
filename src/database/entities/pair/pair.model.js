import { model, Schema } from "mongoose"

const PairSchema = new Schema({
  pair: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  feePercentage: {
    type: Number,
    required: true
  }
})

export default model("Pair", PairSchema)
