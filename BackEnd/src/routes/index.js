const express = require('express');

const userRoutes = require('./userRoutes');

const setRoutes = (app) => {
    app.use('/api/users', userRoutes);

};

module.exports = setRoutes;
