// rutas para crear usuarios

const express = require('express')
const { createUsuario } = require('../controllers/usuarioController')
const router = express.Router()

// crea un usuario
// api/usuarios
router.post('', createUsuario)

module.exports = router
