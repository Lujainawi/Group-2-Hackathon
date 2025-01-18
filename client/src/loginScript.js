
document.getElementById("auth-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = "Login successful!";
            messageElement.style.color = "green";

            // Save the token and redirect to the welcome page
            localStorage.setItem("authToken", data.token);
            window.location.href = "startGame.html";
        } else {
            // Handle invalid credentials
            messageElement.textContent = data.error || "Login failed!";
            messageElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error during login:", error);
        messageElement.textContent = "An error occurred during login.";
        messageElement.style.color = "red";
    }
});

// Guest login logic
document.getElementById("guestButton").addEventListener("click", () => {
    alert("Logging in as a guest...");
    window.location.href = "game.html"; // Redirect to guest game page
});
