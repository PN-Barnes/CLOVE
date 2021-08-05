const loginFormHandler = async (event) => {
    event.preventDefault();

    // collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        // redirect the user to profile when logged in
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);