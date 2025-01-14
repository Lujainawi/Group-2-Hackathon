// window.navigateToScenario = function(page) {
//     window.location.href = page;
// };

window.navigateToScenario = function (scenarioPage, scenarioFileName) {
    localStorage.setItem('scenarioFileName', scenarioFileName); // שמירת שם הסצנה
    window.location.href = scenarioPage;
};


window.onload = function () {
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balls = [];

    function createBall() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 5 + 2,
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
        };
    }

    for (let i = 0; i < 50; i++) {
        balls.push(createBall());
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach((ball) => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();

            // Update ball position
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Bounce balls off the edges
            if (ball.x < 0 || ball.x > canvas.width) ball.dx *= -1;
            if (ball.y < 0 || ball.y > canvas.height) ball.dy *= -1;
        });

        requestAnimationFrame(draw);
    }

    draw();

    // Update canvas size on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
