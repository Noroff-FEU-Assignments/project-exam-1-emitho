// Query string 

function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}


// Modal

document.querySelectorAll('.article-image').forEach((imgContainer) => {
  imgContainer.addEventListener('click', (event) => {
    const imageUrl = event.target.src;
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');

    modalImage.src = imageUrl;
    modal.style.display = 'block';
  });
});

document.getElementById('image-modal').addEventListener('click', () => {
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';
});