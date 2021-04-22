const express = require('express')
const { check } = require('express-validator')
const { autenticarUsuario } = require('../controllers/authController')
const router = express.Router()

// api/auth
router.post('/', [
	check('email', 'Agrega un email valido.').isEmail(),
	check('password', 'El password deb ser minimo de 6 caracteres').isLength({
		min: 6,
	}),
	autenticarUsuario,
])

module.exports = router
