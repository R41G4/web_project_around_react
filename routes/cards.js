// routes/cards.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Función auxiliar para leer tarjetas
async function getCards() {
	const filePath = path.join(__dirname, '..', 'data', 'cards.json');
	const data = await fs.readFile(filePath, 'utf8');
	return JSON.parse(data);
}

// GET /cards - Todas las tarjetas
router.get('/', async (req, res) => {
	try {
		const cards = await getCards();
		res.json(cards);
	} catch (error) {
		res.status(500).json({ message: 'Error al cargar tarjetas' });
	}
});

module.exports = router;