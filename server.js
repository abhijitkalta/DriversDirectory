require('./config/config');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const port = process.env.PORT ;
mongoose.Promise = global.Promise;

var app = express();
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect(process.env.MONGODB_URI);
}

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

routes(app);
app.use((err, req, res, next) => {
  res.status(422).send({Error: err.message});
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

module.exports = {
  app: app
}
