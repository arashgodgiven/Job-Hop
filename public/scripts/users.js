// scripts/users.js

// Function to delete all users
function deleteAllUsers() {
    fetch('/delete/users', {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Reload the user list page after deletion
            location.reload();
        } else {
            console.error('Error deleting users:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting users:', error));
}


// Fetch user list and display
fetch('/users')
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById('user-list');
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.email;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching users:', error));


document.getElementById('delete-user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmail = document.getElementById('delete-email').value;

    fetch(`/delete-user/${userEmail}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('User deleted successfully');
            location.reload(); // Refresh the page to reflect the changes
        } else {
            return response.json(); // Parse the response body as JSON
        }
    })
    .then(data => {
        if (data && data.error) {
            alert(data.error); // Display the error message from the response
        }
          // else {
          //     alert('Failed to delete user');
          // }
    })
    .catch(error => console.error('Error deleting user:', error));
});


// Add event listener to the delete button
document.getElementById('delete-users-button').addEventListener('click', deleteAllUsers);
