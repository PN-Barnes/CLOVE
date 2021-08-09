const updateBasketHandler = async (event) => {
  event.preventDefault();

  const stock = parseInt(document.querySelector('#stock').value);
  const price = parseFloat(document.querySelector('#price').value);
  const description = document.querySelector('#description').value.trim();

  if (!stock) {
    alert('Please enter correct stock information');
  } else if (!price) {
    alert('Please enter correct price information');
  } else {
    const url = document.location.href
      .split('profile/edit')
      .join('api/baskets');
    console.log(url);
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ stock, price, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // redirect to dashboard page after updating an blog successfully
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update basket');
    }
  }
};

const deleteBasketHandler = async (event) => {
  event.preventDefault();

  const url = document.location.href.split('profile/edit').join('api/baskets');
  // delete the basket if any
  const response = await fetch(url, {
    method: 'DELETE',
  });

  // redirect to profile page after delete a basket successfully
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete basket');
  }
};

document
  .querySelector('#update-basket')
  .addEventListener('click', updateBasketHandler);

document
  .querySelector('#delete-basket')
  .addEventListener('click', deleteBasketHandler);
