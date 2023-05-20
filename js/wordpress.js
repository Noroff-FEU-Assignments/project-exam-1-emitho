// Function to update the latest post section
function updateLatestPost(latestPost) {
  const latestPostContainer = document.querySelector('.latest-post');
  const latestPostImg = latestPostContainer.querySelector('.latest-post-img img');
  const latestPostTitle = latestPostContainer.querySelector('.latest-post-title');
  const latestPostExcerpt = latestPostContainer.querySelector('.latest-post-excerpt');

  latestPostImg.src = latestPost.jetpack_featured_media_url;
  latestPostTitle.textContent = latestPost.title.rendered;
  latestPostExcerpt.innerHTML = latestPost.excerpt.rendered;
}

// Function to fetch the latest blog post from WordPress
function fetchLatestPost() {
  fetch('http://emilandret.sg-host.com/wp-json/wp/v2/posts?per_page=1&orderby=id&order=desc')
    .then(response => response.json())
    .then(data => {
      // Retrieve the latest post
      if (data.length > 0) {
        const latestPost = data[0];
        updateLatestPost(latestPost);
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Function to fetch all blog posts from WordPress
function fetchAllPosts() {
  fetch('http://emilandret.sg-host.com/wp-json/wp/v2/posts?per_page=3')
    .then(response => response.json())
    .then(data => {
      // Handle the retrieved posts data
      const blogPostsContainer = document.querySelector('.blog-post-grid');

      // Clear the existing blog posts
      blogPostsContainer.innerHTML = '';

      // Fetch the latest post
      fetchLatestPost();

      // Loop through the posts data (excluding the latest post) and create blog post elements
      data.slice(1).forEach(post => {
        const postLink = document.createElement('a');
        postLink.href = `blog-specific.html?postId=${post.id}`;
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
          <img src="${post.jetpack_featured_media_url}" alt="Blog Post" />
          <h3>${post.title.rendered}</h3>
          <p>${post.excerpt.rendered}</p>
        `;
        postLink.appendChild(postElement);

        // Add the post to the blog post grid
        blogPostsContainer.appendChild(postLink);
      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Call the function to fetch all blog posts from WordPress
fetchAllPosts();
