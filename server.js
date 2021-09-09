require('dotenv').config()

const app = require('./api/src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App Listening on port ', port);
});