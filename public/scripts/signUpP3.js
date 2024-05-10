// scripts/signUpP3.js

// Function to update the extension code based on the selected country
function updateExtensionCode() {
  const countryDropdown = document.getElementById('country');
  const extensionInput = document.getElementById('extension');
  const selectedCountry = countryDropdown.value;
  let extensionCode = '';

  switch (selectedCountry) {
    case 'CAN':
    case 'USA':
      extensionCode = '+1';
      break;
    case 'GBR':
      extensionCode = '+44';
      break;
    default:
      extensionCode = '';
      break;
  }

  extensionInput.value = extensionCode;
}

// Function to allow only numbers in the phone number input
document.getElementById('phoneNumber').addEventListener('input', function(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
});

let buttonClicked = false;
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

        const firstVerificationCodeInput = document.getElementById('phoneNumber-verification-code-1');
        firstVerificationCodeInput.focus();

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
            email: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password'),
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
          if (data.success) {
            alert(data.message);
            window.location.href = '/signIn.html';
          } else {
            alert(data.error);
            window.location.href = '/users.html';
          }
        })
        .catch(error => console.error('Error signing up:', error));
    }
});


// Function to set a countdown for resending the verification code
function startCountdown() {
    let countdown = 30;

    const countdownInterval = setInterval(() => {
        const countdownElement = document.createElement('h4');
        countdownElement.textContent = `Resend code in ${countdown}s`;

        const resendCodeDiv = document.querySelector('.resend-code-div');
        resendCodeDiv.innerHTML = '';
        resendCodeDiv.appendChild(countdownElement);

        if (countdown === 0) {
            clearInterval(countdownInterval);
            resendCodeDiv.innerHTML = '<li class="resend-code">Resend code</li>';

            const resendCodeButton = document.querySelector('.resend-code');
            resendCodeButton.addEventListener('click', handleResendCode);
        }

        countdown--;
    }, 1000);
}
// Function to resend the verification code
function handleResendCode() {
    const resendCodeButton = document.querySelector('.resend-code');
    resendCodeButton.style.display = 'none';
    startCountdown();
}
// Attach event listener to the resend code button
const resendCodeButton = document.querySelector('.resend-code');
resendCodeButton.addEventListener('click', handleResendCode);

// Add event listeners to all verification code inputs
const verificationCodeInputs = document.querySelectorAll('.phoneNumber-verification-code-div input');
verificationCodeInputs.forEach(input => {
    input.addEventListener('input', handleVerificationCodeInput);
    input.addEventListener('keydown', handleVerificationCodeNavigation);
});

// Function to handle input validation
function handleVerificationCodeInput(event) {
    const input = event.target;
    const inputValue = input.value;
    // Allow only digits (0-9)
    if (!/^\d$/.test(inputValue)) {
        input.value = '';
    }
}

// Function to handle navigation between verification code inputs
function handleVerificationCodeNavigation(event) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    if (event.key >= '0' && event.key <= '9' && currentLength === maxLength) {
        const nextInputIndex = Array.from(verificationCodeInputs).indexOf(input) + 1;
        if (nextInputIndex < verificationCodeInputs.length) {
            verificationCodeInputs[nextInputIndex].focus();
        }
    }
    if (event.key === 'Backspace' && currentLength === 0) {
        const prevInputIndex = Array.from(verificationCodeInputs).indexOf(input) - 1;
        if (prevInputIndex >= 0) {
            verificationCodeInputs[prevInputIndex].focus();
        }
    }
}

window.onload = updateExtensionCode;
