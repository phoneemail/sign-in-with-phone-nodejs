// Import necessary modules
const express = require("express");
const path = require("path");
const axios = require('axios');


// Create an instance of Express application
const app = express();

// Set the port for the server
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Set the view engine and views directory
// app.set("view engine", "pug"); // Set Pug as the template engine
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));



// Define a route for the home page
app.get("/", async function (req, res) {
  try {
    res.render("index");
  } catch (error) {
    // Handle errors and provide a meaningful response
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


// Define a route to handle user data
app.post("/api/saveUser", async (req, res) => {
  const { user_json_url } = req.body;
  try {
    // Fetch the data from the user_json_url
    const response = await axios.get(user_json_url);
    const userData = response.data;

    // Extract the required details
    const user_country_code = userData.user_country_code;
    const user_phone_number = userData.user_phone_number;

    console.log("User country code:", user_country_code);
    console.log("User phone number:", user_phone_number);

    // Here you can save the user details to your database or perform any other operation
    // For now, we just send a success response
    res.status(200).send({ message: "User data received successfully" });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send({ message: "Failed to fetch user data" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
