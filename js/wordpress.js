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
  fetch('http://emilandret.sg-host.com/wp-json/wp/v2/posts?per_page=1&orderby=id&order=desc&_embed')
    .then(response => response.json())
    .then(data => {
      // Retrieve the latest post
      if (data.length > 0) {
        const latestPost = data[0];
        const image = extractImageFromContent(latestPost.content.rendered);
        latestPost.jetpack_featured_media_url = image;
        updateLatestPost(latestPost);
        const latestPostLink = document.querySelector('.latest-post');
        latestPostLink.href = `blog-specific.html?postId=${latestPost.id}`;
      }
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Function to extract the image URL from the content
function extractImageFromContent(content) {
  const regex = /<img.+?src=(['"])(.+?)\1/;
  const match = regex.exec(content);
  if (match && match.length >= 3) {
    return match[2];
  }
  return '';
}

// Function to fetch all blog posts from WordPress
function fetchAllPosts() {
  fetch('http://emilandret.sg-host.com/wp-json/wp/v2/posts?_embed')
    .then(response => response.json())
    .then(data => {
      // Handle the retrieved posts data
      const blogPostsContainer = document.querySelector('.grid-container');

      // Clear the existing blog posts
      blogPostsContainer.innerHTML = '';

      // Fetch the latest post
      fetchLatestPost();

      // Loop through the posts data and create blog post elements
      data.forEach((post, index) => {
        if (index === 0) return; // Skip the latest post

        const postLink = document.createElement('a');
        postLink.href = `blog-specific.html?postId=${post.id}`;
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        let featuredImage;

        // Check if the post has a featured image in _embedded property
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
          featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
        }

        // If featured image is not available, extract image URL from content.rendered property using regex
        if (!featuredImage && post.content && post.content.rendered) {
          const regex = /<img.*?src=['"](.*?)['"]/;
          const match = regex.exec(post.content.rendered);
          if (match && match[1]) {
            featuredImage = match[1];
          }
        }

        // Use a default image if no featured image is available
        if (!featuredImage) {
          featuredImage = 'default-image.jpg';
        }

        postElement.innerHTML = `
          <img src="${featuredImage}" alt="Blog Post" />
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



function initializeGrid() {
  const blogPosts = document.querySelectorAll('.blog-post');
  blogPosts.forEach((post, index) => {
    post.style.gridArea = `post${index + 1}`;
  });
}

// Call the function to fetch all blog posts from WordPress
fetchAllPosts();
