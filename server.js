const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));