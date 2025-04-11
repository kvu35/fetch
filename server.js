// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

app.post('/api/echo', (req, res) => {
  res.status(201).json({ echo: req.body });
});

module.exports = app;
