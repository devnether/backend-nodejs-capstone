/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./models/db');
const {loadData} = require("./util/import-mongo/index");
const app = express();
const port = 3060;
const pinoHttp = require('pino-http');
const logger = require('./logger');

const secondChanceItemsRoutes = require('./routes/secondChanceItemsRoutes');

app.use("*",cors());
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
})
    .catch((e) => console.error('Failed to connect to DB', e));


app.use(express.json());
app.use(pinoHttp({ logger }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.use('/api/secondchance/items', secondChanceItemsRoutes);

app.get("/",(req,res)=>{
    res.send("Inside the server")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
