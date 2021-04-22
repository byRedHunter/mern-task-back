const express = require('express')
const { crearProyecto } = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const router = express.Router()

// crear proectos
// api/proyectos
router.post('/', auth, crearProyecto)
router.get('/', auth, crearProyecto)

module.exports = router
