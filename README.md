# Sign in with Phone - Node.js Demo

Welcome to the Node.js demo repository for integrating "Sign in with Phone" functionality into your web applications. This repository showcases how you can seamlessly implement phone verification and authentication using our innovative plugin.

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Example Demo](#example-demo)
5. [Website](#website)
6. [Documentation](#documentation)

## Introduction

Phone Email presents a groundbreaking solution for user authentication - "Sign in with Phone". Our plugin empowers websites to offer seamless phone number verification to users, enhancing security and user experience. Just like Firebase phone authentication, our solution embeds a "Log in with phone" button on client websites. Upon clicking, a verification window prompts users to enter their country code and mobile number. After successful verification through OTP sent to the user's mobile, control redirects back to the client website with an access token. Subsequently, passing this access token to the `getuser` REST API retrieves the verified mobile number.

### Key Benefits:
- **Cost-Effective:** Minimal or no cost for phone verification.
- **Enhanced Security:** OTP-based verification ensures secure authentication.
- **Seamless Integration:** Easy integration into existing web applications.
- **Improved User Experience:** Streamlined authentication process for users.

## Installation

To integrate the "Sign in with Phone" functionality into your Node.js project, follow these steps:

1. **Clone the repository:**

```
    git clone https://github.com/phoneemail/sign-in-with-phone-nodejs.git
```


2. **Navigate to the project directory:**

    ```bash
    cd sign-in-with-phone-nodejs
    ```


3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Change the configuration:**
Replace `CLIENT_ID` with your client ID and `YOUR_REDIRECT_URL` with your success page URL in the configuration file.

## Usage

To utilize the application:

1. **Start the application:**

    ```bash
    npm start
    ```

2. **Open URL on a browser:**
Open your web browser and go to [http://localhost:3000](http://localhost:3000).

## Example Demo

Explore a live demo of "Sign in with Phone" in action: [Demo URL](https://www.phone.email/demo-login)

## Website

For more information about our services, visit our website: [www.phone.email](https://www.phone.email)

## Documentation

Refer to our comprehensive documentation for detailed integration guides: [Node.js Documentation](https://www.phone.email/docs#nodejs)

---
Developed by [Phone Email](https://www.phone.email)
