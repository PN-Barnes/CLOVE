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

const generateIcon = (number) => {
    let html = "<span>";
    const icon = `<i class="fas fa-heart text-danger"></i>`;
    for (let i = 0; i < number; i++) {
        html += icon;
    }
    return html + "</span>";
}

// document.addEventListener("DOMContentLoaded", function(event) { 
//     // const text = document.querySelector(".rating").innerHTML;
//     const ratingElements = document.querySelector(".rating");
//     for (const ratingElement of ratingElements) {
//         const text = ratingElement.innerHTML;
//         const ratingStar = parseInt(text[0]);
//         if (isNaN(ratingStar)) {
//             return;
//         };
//         let html = generateIcon(ratingStar);
//         html += text.substr(1);
//         ratingElement.innerHTML = html;
//     }
//   });

document
  .querySelector('form')
  .addEventListener('submit', createRatingHandler);