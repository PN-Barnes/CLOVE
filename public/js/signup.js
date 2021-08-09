const signupFormHandler = async (event) => {
  event.preventDefault();

  // collect values from the signup form
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const zipcode = document.querySelector('#zipcode-signup').value.trim();

  if (password.length < 6) {
    alert('Please enter a password at least 6 characters without space');
  } else if (zipcode.length != 5) {
    alert('Zip code should be 5 digit characters');
  } else if (!username) {
    alert('Please enter valid username');
  } else {
    // send a POST request to the API endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, zipcode }),
      headers: { 'Content-Type': 'application/json' },
    });

    // redirect to profile after sign up successfully
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(
        'Fail to signup caused by duplicated username or zipcode in wrong format'
      );
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
