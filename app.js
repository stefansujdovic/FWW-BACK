const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const jwt = require('jsonwebtoken');




//routes

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const app = express();

//db


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>console.log('DB CONNECTED'))




//middleweares

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors())
app.use('/api', express.static('public'))

app.use('/api', authRoutes);

app.use('/api', eventRoutes);





const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})