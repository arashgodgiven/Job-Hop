// scripts/signUpP2.js

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

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    console.log(formData.get('firstName'));
    console.log(formData.get('lastName'));
    console.log(formData.get('dateOfBirth'));
    console.log(`${formData.get('country')} ${formData.get('extension')} ${formData.get('phoneNumber')}`);
    console.log(sessionStorage.getItem('email'));
    console.log(sessionStorage.getItem('password'));

    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        dateOfBirth: formData.get('dateOfBirth'),
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
        // window.location.href = '/signUpP2.html';
        // window.location.href = '/users.html';
      } else { // Credentials are incorrect
        alert(data.error);
        window.location.href = '/users.html';
      }
    })
    .catch(error => console.error('Error signing up:', error));
});

window.onload = updateExtensionCode;
