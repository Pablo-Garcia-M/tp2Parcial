import api from './api'

// login: POST /api/auth/login
async function login(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

// register: POST /api/auth/register
async function register(nombre, email, password) {
  const response = await api.post('/auth/register', { nombre, email, password })
  return response.data
}

export default { login, register }
