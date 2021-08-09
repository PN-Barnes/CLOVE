
let imageData;
const handleFiles = async (e) => {
  console.log("file loaded");
  const file = e.target.files[0];
  imageData = await getBase64(file);
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const submitFileHandler = async (e) => {
  e.preventDefault();
  console.log("submit file");
  if (!imageData) return;
  uploadeImage(imageData);
  imageData = null;
}

const uploadeImage = async (base64EncodedImage) => {
  console.log(base64EncodedImage);
  try {
    const response = await fetch("/api/users/profile", {
      method: 'POST',
      body: JSON.stringify({
        data: base64EncodedImage
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log("uploaded");
      document.location.replace("/profile");
    } else {
      alert("fail to upload");
    }

  } catch (err) {
    console.log(err);
  }
}

// file input element
const inputElement = document.querySelector('#file');
inputElement.addEventListener('change', handleFiles);

// upload button
document
  .querySelector('form')
  .addEventListener('submit', submitFileHandler);