// Import necessary libraries
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
dotenv.config(); // Load environment variables

// Set up view engine and static file serving
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Enable CORS for all routes
app.use(cors());

// Token verification endpoint for AngularJS and Next.js
app.get('/verify-token', (req, res) => {
    // Extract phtoken from query parameters
    const token = req.query.phtoken;

    // Check if phtoken exists
    if (!token) {
        return res.status(400).json({ error: 'Token is missing in the request URL.' });
    }

    // Verify the JWT
    jwt.verify(token, process.env.API_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        // If verification is successful, decoded contains the payload of the JWT
        // Additional verification logic can be implemented here
        const data = { country_code: decoded.country_code, phone_no: decoded.phone_no };
        res.json({ success: true, message: 'Token is valid.', data });
    });
});

// Authentication endpoint
app.get('/auth', (req, res) => {
    try {
        // Extract token from query parameters
        const token = req.query.phtoken;

        // Check if token exists
        if (!token) {
            throw new Error("Token is required for authentication.");
        }

        // Verify the JWT
        const decoded = jwt.verify(token, process.env.API_KEY, { algorithm: 'HS256' });

        // Render success view with decoded information
        const message = `${decoded.country_code} ${decoded.phone_no}`;
        const status = `success`;
        return res.render('pages/auth-success', { message, status, token });
    } catch (error) {
        // Render error view with error message
        const status = 'failure';
        const message = error.message;
        return res.render('pages/auth-error', { status, message });
    }
});

// Main endpoint
app.get('/', (req, res) => {
    // Set query parameters for constructing the URL
    const queryParams = {
        countryCode: process.env.COUNTRY_CODE,
        phoneNo: process.env.PHONE_NO,
        redirectUrl: process.env.REDIRECT_URL,
    };

    // Construct URL for the phone sign-in page
    const phoneSignInUrl = `https://www.phone.email/auth/sign-in?countrycode=${queryParams.countryCode}&phone_no=${queryParams.phoneNo}&redirect_url=${queryParams.redirectUrl}`;

    // Render the main view with the constructed URL
    return res.render('pages/index', { phoneSignInUrl });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
