const getSearchResults = async (event) => {
  event.preventDefault();

  const zipcode = document.querySelector('#zipCode').value.trim();
  const username = document.querySelector('#usernameInput').value.trim();
  const product_name = document.querySelector('#productInput').value.trim();

  const response = await fetch(`/api/baskets/product/${product_name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.locaiton.replace('listing');
  } else {
    alert('Failed to search for Product.');
  }
};

document.querySelector('form').addEventListener('submit', getSearchResults);
