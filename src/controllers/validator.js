import Validator from 'better-validator'

import CustomFormatter from './CustomFormatter'

const validate = Validator.expressMiddleware({
  responseFormatter: new CustomFormatter(),
  FailureFormatter: new CustomFormatter(),
})

export default validate
