const express = require('express')
const {
	crearProyecto,
	obtenerProyectos,
	actualizarProyecto,
	eliminarProyecto,
} = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const router = express.Router()
const { check } = require('express-validator')

// crear proectos
// api/proyectos
router.post(
	'/',
	[check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	auth,
	crearProyecto
)

// obtener los proyectos de un usuario
router.get('/', auth, obtenerProyectos)

// actualizar proyecto via ID
router.put(
	'/:id',
	auth,
	[check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	auth,
	actualizarProyecto
)

// eliminar un proyecto
router.delete('/:id', auth, eliminarProyecto)

module.exports = router
