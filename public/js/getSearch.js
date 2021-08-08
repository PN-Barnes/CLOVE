// const getSearchResults = async (event) => {
//   event.preventDefault();

//   console.log('this button was pressed!');
//   const zipcode = document.querySelector('#zipCode').value.trim();
//   const username = document.querySelector('#usernameInput').value.trim();
//   const product_name = document.querySelector('#productInput').value.trim();
//   const response = await fetch(`/api/baskets/product/${product_name}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.ok) {
//     console.log('made it through the backend');
//   } else {
//     alert('Failed to search for Product.');
//   }
// };
// document
//   .querySelector('#searchButton')
//   .addEventListener('click', getSearchResults);
const searchHandler = async (event) => {
  event.preventDefault();
  const term = document.querySelector('#term').value;
  // const searchBy = document.querySelector('#search-by option:checked').value;
  var sel = document.getElementById("search-by");
var searchBy= sel.options[sel.selectedIndex].text;

  if (term) {
    if (searchBy === "Username") {
      console.log("search by username");
      try {
        const response = await fetch(`/api/users/name/${term}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data) {
          document.location.replace(`/profile/user/${data.id}`);
        } else {
          alert("No user found with this username");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (searchBy === "Zip Code") {
      console.log("search by zip code");
    } else {
      console.log("search by product name");
    }

      // const response = await fetch(`/api/baskets`, {
      //     method: 'POST',
      //     body: JSON.stringify({ stock, price, description, product_id }),
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      // });
  
      // redirect to dashboard page after creating a new blog successfully
      // if (response.ok) {
      //     document.location.replace('/profile');
  } else {
    alert('Please enter a string!');
  }
};



document
  .querySelector('form')
  .addEventListener('submit', searchHandler);
