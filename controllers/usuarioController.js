const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

exports.createUsuario = async (req, res) => {
	// revisar si hay errores de express-validator
	const errors = validationResult(req) // genera un arreglo
	if (!errors.isEmpty()) {
		res.status(400).json({ errores: errors.array() })
	}

	// extraer email y password
	const { email, password } = req.body

	try {
		// validar que wl usuario registrado sea unico
		let usuario = await Usuario.findOne({ email })

		if (usuario) {
			return res.status(400).json({ msg: 'El usuario ya existe.' })
		}

		// crea el nuevo usuario
		usuario = new Usuario(req.body)

		// hashear el password
		const salt = await bcryptjs.genSalt(10) // genera un pass unico
		usuario.password = await bcryptjs.hash(password, salt)

		// guarda el usuario
		await usuario.save()

		// mensaje de confirmacion
		res.json({ msg: 'Usuario creado correctamente.' })
	} catch (error) {
		console.log(error)
		res.status(400).send('Hubo un error.')
	}
}
