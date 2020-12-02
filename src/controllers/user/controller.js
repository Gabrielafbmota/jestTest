import * as UserRepositorie from '../../repositories/user'

export async function store(req, res) {
  try {
    const { name, email, password } = req.body

    const user = await UserRepositorie.create({
      name,
      password,
      email,
    })

    if (!user) return res.status(400).send('error saving')
    res.status(200).send(user)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export async function index(req, res) {
  try {
    const user = await UserRepositorie.findAll()
    res.status(200).send(user)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}
