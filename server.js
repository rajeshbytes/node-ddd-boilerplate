require('module-alias/register');

const express = require('express');
const app = express();
require('dotenv').config();
const knex = require('@config/database'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
