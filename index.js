const express = require('express');
const Database = require('./src/repository/database');
const app = express();
require('dotenv').config();

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.APP_PORT, () => console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`));

require('./src/api/api')(app);

Database.initDatabase();
