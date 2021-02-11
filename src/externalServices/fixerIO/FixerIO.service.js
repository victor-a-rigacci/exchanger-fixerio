/* eslint-disable no-underscore-dangle */
import { getMemCache, setMemCache, removeMemCache } from "../../libs/cache"
import { CACHE_KEYS, base } from "./FixerIO.constants"
import { fetchExchangeRates } from "./FixerIO.repository"
import * as pairRepository from "../../database/entities/pair/pair.repository"

export const removePairsCache = () => {
  removeMemCache(CACHE_KEYS.PAIRS)
}

export const removeApiFixerCache = () => {
  removeMemCache(CACHE_KEYS.EXCHANGE_RATES)
}

/**
 *
 * @param {boolean} cacheEnabled Default: true. Exchange rates will be cached in the memory cache. Next time you call this function its going to retrive the cached fetch.
 */
export const getExchangesRates = async (cacheEnabled = true) => {
  if (cacheEnabled) {
    const cachedExchanges = getMemCache(CACHE_KEYS.EXCHANGE_RATES)
    if (cachedExchanges) return cachedExchanges
  }

  const exchangesRates = await fetchExchangeRates(base)

  if (!exchangesRates) {
    throw new Error("Error getting exchanges rates from FixerIO API.")
  }

  if (!exchangesRates.success) {
    throw new Error("Wrong answer from FixerIO API")
  }

  if (cacheEnabled) {
    setMemCache(CACHE_KEYS.EXCHANGE_RATES, exchangesRates)
  }

  return exchangesRates
}

const getSymbolPrice = async symbol => {
  try {
    const exchangesRates = await getExchangesRates()
    const price = exchangesRates.rates[symbol]
    return price || null
  } catch (error) {
    return null
  }
}

const getFeePercentageFromPair = (pairsList, searchedPair) => {
  const pairResult = pairsList.find(
    pair => pair.pair === searchedPair.toLowerCase()
  )
  if (!pairResult) return 0

  return pairResult.feePercentage
}
/**
 * Get all pairs with fees from database.
 * @param {*} cacheEnabled
 */
export const getAllPairs = async (cacheEnabled = true) => {
  if (cacheEnabled) {
    const cachedPairs = getMemCache(CACHE_KEYS.PAIRS)
    if (cachedPairs) return cachedPairs
  }

  const pairs = await pairRepository.getAllPairs()

  if (!pairs || !pairs.success) {
    throw new Error("Error getting pairs from db.")
  }

  if (cacheEnabled) {
    setMemCache(CACHE_KEYS.PAIRS, pairs.pairs)
  }

  return pairs.pairs
}
const isValidSymbol = async symbol => {
  const allSymbols = await getExchangesRates()
  return !!allSymbols.rates[symbol]
}

export const exchangeFromTo = async (symbolFrom, symbolTo) => {
  const priceBase = await getSymbolPrice(base)
  const priceFrom = await getSymbolPrice(symbolFrom)
  const priceTo = await getSymbolPrice(symbolTo)

  if (!priceBase || !priceFrom || !priceTo) throw new Error("Invalid pair.")

  // calculate exchange without fees
  const newSymbolBase = priceBase / priceFrom
  const resultBaseExchange = newSymbolBase * priceTo
  const resultExchange = resultBaseExchange

  const pairs = await getAllPairs()
  const feePercentage = getFeePercentageFromPair(
    pairs,
    `${symbolFrom}${symbolTo}`
  )
  const finalRate = resultExchange * (1 + feePercentage / 100)
  const feeAmount = finalRate - resultExchange

  return {
    success: true,
    pair: `${symbolFrom}${symbolTo}`,
    originalRate: resultExchange,
    feePercentage,
    feeAmount,
    finalRate
  }
}

export const updateFeePair = async (pair, feePercentage) => {
  try {
    const splittedPair = pair.match(/.{1,3}/g)
    const firstSymbol = splittedPair[0]
    const secondSymbol = splittedPair[1]

    if (
      !(await isValidSymbol(firstSymbol)) ||
      !(await isValidSymbol(secondSymbol))
    )
      return { pair, success: false, message: "Invalid pair" }

    removePairsCache()
    const pairResult = await pairRepository.getPairByPair(pair)

    if (pairResult && !pairResult.success)
      return { pair, success: false, message: "Error in database" }

    if (!pairResult) {
      await pairRepository.createPair(pair, feePercentage)
      return { pair, success: true }
    }

    await pairRepository.updateFeePercentagePair(
      pairResult.pair._id,
      feePercentage
    )
    return { pair, success: true }
  } catch (error) {
    return { success: false, pair, error: "Invalid." }
  }
}
