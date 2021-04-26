const express = require('express')
const { check } = require('express-validator')
const {
	autenticarUsuario,
	usuarioAutenticado,
} = require('../controllers/authController')
const auth = require('../middleware/auth')
const router = express.Router()

// api/auth

// iniciar sesion
router.post(
	'/',
	[check('email', 'Agrega un email valido.').isEmail()],
	autenticarUsuario
)

router.get('/', auth, usuarioAutenticado)

module.exports = router
