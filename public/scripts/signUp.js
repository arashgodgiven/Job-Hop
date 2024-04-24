// scripts/index.js

function togglePasswordVisibility(link, passwordId) {
    var passwordInput = document.getElementById(passwordId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        link.textContent = "hide";
    } else {
        passwordInput.type = "password";
        link.textContent = "show";
    }
}

// Get references to the password inputs and the password match message
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirm-password');
var passwordMatchMessage = document.getElementById('password-match-message');

// Add event listener to confirmPasswordInput to check password match on input change
// confirmPasswordInput.addEventListener('input', checkPasswordMatch);

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = '/signIn.html'; // Redirect to users.html after successful signup
    })
    .catch(error => console.error('Error signing up:', error));
});
