// Fetches categories of a given post and returns a Promise that resolves with HTML of category buttons
function fetchPostCategories(post) {
  return fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/categories?include=${post.categories.join(',')}`)
    .then(response => response.json())
    .then(categories => {
      return categories.map((category, index) => {
        return `<button class="category-button ${index % 2 === 0 ? 'black' : 'gray'}" data-category-id="${category.id}" onclick="location.href='blog.html?activeCategory=${category.id}'">${category.name}</button>`;
      }).join('');
    })
    .catch(error => console.error(error));
}


// Query string function
function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

// Get the postId from the URL query parameter
const postId = getQueryStringValue('postId');

function openModal(imageSrc) {

  const modal = document.getElementById('myModal');

  const img = document.getElementById('img01');

  img.src = imageSrc;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = "none";
}

window.addEventListener('click', function(event) {
  const modal = document.getElementById('myModal');
  if (event.target == modal) {
    closeModal();
  }
});

if ('ontouchstart' in window) {
  window.addEventListener('touchstart', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
      closeModal();
    }
  });
}

// Fetch and display the specific blog post content
if (postId) {
  fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/posts/${postId}`)
    .then(response => response.json())
    .then(data => {
      const blogPostContent = document.getElementById('blog-specific-content');
    
      // Create the elements for the title, content and category buttons
      const titleElement = document.createElement('h2');
      titleElement.innerHTML = data.title.rendered;
    
      const contentElement = document.createElement('div');
      contentElement.innerHTML = data.content.rendered;
    
      // Update the title of the document
      document.title = `${htmlDecode(data.title.rendered)}`;
    
      // Fetch the categories of the specific post and add them to the page
      fetchPostCategories(data)
        .then(categoryButtons => {
          const categoryContainer = document.createElement('div');
          categoryContainer.classList.add('category-container');
          categoryContainer.innerHTML = categoryButtons;
    
          // Add the elements to the page in the order: categories, title, content
          blogPostContent.appendChild(categoryContainer);
          blogPostContent.appendChild(titleElement);
          blogPostContent.appendChild(contentElement);
        });
    
      // Get the first image in the blog post content
      const firstImage = contentElement.querySelector('img');
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