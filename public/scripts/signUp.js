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

<<<<<<< Updated upstream
    if (password === confirmPassword) {
        passwordMatchMessage.textContent = 'Passwords match';
        passwordMatchMessage.style.color = 'green';
    } else {
        passwordMatchMessage.textContent = 'Passwords do not match';
        passwordMatchMessage.style.color = 'red';
    }
}
=======
    const formData = new FormData(this);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
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
        alert(data.message);
        // window.location.href = '/signIn.html';
        sessionStorage.setItem('email', userData.email); // Save email in session storage
        sessionStorage.setItem('password', userData.password); // Save password in session storage
        window.location.href = '/signUpP2.html';
        // window.location.href = '/users.html';
      } else { // Credentials are incorrect
        alert(data.error);
        window.location.href = '/users.html';
      }
    })
    .catch(error => console.error('Error signing up:', error));
});
>>>>>>> Stashed changes
