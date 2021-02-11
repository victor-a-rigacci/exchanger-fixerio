import Pair from "./pair.model"

export const getAllPairs = async () => {
  try {
    const pairs = await Pair.find({ feePercentage: { $gt: 0 } })
    return { success: true, pairs }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getPair = async id => {
  try {
    const pair = await Pair.findOne({ _id: id })
    if (!pair) {
      return null
    }
    return { success: true, pair }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getPairByPair = async pair => {
  try {
    const pairResult = await Pair.findOne({ pair: pair.toLowerCase() })
    if (!pairResult) {
      return null
    }
    return { success: true, pair: pairResult }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateFeePercentagePair = async (id, feePercentage) => {
  try {
    const pair = await Pair.findOne({ _id: id })
    if (!pair) return { success: false, error: "Pair not found" }

    pair.feePercentage = feePercentage
    await pair.save()
    return { success: true, pair }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const clearPair = async id => {
  try {
    const pair = await Pair.findOne({ _id: id })
    if (!pair) throw new Error("Pair not found.")

    pair.feePercentage = 0
    await pair.save()
    return { success: true, message: "Cleared." }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const createPair = async (pair, feePercentage) => {
  try {
    const newPair = new Pair({ pair, feePercentage })
    await newPair.save()
    return { success: true, pair: newPair }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
