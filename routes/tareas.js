const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')
const { crearTarea } = require('../controllers/tareaController')

const router = express.Router()

// api/tareas

// crear una tarea
router.post(
	'/',
	auth,
	[check('nombre', 'El nombre es obligatorio.').not().isEmpty()],
	crearTarea
)

module.exports = router
