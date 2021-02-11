// import Joi from "joi"
import * as ratesController from "./rates/rates.controller"

export const setRoutes = server => {
  server.route({
    method: "GET",
    path: "/health",
    options: {
      handler: () => "ok",
      tags: ["api"],
      notes: ["Return ok if http server its working."]
    }
  })

  server.route({
    method: "GET",
    path: "/rates",
    options: {
      handler: ratesController.getPairsOriginal,
      tags: ["api"],
      notes: ["Return FixerIO Original Rates."]
    }
  })

  server.route({
    method: "GET",
    path: "/pairs",
    options: {
      handler: ratesController.getPairFees,
      tags: ["api"],
      notes: ["Return all pairs which have fees."]
    }
  })

  server.route({
    method: "POST",
    path: "/pairs",
    options: {
      handler: ratesController.postPairFees,
      tags: ["api"],
      notes: ["Update pair fee"]
    }
  })

  server.route({
    method: "POST",
    path: "/pairs/selective",
    options: {
      handler: ratesController.postExchangeFromTo,
      tags: ["api"],
      notes: ["Return selected pairs with their fees."]
    }
  })
}
