// scripts/signUp.js

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
confirmPasswordInput.addEventListener('input', checkPasswordMatch);

function checkPasswordMatch() {
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        passwordMatchMessage.textContent = 'Passwords match';
        passwordMatchMessage.style.color = 'green';
    } else {
        passwordMatchMessage.textContent = 'Passwords do not match';
        passwordMatchMessage.style.color = 'red';
    }
}
