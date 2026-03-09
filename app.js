const express = require('express');
const bodyParser = require('body-parser');
const surveyController = require('./surveyController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

surveyController(app);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
