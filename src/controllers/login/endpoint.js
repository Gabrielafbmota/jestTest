import { store, index } from './controllers'

export default [
  {
    method: 'post',
    path: '/user',
    action: store,
  },
]
