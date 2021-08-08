const searchHandler = async (event) => {
  event.preventDefault();
  const term = document.querySelector('#term').value;
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
      document.location.replace(`/baskets/zipcode/${term}`);
    } else {
      document.location.replace(`/baskets/product/${term}`)
    }
  } else {
    alert('Please enter a string!');
  }
};

document
  .querySelector('form')
  .addEventListener('submit', searchHandler);
