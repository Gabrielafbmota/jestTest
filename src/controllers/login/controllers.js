import * as userRepository from '../../repositories/users'

export async function store(req, res) {
  try {
    res.status(201).send('ok')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
