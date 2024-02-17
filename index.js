const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { connect } = require('./database/connection');
const { authRoute } = require('./routes/authRoute');
const classRoute = require('./routes/classRoute');
const testRoute = require('./test/testRoute');

app.use(express.json());

connect();

// Routes
app.use('/auth', authRoute);
app.use('/class', classRoute);
app.use('/test', testRoute);


app.get('/', async(req, res) => {
  res.status(200).send('Welcome to the Node.js Application');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
