import * as ratesService from "./rates.service"

export const getPairsOriginal = () => ratesService.getPairsOriginal()
export const getPairFees = () => ratesService.getPairFees()

// eslint-disable-next-line no-unused-vars
export const postPairFees = async (request, h) => {
  const { pairs } = request?.payload
  const updatePairsPromises = []

  for (let i = 0; i < pairs.length; i += 1) {
    if (pairs[i].pair && pairs[i].feePercentage >= 0)
      updatePairsPromises.push(
        ratesService.updateFeePair(
          pairs[i].pair.toUpperCase(),
          pairs[i].feePercentage
        )
      )
  }

  try {
    const result = await Promise.all(updatePairsPromises)
    return result
  } catch (error) {
    return { success: false, error: error.message }
  }
}
// eslint-disable-next-line no-unused-vars
export const postExchangeFromTo = async (request, h) => {
  const ratesPromises = []
  const { pairs } = request?.payload

  for (let i = 0; i < pairs.length; i += 1) {
    const splittedPair = pairs[i].match(/.{1,3}/g)
    if (splittedPair?.length === 2) {
      const from = splittedPair[0].toUpperCase()
      const to = splittedPair[1].toUpperCase()
      ratesPromises.push(ratesService.exchangeFromTo(from, to))
    }
  }

  const result = await Promise.all(ratesPromises)

  return result
}
