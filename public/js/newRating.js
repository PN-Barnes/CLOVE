const createRatingHandler = async (event) => {
    event.preventDefault();
    
    const content = document.querySelector('#content').value.trim();
    const productName = document.querySelector('#product').value.trim();
    const score = document.querySelector('#score-select').value.length;
    const username = document.querySelector('#recipient').value.trim();
  
    if (content && product && score && username) {
        // http://localhost:3001/api/users/user1
        let response = await fetch(`/api/users/name/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            response = await response.json();
            const recipient_id = response.id;
            response = await fetch(`/api/products/name/${productName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                response = await response.json();
                const product_id = response.id;
                response = await fetch(`/api/ratings/`, {
                    method: 'POST',
                    body: JSON.stringify({ score, content, recipient_id, product_id }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    document.location.reload();
                } else {
                    alert(response.statusText);
                }
            } else {
                alert(response.statusText);
            }
        } else {
            alert(response.statusText);
        }
        
    }
};



document
  .querySelector('form')
  .addEventListener('submit', createRatingHandler);