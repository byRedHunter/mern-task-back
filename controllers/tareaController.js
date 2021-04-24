const Proyecto = require('../models/Proyecto')
const Tarea = require('../models/Tarea')
const { revisarErrorPeticion } = require('../utils/metodos')

// crea una nueva tarea
exports.crearTarea = async (req, res) => {
	// revisar si hay errores
	revisarErrorPeticion(req, res)

	try {
		// extraer el proyecto
		const { proyecto } = req.body
		// verificar si existe
		const existeProyecto = await Proyecto.findById(proyecto)
		if (!existeProyecto) {
			return res.status(400).json({ msg: 'Proyecto no encontrado' })
		}

		// revisar que el proyecto pertenece al usuario
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado.' })
		}

		// crear la tarea
		const tarea = new Tarea(req.body)
		await tarea.save()

		res.json(tarea)
	} catch (error) {
		console.log(error)
		res.status(500).send('Hubo un error')
	}
}

// obtener tarea por proyecto
exports.obtenerTarea = async (req, res) => {
	try {
		// extraer el proyecto
		const { proyecto } = req.body
		// verificar si existe
		const existeProyecto = await Proyecto.findById(proyecto)
		if (!existeProyecto) {
			return res.status(400).json({ msg: 'Proyecto no encontrado' })
		}

		// revisar que el proyecto pertenece al usuario
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado.' })
		}

		// obtener las tareas por proyecto
		const tareas = await Tarea.find({ proyecto })

		res.json(tareas)
	} catch (error) {
		console.log(error)
		res.status(500).send('Hubo un error')
	}
}
