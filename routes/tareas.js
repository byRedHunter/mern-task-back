const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')
const {
	crearTarea,
	obtenerTarea,
	actualizarTarea,
	eliminarTarea,
} = require('../controllers/tareaController')

const router = express.Router()

// api/tareas

// crear una tarea
router.post(
	'/',
	auth,
	[
		check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
		check('proyecto', 'El proyecto es obligatorio.').not().isEmpty(),
	],
	crearTarea
)

// obtener tarea por proyecto
router.get('/', auth, obtenerTarea)

// actualizar tarea
router.put('/:id', auth, actualizarTarea)

// eliminar una tarea
router.delete('/:id', auth, eliminarTarea)

module.exports = router
