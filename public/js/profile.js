const newBasketHandler = async (event) => {
    event.preventDefault();
    // redirect to newbasket page when user click new-basket button
    document.location.replace('/profile/newbasket');
};

document
  .querySelector('#new-basket')
  .addEventListener('click', newBasketHandler);