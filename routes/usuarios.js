// rutas para crear usuarios

const express = require('express')
const { createUsuario } = require('../controllers/usuarioController')
const router = express.Router()
const { check } = require('express-validator')

// crea un usuario
// api/usuarios
router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email valido').isEmail(),
		check('password', 'El password debe ser minimo de 6 caracteres').isLength({
			min: 6,
		}),
	],
	createUsuario
)

module.exports = router
