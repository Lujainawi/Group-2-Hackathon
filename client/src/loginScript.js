// Preview uploaded image with progress bar
function previewImage(event) {
    const file = event.target.files[0];
    const progressBar = document.getElementById('uploadProgress');
    const preview = document.getElementById('preview');
    
    if (file) {
        const reader = new FileReader();
        reader.onloadstart = function() {
            progressBar.style.display = 'block';
            progressBar.value = 0;
        };
        reader.onprogress = function(e) {
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        };
        reader.onloadend = function() {
            progressBar.style.display = 'none';
            preview.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

// Remove uploaded image
function removeImage() {
    const preview = document.getElementById('preview');
    preview.src = "https://via.placeholder.com/100";
    document.getElementById('file-input').value = null;
}

// Save profile data locally
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const profile = {
        firstName: document.querySelector('input[name="first_name"]').value,
        lastName: document.querySelector('input[name="last_name"]').value,
        age: document.querySelector('input[name="age"]').value,
        bio: document.querySelector('textarea[name="bio"]').value,
        image: document.getElementById('preview').src,
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    showSuccessMessage("Profile saved successfully!");
    goToHome();
});

// Load saved profile on page load
window.onload = function() {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
        document.querySelector('input[name="first_name"]').value = savedProfile.firstName;
        document.querySelector('input[name="last_name"]').value = savedProfile.lastName;
        document.querySelector('input[name="age"]').value = savedProfile.age;
        document.querySelector('textarea[name="bio"]').value = savedProfile.bio;
        document.getElementById('preview').src = savedProfile.image;
    }
};

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4edda;
        color: #155724;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}

// Redirect to home page
function goToHome() {
    window.location.href = "homePage.html"; // Replace with the actual home page URL
}

// Login as guest
function guestLogin() {
    const guestProfile = {
        firstName: 'Guest',
        lastName: '',
        age: 'N/A',
        bio: 'Playing as a guest',
        image: "https://via.placeholder.com/100",
    };
    localStorage.setItem('profile', JSON.stringify(guestProfile));
    goToHome();
}

window.previewImage = previewImage;
window.removeImage = removeImage;
window.guestLogin = guestLogin;


