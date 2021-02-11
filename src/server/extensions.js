export const setExtensions = server => {
  // Custom error handler
  server.ext({
    type: "onPreResponse",
    method: (request, h) => {
      if (
        request.response.isBoom &&
        request.response.message.indexOf("#|||#") > -1
      ) {
        const splittedErrorMsg = request.response.message.split("#|||#")
        const statusCode = Number(splittedErrorMsg[0])
        const message = splittedErrorMsg[1]
        return h
          .response({
            statusCode,
            message
          })
          .code(statusCode)
      }
      return h.continue
    }
  })
}
