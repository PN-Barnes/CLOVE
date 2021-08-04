const signupFormHandler = async (event) => {
    event.preventDefault();

    // collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const zipcode = document.querySelector('#zipcode-signup').value.trim();

    if (username && password && zipcode) {
        // send a POST request to the API endpoint
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, zipcode }),
            headers: { 'Content-Type': 'application/json'},
        });

        // redirect to profile after sign up successfully
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);