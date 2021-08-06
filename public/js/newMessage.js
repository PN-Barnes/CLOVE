const createMessageHandler = async (event) => {
    event.preventDefault();
    
    const content = document.querySelector('#content').value.trim();
    const username = document.querySelector('#recipient').value.trim();
  
    if (username && content) {
        // http://localhost:3001/api/users/user1
        let response = await fetch(`/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            response = await response.json();
            const recipient_id = response.id;
            response = await fetch(`/api/messages/`, {
                method: 'POST',
                body: JSON.stringify({ content, recipient_id }),
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
        
    }
};


document
  .querySelector('form')
  .addEventListener('submit', createMessageHandler);