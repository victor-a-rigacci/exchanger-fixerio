import NodeCache from "node-cache"

const ENVIROMENT = process.env.NODE_ENV

const nodeCache = new NodeCache()

/**
 *
 * @param {string} key Key to get
 *
 */
export const getMemCache = key => {
  if (ENVIROMENT === "test" || ENVIROMENT === "testing") return undefined

  const value = nodeCache.get(key)

  return value
}

/**
 *
 * @param {string} key Key to set
 * @param {object} valueObj Object to store in cache
 * @param {integer}  [timeInSeconds=10000]  TTL in second, after this time return undefined
 */
export const setMemCache = (key, valueObj, timeInSeconds = 10000) => {
  if (ENVIROMENT === "test" || ENVIROMENT === "testing") return undefined

  return nodeCache.set(key, valueObj, timeInSeconds)
}
/**
 *
 * @param {*} key Remove key from cache
 */
export const removeMemCache = key => {
  if (ENVIROMENT === "test" || ENVIROMENT === "testing") return undefined

  return nodeCache.del(key)
}
