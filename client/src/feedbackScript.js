const ratings = JSON.parse(localStorage.getItem("ratings")) || [];
        let selectedRating = 0;

        document.getElementById("stars").addEventListener("mouseover", function (e) {
            if (e.target.tagName === "SPAN") {
                const stars = document.querySelectorAll("#stars span");
                const value = parseInt(e.target.getAttribute("data-value"));
                stars.forEach((star) => {
                    star.classList.remove("active");
                    if (parseInt(star.getAttribute("data-value")) <= value) {
                        star.classList.add("active");
                    }
                });
            }
        });

        document.getElementById("stars").addEventListener("click", function (e) {
            if (e.target.tagName === "SPAN") {
                selectedRating = parseInt(e.target.getAttribute("data-value"));
                const stars = document.querySelectorAll("#stars span");
                stars.forEach((star) => {
                    star.classList.remove("active");
                    if (parseInt(star.getAttribute("data-value")) <= selectedRating) {
                        star.classList.add("active");
                    }
                });
            }
        });

        function submitRating() {
            const feedback = document.getElementById("feedback").value;
            const username = document.getElementById("username").value || "אנונימי";

            if (selectedRating === 0) {
                alert("Please select a star rating!");
                return;
            }

            if (feedback) {
                const newRating = {
                    username,
                    stars: selectedRating,
                    feedback,
                    replies: [],
                    likes: 0,
                    dislikes: 0,
                    userAction: null,
                };
                ratings.push(newRating);
                localStorage.setItem("ratings", JSON.stringify(ratings));
                displayRatings();
                document.getElementById("feedback").value = '';
                document.getElementById("username").value = '';
                const stars = document.querySelectorAll("#stars span");
                stars.forEach((star) => star.classList.remove("active"));
                selectedRating = 0;
            } else {
                alert("Please add a comment!");
            }
        }

        function displayRatings() {
            const messageList = document.getElementById("messageList");
            messageList.innerHTML = '<h2>responses</h2>';
            ratings.forEach((rating, index) => {
                const ratingDiv = document.createElement("div");
                ratingDiv.classList.add("message");
                ratingDiv.innerHTML = `
                    <p><strong>${rating.username}</strong> (${rating.stars} ⭐): ${rating.feedback}</p>
                    <span style="color: #d14784;">${rating.replies.length} responses</span>
                    <div class="message-actions">
                        <button onclick="likeMessage(${index})" class="${rating.userAction === 'like' ? 'active' : ''}">👍 <span>${rating.likes}</span></button>
                        <button onclick="dislikeMessage(${index})" class="${rating.userAction === 'dislike' ? 'active' : ''}">👎 <span>${rating.dislikes}</span></button>
                        <button onclick="deleteMessage(${index})">🗑️ delete</button>
                    </div>
                    <div class="replies" id="replies-${index}">
                        ${rating.replies.map(
                            (reply, replyIndex) =>
                                `<div class="reply">
                                    <span>${reply}</span>
                                    <button onclick="deleteReply(${index}, ${replyIndex})">delete</button>
                                </div>`
                        ).join("")}
                    </div>
                    <div class="reply-box">
                        <input type="text" placeholder="Add a comment..." id="reply-${index}">
                        <button onclick="addReply(${index})">Send</button>
                    </div>
                `;
                messageList.appendChild(ratingDiv);
            });
        }

        function addReply(index) {
            const replyInput = document.getElementById(`reply-${index}`);
            const replyText = replyInput.value;
            if (replyText) {
                ratings[index].replies.push(replyText);
                localStorage.setItem("ratings", JSON.stringify(ratings));
                displayRatings();
            } else {
                alert("Please add a comment!");
            }
        }

        function deleteReply(messageIndex, replyIndex) {
            if (confirm("Are you sure you want to delete the comment?")) {
                ratings[messageIndex].replies.splice(replyIndex, 1);
                localStorage.setItem("ratings", JSON.stringify(ratings));
                displayRatings();
            }
        }

        function likeMessage(index) {
            if (ratings[index].userAction === "like") {
                alert("You already liked this comment.");
                return;
            }
            if (ratings[index].userAction === "dislike") {
                ratings[index].dislikes -= 1;
            }
            ratings[index].likes += 1;
            ratings[index].userAction = "like";
            localStorage.setItem("ratings", JSON.stringify(ratings));
            displayRatings();
        }

        function dislikeMessage(index) {
            if (ratings[index].userAction === "dislike") {
                alert("You have already marked that you do not like this comment.");
                return;
            }
            if (ratings[index].userAction === "like") {
                ratings[index].likes -= 1;
            }
            ratings[index].dislikes += 1;
            ratings[index].userAction = "dislike";
            localStorage.setItem("ratings", JSON.stringify(ratings));
            displayRatings();
        }

        function deleteMessage(index) {
            if (confirm("Are you sure you want to delete the comment?")) {
                ratings.splice(index, 1);
                localStorage.setItem("ratings", JSON.stringify(ratings));
                displayRatings();
            }
        }
        displayRatings();

window.submitRating = submitRating;
window.addReply = addReply;
window.deleteReply = deleteReply;
window.likeMessage = likeMessage;
window.dislikeMessage = dislikeMessage;
window.deleteMessage = deleteMessage;