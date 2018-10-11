const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const databaseTasks = require('./dbTasks');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/DataTasks', databaseTasks);

// starting express server
app.listen(8080, () => console.log('Listening on port 8080!'));
