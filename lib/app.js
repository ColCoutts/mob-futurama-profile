const express = require('express');
const app = express();
const createdProfile = require('./routes/profile');

app.use(express.json());
app.use('/profile', createdProfile);

module.exports = app;
