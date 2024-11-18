require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const useMiddlewares = require('./middlewares/middleware');

// Call middleware.js
useMiddlewares(app, express);
//Seed data
const seedAllData = require('./seeder/index');
//Routes
const setRoutes = require('./routes/index');

//await for mongoose connection
(async () => {
    try {
        //Connect to MongoDB
        await connectDB();
        //Seeder Data with reset
        if (process.env.SEED_DATA_RESET === 'true') {
            await seedAllData();
        }
        //Routes
        setRoutes(app);
        app.listen(process.env.NODE_PORT, () => {
            console.log(`Server running at http://${process.env.MONGO_HOST}:${process.env.NODE_PORT}/`);
        })
    } catch (error) {
        console.log('MongoDB connection failed', error);
    }
})()
