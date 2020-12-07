import { index } from './controller'
import auth from '../../middlewares/authentication'

export default [
  {
    method: 'get',
    path: '/user',
    action: index,
    handlers: [auth],
  },
]
