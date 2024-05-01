// scripts/index.js

// Function to display signed in user
fetch('/current-user')
.then(response => response.json())
.then(data => {
  console.log(data)
  if (data.firstName) {
    console.log(data.user)
    const accountLink = document.getElementById('myAccountLink');
    accountLink.textContent = data.firstName;
  }
})
.catch(error => console.error('Error fetching current user:', error));


// // Function to deleteContactsLink
// const deleteContactsLink = document.getElementById('deleteContactsLink');
// deleteContactsLink.addEventListener('click', deleteAllContacts);
// function deleteAllContacts() {
//   // Remove from databse
//   fetch('/contacts/delete-all', {
//       method: 'DELETE'
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data.success) {
//         console.log("Contacts on Delete:")
//         if (data.contacts.length === 0) {
//           console.log('No Contacts');
//         } else {
//           data.contacts.forEach(contact => {
//               console.log('Contact:', contact.firstName);
//           });
//         }
//         alert(data.message);
//         toggleAddNewContactView();
//         toggleAddNewContactView();
//       } else {
//         console.log('contacts generated after deletion');
//         console.log('currentUser: ', data.user);
//         console.log('foundUser: ', data.foundUser);
//         console.log('fetched contacts:');
//         data.contacts.forEach(contact => {
//             console.log('Contact:', contact.firstName);
//         });
//         alert(data.error);
//         toggleAddNewContactView();
//         toggleAddNewContactView();
//       }
//   })
//   // Remove from HTML
//   const contactsListView = document.getElementById('contactsListView');
//   const contactCards = contactsListView.querySelectorAll('.contact-card');
//   contactCards.forEach(contactCard => {
//     contactCard.remove();
//   });
// }
//
// // Function to fetchContactsLink
// const fetchContactsLink = document.getElementById('fetchContactsLink');
// fetchContactsLink.addEventListener('click', ftechAllContacts);
// function ftechAllContacts() {
//   fetch('/contacts')
//   .then(response => response.json())
//   .then(data => {
//     if (data.success) {
//       console.log('fetched contacts:');
//       data.contacts.forEach(contact => {
//           console.log('Contact:', contact.firstName);
//       });
//     } else {
//       alert(data.error);
//     }
//   })
//   .catch(error => console.error('Error fetching contacts:', error));
// }



// Function to togle wrap
function toggleWrap() {
    var wrapSection = document.getElementById('wrapSection')
    if (wrapSection.style.display === 'none') {
      wrapSection.style.display = 'flex';
    } else {
      wrapSection.style.display = 'none'
      window.location.href = 'signIn.html';
    }
}

function toggleForm() {
    var formSection = document.getElementById('formSection');
    // Toggle the display property of the form section
    if (formSection.style.display === 'none') {
        formSection.style.display = 'block';
        contactDetailViewSection.style.display = 'none';
    } else {
        formSection.style.display = 'none';
        // contactDetailViewSection.style.display = 'block';
    }
}

// Function to validate email address
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Function to add a new contact
function addContact() {
    // Get form inputs
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var position = document.getElementById('position').value || null; // Optional position input
    var company = document.getElementById('company').value || null; // Optional company input
    var imageInput = document.getElementById('image');
    var image = imageInput.files[0]; // Get the uploaded image file

    // Validate email address
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Check if an image is uploaded
    var imageUrl;
    if (image) {
        // If an image is uploaded, create a local URL for it
        imageUrl = URL.createObjectURL(image);
    } else {
        // If no image is uploaded, use the default image
        imageUrl = 'thumbnails/channel-1.jpeg';
    }

    // Create contact object
    var contact = {
      firstName: firstName,
      lastName: lastName,
      position: position,
      company: company,
      email: email,
      // image: imageUrl
    };
    console.log(firstName, lastName, position, company, email, imageUrl);

    // Send POST request to create new contact
    fetch('/contacts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(response => {
      console.log(response); // Log the entire response object
      return response.json(); // Parse the response body as JSON)
    })
    .then(data => {
      console.log(data);
      // console.log('Contact created:', data.contact);
      // console.log('Constact owner:', data.currentUser.firstName);
      if (data.success) { // Credentials are correct
        alert(data.message);
      } else { // Credentials are incorrect
        alert(data.message);
      }
    })
    .catch(error => console.error('Error creating contact:', error));

    fetchContacts();
    toggleAddNewContactView();
}

function fetchContacts() {
  fetch('/contacts')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('fetched contacts:');
      data.contacts.forEach(contact => {
          console.log('Contact:', contact.firstName);
          populateContacts(contact);
      });
    } else {
      alert(data.error);
    }
  })
  .catch(error => console.error('Error fetching contacts:', error));
}

function toggleAddNewContactView() {
  var contactAddMethodView = document.getElementById('contactAddMethodView');
  var formSection = document.getElementById('formSection');
  var addContactButton = document.querySelector('.contactsView-addContactButton span');

  if (contactAddMethodView.style.display == 'none') {
    contactAddMethodView.style.display = 'block';
    contactsListView.style.display = 'none';
    addContactButton.textContent = 'close';
    addContactButton.classList.add('transitioning');
  } else {
    contactAddMethodView.style.display = 'none';
    formSection.style.display = 'none';
    contactsListView.style.display = 'block';
    addContactButton.textContent = 'add';
    addContactButton.classList.remove('transitioning');
  }
}

// <li class="contact-leftSide"><img src=${contact.image} alt="contact-image"></li>
// Function to populate contacts
function populateContacts(contact) {
    const contactCard = `
        <div class="contact-card" onclick="toggleContactDetailPageView()">
            <li class="contact-leftSide"><img src="thumbnails/placeholder.jpeg" alt="contact-image"></li>

            <div class="contact-rightSide">
                <div class="contact-firstRow">
                    <li class="firstRow"><a class="contact-name">${contact.firstName} ${contact.lastName}</a></li>
                    <div class="bullet"></div>
                    <li class="firstRow"><a class="contact-workPlace">${contact.position ? contact.position + ' @ ' : ''}${contact.company ? contact.company : ''}</a></li>
                </div>
                <div class="contact-seccondRow">
                    <div class="contact-email">${contact.email}</div>
                </div>
            </div>
        </div>
    `;

    // Append contact card to the scrollable section
    document.querySelector('.scrollable-section').insertAdjacentHTML('beforeend', contactCard);
    // Reset form inputs
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('position').value = ''; // Reset position input
    document.getElementById('company').value = ''; // Reset company input
    imageInput.value = ''; // Reset the file input
}




// Function to add more link inputs
function addMoreLinks() {
    const linksInputs = document.querySelectorAll('.website');
    const isAllFilled = Array.from(linksInputs).every(input => input.value.trim() !== '');

    if (isAllFilled) {
        const linksInputDiv = document.getElementById('linksInputContainer');
        const newLinkInput = document.createElement('div');
        newLinkInput.classList.add('additional-links');
        newLinkInput.innerHTML = `
          <div class="new-link">
            <input type="url" class="website" name="website[]" placeholder="Add a Link" required>
            <div class="remove-links-div">
              <span class="material-symbols-outlined" onclick="removeLink(this)">remove</span>
            </div>
          </div>
        `;
        if (linksInputDiv.lastChild) {
            linksInputDiv.insertBefore(newLinkInput, linksInputDiv.lastChild.nextSibling);
            const prevLinkInput = linksInputDiv.lastChild.previousSibling;
            const removeButton = document.createElement('span');
            removeButton.classList.add('material-symbols-outlined');
            removeButton.textContent = 'remove';
            removeButton.onclick = function() {
                removeLink(this);
            };
            if (prevLinkInput && prevLinkInput.querySelector) {
                prevLinkInput.querySelector('.remove-links-div').appendChild(removeButton);
            } else {
                newLinkInput.querySelector('.remove-links-div').appendChild(removeButton);
            }
        } else {
            linksInputDiv.appendChild(newLinkInput);
        }

        const linkInputsDiv = document.querySelector('.link-inputs-div');
        const numLinkInputs = linksInputs.length + 1; // Add 1 for the newly added link
        if (numLinkInputs === 0) {
            linkInputsDiv.style.marginRight = '95.5px';
        } else {
            linkInputsDiv.style.marginRight = '66.5px';
        }

        // Scroll to the end of the page
        const centerDiv = document.querySelector('.center-div');
        centerDiv.scrollTop = centerDiv.scrollHeight;
    } else {
        alert('Please fill in all current link inputs before adding another.');
    }
}

// Function to remove a link input
function removeLink(button) {
    const linkInputContainer = button.parentElement.parentElement;
    linkInputContainer.remove();
}

// Function to toggle form visibility
function toggleForm() {
    var formSection = document.getElementById('formSection');
    // Toggle the display property of the form section
    if (formSection.style.display === 'none') {
        formSection.style.display = 'block';
        contactDetailViewSection.style.display = 'none';
    } else {
        formSection.style.display = 'none';
        // contactDetailViewSection.style.display = 'block';
    }
}

var contactCardVar;
function toggleContactDetailPageView(contactCard) {
    var contactDetailViewSection = document.getElementById('contactDetailViewSection');
    var formSection = document.getElementById('formSection');

    if (contactDetailViewSection.style.display === 'none') {
        formSection.style.display = 'none';
        contactDetailViewSection.style.display = 'block';
    }

    // var contactImageSrc = contactCard.querySelector('.contact-leftSide img').src;
    var contactName = contactCard.querySelector('.contact-name').textContent;
    var contactWorkPlace = contactCard.querySelector('.contact-workPlace').textContent;
    var contactEmail = contactCard.querySelector('.contact-email').textContent;

    // Update content in the detail page with the contact information
    // var contactImageElement = contactDetailViewSection.querySelector('.contact-image');
    var contactNameElement = contactDetailViewSection.querySelector('.contact-name');
    var contactWorkPlaceElement = contactDetailViewSection.querySelector('.contact-workPlace');
    var contactEmailElement = contactDetailViewSection.querySelector('.contact-email');

    // contactImageElement.src = contactImageSrc;
    contactNameElement.textContent = contactName;
    contactWorkPlaceElement.textContent = contactWorkPlace;
    contactEmailElement.textContent = contactEmail;

    contactCardVar = contactCard;
}

const imageInput = document.getElementById('image');
const imageLabel = document.querySelector('.file-input-label');

imageLabel.addEventListener('click', function() {
    imageInput.click();
});

function removeContactDetailPageView() {
    var contactDetailViewSection = document.getElementById('contactDetailViewSection');
    var formSection = document.getElementById('formSection');

    if (contactDetailViewSection.style.display === 'none') {
        formSection.style.display = 'none';
        contactDetailViewSection.style.display = 'block';
    } else {
        formSection.style.display = 'none';
        contactDetailViewSection.style.display = 'none';
    }
}


// Function to display kebab menu for contact page
const modal = document.getElementById('contactModal');
const moreVertButtonContact = document.getElementById('contactMoreVertButton');
// Toggle modal display
function toggleModal() {
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}
moreVertButtonContact.onclick = function() {
  toggleModal();
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.getElementById('shareContactButton').addEventListener('click', function() {
  // Add your share functionality here
});
document.getElementById('editContactButton').addEventListener('click', function() {
  // Add your edit functionality here
});
document.getElementById('deleteContactButton').addEventListener('click', function() {
  const contactVarCard = contactCardVar;
  const contactEmail = contactVarCard.querySelector('.contact-email').textContent;
  console.log('Email address of the contact:', contactEmail);

  fetch(`/delete-contact/${contactEmail}`, {
        method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(data.message); // Log success message
    } else {
      console.error(data.error); // Log error message
    }
  })
  .catch(error => {
    console.error('Error deleting contact:', error);
  });
});

// Fetch contacts on load
fetchContacts();
// deleteAllContacts();
