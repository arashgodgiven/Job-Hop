// scripts/signUpP3.js

// Function to update the extension code based on the selected country
function updateExtensionCode() {
  const countryDropdown = document.getElementById('country');
  const extensionInput = document.getElementById('extension');
  const selectedCountry = countryDropdown.value;
  let extensionCode = '';

  // Set extension code based on the selected country
  switch (selectedCountry) {
    case 'CAN':
    case 'USA':
      extensionCode = '+1';
      break;
    case 'GBR':
      extensionCode = '+44';
      break;
    // Add more cases for other countries if needed
    default:
      extensionCode = '';
      break;
  }

  // Update the extension input with the extension code
  extensionInput.value = extensionCode;
}


let buttonClicked = false; // Flag to track button click

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const signUpButton = document.getElementById('signup-button');

    if (!buttonClicked) {
        document.querySelector('.phoneNumber-verification-code-div').style.display = 'block';

        // const verificationCodeInputs = verificationCodeDiv.querySelectorAll('input');
        // verificationCodeInputs.forEach(input => {
        //     input.required = true;
        // });

        // const formData = new FormData(document.getElementById('signup-form'));
        //
        // // Extract phone number and verification code from form data
        // const phoneNumber = formData.get('phoneNumber');
        // const verificationCode = formData.get('verification-code');
        //
        // fetch('/verify-code', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ phoneNumber, verificationCode })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         // Verification successful, proceed with signup
        //         // Implement signup process
        //     } else {
        //         // Verification failed, show error message
        //         alert(data.error);
        //     }
        // })
        // .catch(error => console.error('Error verifying code:', error));

        signUpButton.textContent = 'Sign Up'
        buttonClicked = true;

    } else {

        const formData = new FormData(document.getElementById('signup-form'));

        console.log(sessionStorage.getItem('firstName'));
        console.log(sessionStorage.getItem('lastName'));
        console.log(sessionStorage.getItem('dateOfBirth'));
        console.log(`${formData.get('country')} ${formData.get('extension')} ${formData.get('phoneNumber')}`);
        console.log(sessionStorage.getItem('email'));
        console.log(sessionStorage.getItem('password'));

        const userData = {
            firstName: sessionStorage.getItem('firstName'),
            lastName: sessionStorage.getItem('lastName'),
            dateOfBirth: sessionStorage.getItem('dateOfBirth'),
            phoneNumber: `${formData.get('country')} ${formData.get('extension')} ${formData.get('phoneNumber')}`,
            email: sessionStorage.getItem('email'), // Retrieve email from session storage
            password: sessionStorage.getItem('password'), // Retrieve password from session storage
        };

        fetch('/signup/complete', {
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
            window.location.href = '/signIn.html';
          } else { // Credentials are incorrect
            alert(data.error);
            window.location.href = '/users.html';
          }
        })
        .catch(error => console.error('Error signing up:', error));
    }
});


// Countdown function
function startCountdown() {
    let countdown = 30; // Countdown time in seconds

    const countdownInterval = setInterval(() => {
        // Display the countdown in an h4 element
        const countdownElement = document.createElement('h4');
        countdownElement.textContent = `Resend code in ${countdown}s`;

        const resendCodeDiv = document.querySelector('.resend-code-div');
        resendCodeDiv.innerHTML = ''; // Clear any existing content
        resendCodeDiv.appendChild(countdownElement);

        if (countdown === 0) {
            // When countdown reaches 0, display the resend code button again
            clearInterval(countdownInterval);
            resendCodeDiv.innerHTML = '<li class="resend-code">Resend code</li>';

            // Attach event listener to the resend code button
            const resendCodeButton = document.querySelector('.resend-code');
            resendCodeButton.addEventListener('click', handleResendCode);
        }

        countdown--;
    }, 1000); // Update countdown every second
}

// Function to handle resend code action
function handleResendCode() {
    // Hide the resend code button and start the countdown
    const resendCodeButton = document.querySelector('.resend-code');
    resendCodeButton.style.display = 'none';
    startCountdown();
}

// Attach event listener to the resend code button
const resendCodeButton = document.querySelector('.resend-code');
resendCodeButton.addEventListener('click', handleResendCode);


window.onload = updateExtensionCode;
