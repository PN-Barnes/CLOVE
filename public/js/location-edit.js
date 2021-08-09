const changeZip = async (event) => {
  event.preventDefault();
  console.log('Button activated');
  const zipCode = document.querySelector('#newZip').value.trim();
  const userName = document.querySelector('#username').value.trim();
  try {
    const response = await fetch(`/api/users/profile/location/${userName}`, {
      method: 'PUT',
      body: JSON.stringify({
        zipcode: zipCode,
        username: userName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('Zipcode Changed');
      document.location.replace('/profile');
    } else {
      alert('Failed to change Zip Code');
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('form').addEventListener('submit', changeZip);
