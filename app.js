const express = require('express');
const app = express();

const rootRouter = require('./src/routes/index');

const port = process.env.PORT || 2022

/**
 * Middlewares go here for the application.
 * if it gets to cumbersome then we can move to seperate file
 *
 */


   

app.use(express.static("public"));
app.use(express.json());//for parsing application/json
app.use(express.urlencoded({ extended: false })); //for parsing application/x-www-form-urlencoded
app.use('/', rootRouter());


app.all('*', (req, res) => res.status(200).send({ message: 'server is live' }));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
