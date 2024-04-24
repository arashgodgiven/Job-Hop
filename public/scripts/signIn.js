// scripts/signIn.js

function togglePasswordVisibility(link) {
    var passwordInput = document.getElementById('password');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        link.textContent = "hide";
    } else {
        passwordInput.type = "password";
        link.textContent = "show";
    }
}

document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    // Send a request to the server to verify user's credentials
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response =>  {
      console.log(response); // Log the entire response object
      return response.json(); // Parse the response body as JSON)
    })
    .then(data => {
        console.log(data);
        if (data.success) {
            // If credentials are correct, display welcome message
            document.getElementById('signin-message').textContent = 'Welcome!';
        } else {
            // If credentials are incorrect, display error message
            document.getElementById('signin-message').textContent = 'Invalid email or password';
        }
    })
    .catch(error => console.error('Error signing in:', error));
});
