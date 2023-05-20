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

// Get the postId from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// Fetch the specific blog post from WordPress
fetch(`http://emilandret.sg-host.com/wp-json/wp/v2/posts/${postId}`)
  .then(response => response.json())
  .then(data => {
    // Handle the retrieved blog post data
    const blogPostContent = document.getElementById('blog-specific-content');

    // Update the blog-specific content section
    blogPostContent.innerHTML = `
      <h2>${data.title.rendered}</h2>
      <div>${data.content.rendered}</div>
    `;
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });