export const createHttpError = (statusCode, message) => {
  throw new Error(`${statusCode}#|||#${message}`)
}
