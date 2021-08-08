const changeZip = (event) => {
  event.preventDefault();

  const zipCode = document.querySelector('#newZip').value.trim();
try {
   const response = await fetch('/api/users/profile/location', {
       method: 'PUT', 
       body: JSON.stringify({
        zipcode: zipCode   
       }),
       headers: {
           'Content-Type': 'application/json',
       }
   });
   if(response.ok) {
       console.log('Zipcode Changed')
       document.location.replace('/profile')
   }
} catch (error) {
    
}
  

document.querySelector('form').addEventListener('submit', changeZip);
