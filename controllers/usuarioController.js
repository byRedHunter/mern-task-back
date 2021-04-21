const Usuario = require('../models/Usuario')

exports.createUsuario = async (req, res) => {
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

		// guarda el usuario
		await usuario.save()

		// mensaje de confirmacion
		res.json({ msg: 'Usuario creado correctamente.' })
	} catch (error) {
		console.log(error)
		res.status(400).send('Hubo un error.')
	}
}
