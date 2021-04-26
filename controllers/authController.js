const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

exports.autenticarUsuario = async (req, res) => {
	// revisamos si hay errores
	const errores = validationResult(req)
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() })
	}

	// extraer email -- password
	const { email, password } = req.body

	try {
		// revisar que el usuario este registrado
		let usuario = await Usuario.findOne({ email })
		if (!usuario) {
			return res.status(400).json({ msg: 'El usuario no existe' })
		}

		// revisar el password
		const passCorrecto = await bcryptjs.compare(password, usuario.password)
		if (!passCorrecto) {
			return res.status(400).json({ msg: 'Credenciale incorrecto.' })
		}

		// si todo es correcto
		// creamos y firmamos el JWT
		const payload = {
			usuario: {
				id: usuario.id,
			},
		}
		// firmar el JWT
		jwt.sign(
			payload,
			process.env.SECRETA,
			{ expiresIn: 3600 },
			(error, token) => {
				if (error) throw error

				// mensaje de confirmacion
				res.json({ token })
			}
		)
	} catch (error) {
		console.log(error)
	}
}

// obtener usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
	try {
		const usuario = await Usuario.findById(req.usuario.id)
		res.json(usuario)
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Hubo un error.' })
	}
}
