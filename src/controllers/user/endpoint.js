import * as user from './controller'

export default [
  {
    method:'get',
    path:'/user',
    action: user.index
  },
  {
    method:'post',
    path:'/user',
    action: user.store
  },

]