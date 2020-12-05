import { verifyToken } from '../services/authentication'

export default async function auth(req, res, next) {
  try {
    const authToken = req.headers.authorization

    if (!authToken) return res.status(400).send('Nenhum token fornecido')

    if (!authToken.split(' ').length === 2) return res.status(400).send('Token mal formado')

    const token = authToken.split(' ')[1]

    const decoded = await verifyToken(token)

    if (!decoded) return res.status(400).send('Não foi possivel criar um token')

    req.userId = decoded.params.id
    return next()
  } catch (error) {
    return res.status(401).send('Token invalido')
  }
}
