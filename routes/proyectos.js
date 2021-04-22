const express = require('express')
const { crearProyecto } = require('../controllers/proyectoController')
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
router.get('/', auth, crearProyecto)

module.exports = router
