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
		const { proyecto } = req.query // obtiene el valdor cuando se manda por params
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
		const tareas = await Tarea.find({ proyecto }).sort({
			creado: -1,
		})

		res.json(tareas)
	} catch (error) {
		console.log(error)
		res.status(500).send('Hubo un error')
	}
}

// editar tarea
exports.actualizarTarea = async (req, res) => {
	try {
		// extraer el proyecto
		const { proyecto, nombre, estado } = req.body

		// verificar si existe la tarea o no
		let tarea = await Tarea.findById(req.params.id)
		if (!tarea) {
			return res.status(404).json({ msg: 'No existe esta tarea.' })
		}

		// extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto)

		// revisar que el proyecto pertenece al usuario
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado.' })
		}

		// crear un objeto con la nueva tarea
		const nuevaTarea = {}

		if (nombre) nuevaTarea.nombre = nombre

		if (estado) nuevaTarea.estado = estado

		// guardar la tarea
		tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
			new: true,
		})

		res.json(tarea)
	} catch (error) {
		console.log(error)
		res.status(500).send('Hubo un error')
	}
}

// eliminar tarea
exports.eliminarTarea = async (req, res) => {
	try {
		// extraer el proyecto
		const { proyecto } = req.body

		// verificar si existe la tarea o no
		let tarea = await Tarea.findById(req.params.id)
		if (!tarea) {
			return res.status(404).json({ msg: 'No existe esta tarea.' })
		}

		// extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto)

		// revisar que el proyecto pertenece al usuario
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado.' })
		}

		// eliminar
		await Tarea.findOneAndRemove({ _id: req.params.id })

		res.json({ msg: 'Tarea eliminada.' })
	} catch (error) {
		console.log(error)
		res.status(500).send('Hubo un error')
	}
}
