const Proyecto = require('../models/Proyecto')
const Tarea = require('../models/Tarea')
const { revisarErrorPeticion } = require('../utils/metodos')

// crea una nueva tarea
exports.crearTarea = async (req, res) => {
	// revisar si hay errores
	revisarErrorPeticion(req, res)
}
