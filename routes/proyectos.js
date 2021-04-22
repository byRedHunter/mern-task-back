const express = require('express')
const { crearProyecto } = require('../controllers/proyectoController')
const router = express.Router()

// crear proectos
// api/proyectos
router.post('/', crearProyecto)

module.exports = router
