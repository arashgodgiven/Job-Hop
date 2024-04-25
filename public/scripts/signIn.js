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
<<<<<<< Updated upstream
=======

// document.getElementById('signin-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//
//     const formData = new FormData(this);
//     const userData = {
//         email: formData.get('email'),
//         password: formData.get('password')
//     };
//
//     // Send request to the server to verify user's credentials
//     fetch('/signin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(response => response.json()) // Parse the response body as JSON)
//     .then(data => {
//         console.log("gets here")
//         if (data.success) { // Credentials are correct
//             console.log("signed in")
//             alert(data.message);
//             window.location.href = '/index.html';
//         } else { // Credentials are incorrect
//             console.log("NOT signed in")
//             console.log(data.message)
//             alert(data.message);
//         }
//     })
//     .catch(error => console.error('Error signing in:', error));
// });


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
        if (data.success) { // Credentials are correct
          alert(data.message);
          window.location.href = '/index.html';
        } else { // Credentials are incorrect
          alert(data.message);
        }
    })
    .catch(error => console.error('Error signing in:', error));
});
>>>>>>> Stashed changes
