
const express = require('express');
const app = express();


app.use(express.json());


const leadsRoutes = require('./routes/leadsRoutes');
app.use('/api', leadsRoutes);


app.get('/', (req, res) => res.send('Hello World9!'));

module.exports = app;
