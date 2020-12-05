import * as userRepository from '../../repositories/users'

export async function index(req, res) {
  try {
    const { userId } = req
    const user = await userRepository.findById({ userId })
    if (!user) return res.status(404).send('Usuário não encontrado')
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
