const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

require('dotenv').config();

app.use(express.json());

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});