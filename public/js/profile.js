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

document.addEventListener('DOMContentLoaded', function (event) {
  const text = document.querySelector('#average-rating').innerHTML;
  const ratingStar = parseInt(text.split(' ').pop());
  if (isNaN(ratingStar)) {
    return;
  }
  let html = text.substr(0, text.length - 1);
  const icon = `<i class="fas fa-heart text-danger"></i>`;
  for (let i = 0; i < ratingStar; i++) {
    html += icon;
  }
  document.querySelector('#average-rating').innerHTML = html;
});

document.querySelector('#new-location').addEventListener('click', editZip);
