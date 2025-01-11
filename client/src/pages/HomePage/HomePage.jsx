const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }

                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 105, 180, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.startGame = function startGame() {
            alert('Starting the game...');
        };

        window.showInstructions = function showInstructions() {
            alert('Instructions: Learn how to navigate the internet safely through interactive scenarios.');
        };

        window.showFeedbackPreview = function showFeedbackPreview() {
            alert('Feedback will be available after completing the game!');
        };

        window.exitGame = function exitGame() {
            if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
                alert('Progress saved. Goodbye!');
                window.close();
            }
        };

        window.showHelpModal = function showHelpModal() {
            document.getElementById('helpModal').style.display = 'flex';
        };

        window.closeModal = function closeModal() {
            document.getElementById('helpModal').style.display = 'none';
        };

        // إغلاق النافذة عند النقر خارجها
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('helpModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });