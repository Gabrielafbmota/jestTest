function getStatus(code) {
  const status = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    408: 'Request Timeout',
    409: 'Conflict',
  }
  return status[code]
}

export default class HttpResponse {
  static errorResponseHandler(error, response, status, exceptions) {
    let errorDefault = true
    exceptions.forEach((except, index) => {
      const ex = except.filter(exception => error instanceof exception)
      if (ex.length > 0) {
        errorDefault = false
        return response.status(status[index]).send({
          code: status[index],
          status: getStatus(status[index]),
          message: error.message,
        })
      }
      return null
    })
    if (errorDefault) {
      return response.status(500).send({
        code: 500,
        status: 'Error',
        message: error.message,
      })
    }
    return null
  }

  static setLocation(request, response, id) {
    return response.location(
      `${request.protocol}://${request.headers.host}${request.baseUrl}${request.path}/${id}`,
    )
  }
}
