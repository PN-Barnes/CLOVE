const uploadHandler = async () => {
  const response = await fetch("/api/tests", {
    method: 'POST',
    body: JSON.stringify({
      file: "/assets/profile"
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log("uploaded");
  } else {
    alert("fail to upload");
  }

}

const handleFiles = (e) => {
  const file = e.target.files[0];
  previewFile(file);
}

const previewFile = file => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewSource(reader.result);
  }
}

const inputElement = document
  .querySelector('#avatar');
inputElement.addEventListener('change', handleFiles);

document
  .querySelector('form')
  .addEventListener('submit', submitFileHandler);