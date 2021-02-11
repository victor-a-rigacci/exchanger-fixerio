import axios from "axios"

export const fetchExchangeRates = async (base = "EUR") => {
  const url = `${process.env.FIXER_ENDPOINT}/latest?access_key=${process.env.FIXER_KEY}&base=${base}`
  try {
    const { data } = await axios({
      method: "get",
      url: `${url}`,
      json: true,
      timeout: 10 * 1000 // 15 seconds timeout
    })

    return data
  } catch (error) {
    console.log(`${error.message}\n ${error.stack}`)
    return null
  }
}
