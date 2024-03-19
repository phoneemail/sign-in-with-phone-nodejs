// Import necessary modules
const express = require("express");
const path = require("path");

// Create an instance of Express application
const app = express();

// Set the port for the server
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine and views directory
// app.set("view engine", "pug"); // Set Pug as the template engine
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));

// Define a route for the home page
app.get("/", async function (req, res) {
  try {
    
    const CLIENT_ID = "YOUR_CLIENT_ID";
    const REDIRECT_URL = req.protocol + "://" + req.get("host") + req.originalUrl;
    const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

    // Extract the access token from the query parameters
    const accessToken = req.query.access_token;

    // Initialize user details and token flag
    const userDetails = { countryCode: "", phoneNo: "" };
    const hasToken = accessToken || false;

    // Prepare data for rendering the view
    const data = { hasToken, userDetails, authUrl: AUTH_URL };

    // If there's an access token, fetch user details
    if (hasToken) {
      const url = "https://eapi.phone.email/getuser";

      // Prepare the payload for the API request
      const payload = new FormData();
      payload.append("access_token", accessToken);
      payload.append("client_id", CLIENT_ID);

      // Make a POST request to the API
      const response = await fetch(url, { method: "POST", body: payload });
      const responseData = await response.json();

      // Populate user details with the API response
      userDetails.countryCode = responseData.country_code;
      userDetails.phoneNo = responseData.phone_no;
      userDetails.jwt = responseData.ph_email_jwt;
    }

    // Render the "index" view with the data
    res.render("index", data);
  } catch (error) {
    // Handle errors and provide a meaningful response
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
