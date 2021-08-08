const getSearchResults = async (event) => {
  event.preventDefault();

  console.log('this button was pressed!');
  const zipcode = document.querySelector('#zipCode').value.trim();
  const username = document.querySelector('#usernameInput').value.trim();
  const product_name = document.querySelector('#productInput').value.trim();
  const response = await fetch(`/api/listing/searchResults/${product_name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log('made it through the backend');
    document.location.replace('/listing/searchResults');
  } else {
    alert('Failed to search for Product.');
  }
};

document
  .querySelector('#searchButton')
  .addEventListener('click', getSearchResults);
