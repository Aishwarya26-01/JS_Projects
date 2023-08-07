const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const sequelize = require('./util/database');
const Order = require('./models/order');

const orderRoutes = require('./routes/order');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order', orderRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));