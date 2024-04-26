// scripts/contacts.js

// Fetch user and their contacts
fetch('/current-user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch current user');
        }
        return response.json();
    })
    .then(user => {
        // Display current user
        const currentUser = document.querySelector('.current-user');
        currentUser.textContent = user.firstName + ' ' + user.lastName;

        // Fetch contacts for the current user
        return fetch('/contacts');
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        console.log(response);
        return response.json();
    })
    .then(contacts => {
        const contactList = document.getElementById('contact-list');
        // Clear previous contact list
        contactList.innerHTML = '';
        if (Array.isArray(contacts)) {
            contacts.forEach(contact => {
                const li = document.createElement('li');
                li.textContent = contact.email;
                contactList.appendChild(li);
            });
        } else {
            console.log('No contacts for this user');
            console.log(contacts);
        }
    })
    .catch(error => console.error('Error fetching user or contacts:', error));
