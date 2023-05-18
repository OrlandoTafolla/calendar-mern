const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

const app = express();


app.use(express.static('public'))

app.use(express.json())

dbConnection();

app.use(cors())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(process.env.PORT, () => {
    console.log(`server on port ${ process.env.PORT }`)
})