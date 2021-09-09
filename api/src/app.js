const express = require('express');

const cors = require('cors');

const db = require('./config/database');

const app = express();

// ==> Rotas da API:
const index = require('./routes/index');
const productRoute = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', productRoute);

module.exports = app;