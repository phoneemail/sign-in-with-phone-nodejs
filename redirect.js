const jwt = require('jsonwebtoken');

const API_KEY = 'API_KEY'; // Please specify API key provided by Phone Email mobile application

let jwt_response, jwt_phone;

if (req.query.phtoken) {
  try {
    const decoded = jwt.verify(req.query.phtoken, API_KEY);
    jwt_response = 1; // JWT decoded successfully
    jwt_phone = decoded.country_code + decoded.phone_no; // You will get the user's phone number here from JWT
  } catch (error) {
    jwt_response = 0; // Invalid JWT
    jwt_phone = '';
  }
} else {
  jwt_response = 0; // Invalid JWT
  jwt_phone = '';
}
