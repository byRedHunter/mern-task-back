const express = require('express')

// crear el servidor
const app = express()

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
