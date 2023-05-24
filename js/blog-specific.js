// Query string function
function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

// Get the postId from the URL query parameter
const postId = getQueryStringValue('postId');


function openModal(imageSrc) {
  // Get the modal
  const modal = document.getElementById('myModal');
  
  // Get the image and insert it inside the modal
  const img = document.getElementById('img01');
  
  // Use the same src as the clicked image
  img.src = imageSrc;
  
  // Show the modal
  modal.style.display = "block"
  ;
}
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fetch and display the specific blog post content


if (postId) {
  fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/posts/${postId}`)
    .then(response => response.json())
    .then(data => {
      const blogPostContent = document.getElementById('blog-specific-content');
      
      // Update the blog-specific content section
      blogPostContent.innerHTML = `
        <h2>${data.title.rendered}</h2>
        <div>${data.content.rendered}</div>
      `;

      // Get the first image in the blog post content
      const firstImage = blogPostContent.querySelector('img');
      if (firstImage) {
        // Add the onclick event to the first image
        firstImage.onclick = function() {
          openModal(firstImage.src);
        };
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}
