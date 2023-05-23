// Query string function
function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

// Get the postId from the URL query parameter
const postId = getQueryStringValue('postId');

// Fetch and display the specific blog post content
if (postId) {
  fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/posts/${postId}`)
    .then(response => response.json())
    .then(data => {
      const blogPostContent = document.getElementById('blog-specific-content');
      const articleImage = document.querySelector('.article-image');

      articleImage.style.backgroundImage = `url(${data.featured_image_url})`;

      // Update the blog-specific content section
      blogPostContent.innerHTML = `
        <h2>${data.title.rendered}</h2>
        <div>${data.content.rendered}</div>
      `;

      // add click listener to articleImage
      articleImage.addEventListener('click', () => {
        const modal = document.querySelector('.image-modal');
        const modalImage = document.querySelector('.modal-image');

        modalImage.style.backgroundImage = articleImage.style.backgroundImage;
        modal.style.display = 'flex';
      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

document.querySelector('.image-modal').addEventListener('click', () => {
  const modal = document.querySelector('.image-modal');
  modal.style.display = 'none';
});


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