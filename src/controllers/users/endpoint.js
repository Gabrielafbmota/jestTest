import { store, index } from './controllers'

export default [
  {
    method: 'get',
    path: '/user',
    action: index,
  },
  {
    method: 'post',
    path: '/user',
    action: store,
  },
]
