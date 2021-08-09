const createBasketHandler = async (event) => {
  event.preventDefault();

  const product_id = document
    .querySelector('#product-select option:checked')
    .getAttribute('data-id');
  const stock = parseInt(document.querySelector('#stock').value);
  const price = parseFloat(document.querySelector('#price').value);
  const description = document.querySelector('#description').value.trim();

  if (!stock) {
    alert('Please enter valid stock information');
  } else if (!price) {
    alert('Please enter valid price information');
  } else {
    const response = await fetch(`/api/baskets`, {
      method: 'POST',
      body: JSON.stringify({ stock, price, description, product_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // redirect to dashboard page after creating a new blog successfully
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create basket');
    }
  }
};

document.querySelector('form').addEventListener('submit', createBasketHandler);
