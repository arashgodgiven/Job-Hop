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
        passwordMatchMessage.textContent = "Passwords match";
        passwordMatchMessage.style.color = "#258c3e";
    } else {
        passwordMatchMessage.textContent = "Passwords do not match";
        passwordMatchMessage.style.color = "red";
    }
}

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password')
    };

    fetch('/signup/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) { // Credentials are correct
        console.log(data.message);
        sessionStorage.setItem('email', userData.email); // Save email in session storage
        sessionStorage.setItem('password', userData.password); // Save password in session storage
        window.location.href = '/signUpP2.html';
      } else { // Credentials are incorrect
        alert(data.error);
        console.log("password: ", data.password);
        console.log("confirm password: ", data.confirmPassword);
        // window.location.href = '/users.html';
      }
    })
    .catch(error => console.error('Error signing up:', error));
});
