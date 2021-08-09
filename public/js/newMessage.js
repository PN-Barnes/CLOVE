const sendNewMessage = async (content, recipient_id) => {
  if (!content) {
    alert('Please enter valid content!');
    return;
  }
  const response = await fetch(`/api/messages/`, {
    method: 'POST',
    body: JSON.stringify({ content, recipient_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Fail to send the message');
  }
};

const createMessageHandler = async (event) => {
  event.preventDefault();

  const lastTermInURL = document.location.pathname.split('/').pop();
  const content = document.querySelector('#content').value.trim();

  if (!content) {
    alert('Cannot send message with empty content!');
  } else {
    if (isNaN(parseInt(lastTermInURL))) {
      const username = document.querySelector('#recipient').value.trim();
      if (username) {
        // http://localhost:3001/api/users/user1
        let response = await fetch(`/api/users/name/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          // get user info with username === ${username}
          response = await response.json();
          await sendNewMessage(content, response.id);
        } else {
          alert(response.statusText);
        }
      }
    } else {
      await sendNewMessage(content, parseInt(lastTermInURL));
    }
  }
};

document.querySelector('form').addEventListener('submit', createMessageHandler);
