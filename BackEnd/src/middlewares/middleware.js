const cors = require('cors');
const cookies = require('cookie-parser');

module.exports = function (app, express) {
    // Middleware: JSON parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Middleware: Cookie parser
    app.use(cookies());

    // CORS configuration
    app.use(
        cors({
            origin: process.env.CLIENT_URL, // Allow requests only from the frontend
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
            credentials: true, // Allow cookies and credentials
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'Accept',
            ], // Allow specific headers
            exposedHeaders: ['Content-Disposition'], // Expose specific headers to the client
        })
    );

    // Optional: Log request time
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });
};
