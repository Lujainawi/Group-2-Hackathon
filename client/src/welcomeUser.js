function checkToken() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("No token found. Redirecting to login.");
        window.location.href = "loginPage.html"; // Redirect to login
    } else {
        console.log("Token found:", token);
        personalizeWelcomeMessage(token);
    }
}

function decodeToken(token) {
    try {
        const payloadBase64 = token.split(".")[1]; // Extract the payload part of the JWT
        const decodedPayload = atob(payloadBase64); // Decode the Base64-encoded payload
        const payload = JSON.parse(decodedPayload); // Parse the JSON payload
        console.log("Decoded token payload:", payload); // Add this log to inspect the token payload
        return payload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

function personalizeWelcomeMessage(token) {
    const payload = decodeToken(token);
    if (payload) {
        console.log("Token payload:", payload); // Log the decoded payload

        const username = payload.username || "User"; // Extract the username
        console.log("Extracted username:", username); // Log the username

        document.getElementById("welcomeMessage").textContent = `Welcome, ${username}!`;
    } else {
        console.log("Payload is null. Defaulting to Guest.");
        document.getElementById("welcomeMessage").textContent = "Welcome, Guest!";
    }
}

function startGame() {
    console.log("Start Game button clicked"); // Debug log
    window.location.href = "startGame.html"; // Redirect to game page
}

function logOut() {
    console.log("Log Out button clicked"); // Debug log
    localStorage.removeItem("authToken");
    alert("You have been logged out!");
    window.location.href = "homePage.html"; // Redirect to home
}

// Attach event listeners
const startGameButton = document.getElementById("startGameButton");
const logOutButton = document.getElementById("logOutButton");

if (startGameButton) {
    startGameButton.addEventListener("click", startGame);
} else {
    console.error("Start Game button not found in the DOM");
}

if (logOutButton) {
    logOutButton.addEventListener("click", logOut);
} else {
    console.error("Log Out button not found in the DOM");
}
console.log("Script loaded successfully!");

// Check token and personalize on page load
window.onload = checkToken;
