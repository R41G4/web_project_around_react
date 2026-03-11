// app.js
const express = require('express');
const path = require('path');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// ===== RUTAS =====
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// ===== MANEJO DE RUTAS NO ENCONTRADAS =====
app.use('*', (req, res) => {
	res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});