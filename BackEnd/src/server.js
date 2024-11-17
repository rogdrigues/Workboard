require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const useMiddlewares = require('./middlewares/middleware');

// Call middleware.js
useMiddlewares(app, express);
//Seed data

//Routes

//Controller

//await for mongoose connection
(async () => {
    try {
        //Connect to MongoDB
        //await connectDB();
        //Seeder Data with reset
        if (process.env.SEED_DATA_RESET === 'true') {

        }
        //Routes
        setRoutes(app);

    } catch (error) {
        console.log('MongoDB connection failed', error);
    }
})()
