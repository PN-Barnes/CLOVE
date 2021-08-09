const newBasketHandler = async (event) => {
  event.preventDefault();
  // redirect to newbasket page when user click new-basket button
  document.location.replace('/profile/newbasket');
};

const editZip = async (event) => {
  event.preventDefault();

  document.location.replace('/profile/changeLocation');
};

document
  .querySelector('#new-basket')
  .addEventListener('click', newBasketHandler);

document.querySelector('#new-location').addEventListener('click', editZip);
