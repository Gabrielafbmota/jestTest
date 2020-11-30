export default class CustomFormatter {
  format(body) {
    return {
      code: 400,
      status: 'Bad Request',
      message: body,
    }
  }
}
