let currentLevel = 1;

async function loadScenario(level) {
    const messagesElement = document.getElementById("messages");
    const optionsElement = document.getElementById("options");

    try {
        const response = await fetch(`/CommunityInvolvementScenario.json`);
        const questionsData = await response.json();

        // Find the relevant level
        const scenario = questionsData.find(q => q.level === level);
        if (!scenario) {
            const botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot");
            botMessage.textContent = "Scenario not found!";
            messagesElement.appendChild(botMessage);
            return;
        }

        // Display the bot's message
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.textContent = scenario.botMessage;
        messagesElement.appendChild(botMessage);

        // Display the options
        optionsElement.innerHTML = "";
        scenario.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.onclick = () => handleResponse(option.nextLevel, option.text, option.alertId);
            optionsElement.appendChild(button);
        });

        // Scroll to the bottom of the messages
        messagesElement.scrollTop = messagesElement.scrollHeight;
    } catch (error) {
        console.error('Error loading scenario:', error);
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.textContent = "Failed to load the scenario. Please try again later.";
        messagesElement.appendChild(botMessage);
    }
}




function handleResponse(nextLevel, userText, alertId) {
    const messages = document.getElementById("messages");
    
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.textContent = userText;
    messages.appendChild(userMessage);

    messages.scrollTop = messages.scrollHeight;

    if (alertId) {
        showAlert(alertId);
        return;
    }

    if (nextLevel) {
        loadScenario(nextLevel);
    } else {
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.textContent = "Thank you for your response!";
        messages.appendChild(botMessage);
    }
}

function showAlert(alertId) {
    const alertData = alerts[alertId];
    if (!alertData) return;

    const modal = document.getElementById("alertModal");
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
    <h2>${alertData.title}</h2>
    ${alertData.content}
    <button onclick="window.location.href='startGame.html'">Back to Home</button>
    <button onclick="nextLevel()">Continue to the next level</button>
    `;

    modal.style.display = "flex";
}

const alerts = {
    alert1: {
        title: "Caution – Sharing Personal Information Requires Careful Consideration",
        content: `
            <p>What to Remember?<br>Sharing personal information with someone you don’t know well can be dangerous.<br>
            Once personal information is shared, you lose control over how it might be used.</p>
            <p>Why is this Important?<br>Even if intentions seem good, there’s no way to know for sure who is on the other side of the screen.<br>
            It’s always a good idea to avoid sharing details like phone numbers, addresses, or photos.</p>
            <p>What Should You Do Next?<br>If you feel uncomfortable, stop the conversation and talk to a trusted adult.<br>
            Avoid sharing additional details and make sure to respond cautiously.</p>
            <p>Takeaway Message: "Sharing personal information requires great caution. Always remember that you have the right to stop and protect your privacy."</p>
        `
    },
    alert2: {
        title: "Balanced Choice – Protecting Your Privacy is a Smart Decision",
        content: `
            <p>What to Remember?<br>You’re maintaining clear boundaries and protecting your privacy.<br>
            This is a good way to test the intentions of the person on the other side without revealing unnecessary details.</p>
            <p>Why is this a Good Choice?<br>It allows you to continue the conversation in a comfortable and safe way.<br>
            You’re protecting yourself from unnecessary risks.</p>
            <p>What Should You Do Next?<br>Ensure the person respects your boundaries and doesn’t pressure you to share more information.<br>
            If you feel additional pressure, consider stopping the conversation entirely and informing a trusted adult.</p>
            <p>Takeaway Message: "Maintaining clear boundaries shows maturity and helps you feel safe."</p>
        `
    },
    alert3: {
        title: "Wise Choice – Consulting Your Parents Increases Your Confidence",
        content: `
            <p>What to Remember?<br>Consulting your parents is an excellent way to ensure you’re acting safely.<br>
            They can help you decide whether sharing personal information is appropriate in this situation.</p>
            <p>Why is this a Smart Choice?<br>You’re taking responsibility for your safety by checking with people you trust.<br>
            It’s a way to protect yourself while maintaining positive relationships with your parents.</p>
            <p>What Should You Do Next?<br>Share the details of the conversation with your parents and ask for their advice.<br>
            If they advise against sharing, respect their decision and maintain your privacy.</p>
            <p>Takeaway Message: "Consulting responsible adults is a great way to ensure you’re acting safely and correctly."</p>
        `
    }
};


loadScenario(currentLevel);