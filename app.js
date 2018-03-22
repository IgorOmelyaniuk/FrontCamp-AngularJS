const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const api = require('./routes/api');
const partials = require('./routes/partials');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/partials', partials);

app.use('*', routes);

app.listen(3000, () => console.log('Server is running on port 3000'));