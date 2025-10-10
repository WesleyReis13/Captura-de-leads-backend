const express = require('express');
const app = express();


const cors = require("cors");

app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));





/*app.use('/api/webhook', express.raw({type: 'application/json'}));*/

app.use('/webhook', express.raw({type: 'application/json'}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const leadsRoutes = require('./routes/leadsRoutes');
app.use('/api', leadsRoutes);

const stripeRoutes = require('./routes/stripeRoutes');
app.use('/api', stripeRoutes);


const stripeWebhookRoutes = require('./routes/stripeWebhook');
app.use('/webhook', stripeWebhookRoutes);


const campaignRoutes = require('./routes/campaignRoutes');
app.use('/api', campaignRoutes);

const authRouter = require('./routes/auth');
app.use("/api", authRouter);

app.get('/', (req, res) => res.send('Hello World9!'));

module.exports = app;