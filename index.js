const express = require('express')
const conectarDB = require('./config/db')

// crear el servidor
const app = express()

// conectar a la db
conectarDB()

// puerto de la app
const PORT = process.env.PORT || 5000

// definir la página principal
app.get('/', (req, res) => {
	res.send('Main Page')
})

// arrancar la app
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})
