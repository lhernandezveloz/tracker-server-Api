require('./models/User');
require('./models/Track');
const express = require('express');
const mongosse = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requiredAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRouter);

//Get you mongo account and paste connection string below:
const mongoUri = 'Paste your mongo connection string here';

mongosse.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
});

mongosse.connection.on('connected', () => {
    console.log('Mongosse connected!');
});

mongosse.connection.on('error', (err) => {
    console.log('Something went wrong', err);
})

app.get('/', requireAuth, (req, res) =>{
    res.send("Hi from there!");
});

app.listen(3000, () =>{
    console.log("Running on localhost:3000");
});
