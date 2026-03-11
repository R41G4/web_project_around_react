// routes/users.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Función auxiliar para leer usuarios
async function getUsers() {
	const filePath = path.join(__dirname, '..', 'data', 'users.json');
	const data = await fs.readFile(filePath, 'utf8');
	return JSON.parse(data);
}

// GET /users - Todos los usuarios
router.get('/', async (req, res) => {
	try
	{
		const users = await getUsers();
		res.json(users);
	}
	catch (error)
	{
		res.status(500).json({ message: 'Error al cargar usuarios' });
	}
});

// GET /users/:id - Usuario por ID
router.get('/:id', async (req, res) => {
	try
	{
		const users = await getUsers();
		const user = users.find(u => u._id === req.params.id);

		if (user)
			res.json(user);
		else
			res.status(404).json({ message: 'ID de usuario no encontrado' });
	}
	
	catch (error) {
		res.status(500).json({ message: 'Error al buscar usuario' });
	}
});

module.exports = router;