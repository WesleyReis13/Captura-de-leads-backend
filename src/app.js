const express = require('express');
const app = express();


app.use('/api/webhook', express.raw({type: 'application/json'}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const leadsRoutes = require('./routes/leadsRoutes');
app.use('/api', leadsRoutes);

const stripeRoutes = require('./routes/stripeRoutes');
app.use('/api', stripeRoutes);


const stripeWebhookRoutes = require('./routes/stripeWebhook');
app.use('/api', stripeWebhookRoutes);

app.get('/', (req, res) => res.send('Hello World9!'));

module.exports = app;