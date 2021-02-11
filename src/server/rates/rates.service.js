import { createHttpError } from "../../helpers/httpErrorCreator"
import * as FixerIOService from "../../externalServices/fixerIO/FixerIO.service"

export const getPairsOriginal = async () => {
  try {
    const exchangesRates = await FixerIOService.getExchangesRates()
    return exchangesRates
  } catch (error) {
    return createHttpError(500, error.message)
  }
}

export const getPairFees = async () => {
  try {
    const pairs = await FixerIOService.getAllPairs()
    const filteredPairs = pairs.map(pair => ({
      pair: pair.pair,
      feePercentage: pair.feePercentage
    }))
    return filteredPairs
  } catch (error) {
    return createHttpError(500, error.message)
  }
}

export const exchangeFromTo = async (symbolFrom, symbolTo) => {
  try {
    const exchangeResult = await FixerIOService.exchangeFromTo(
      symbolFrom,
      symbolTo
    )
    return exchangeResult
  } catch (error) {
    return {
      success: false,
      pair: `${symbolFrom}${symbolTo}`,
      message: "Invalid."
    }
  }
}

export const updateFeePair = async (pair, feePercent) => {
  try {
    const result = await FixerIOService.updateFeePair(pair, feePercent)
    return result
  } catch (error) {
    return { success: false, pair, error: "Invalid." }
  }
}
