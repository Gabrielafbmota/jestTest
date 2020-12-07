import * as userRepository from '../../repositories/users'
import { createToken } from '../../services/authentication'
import { encrypt } from '../../services/encrypt-service'

export async function index(req, res) {
  try {
    const user = await userRepository.findAll()

    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

export async function store(req, res) {
  try {
    const { username, email, password } = req.body

    const user = await userRepository.save({
      username,
      password: encrypt(password),
      email,
    })
    if (!user) return res.status(400).send('Não foi possivel criar o usuário')

    const token = await createToken({ id: user._id })
    if (!token) return res.status(400).send('Token não criado')
    delete user.password

    res.status(201).send({ user, token })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
