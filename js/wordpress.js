// Function to update the latest post section
function updateLatestPost(latestPost) {
  const latestPostContainer = document.querySelector('.latest-post');
  const latestPostImg = latestPostContainer.querySelector('.latest-post-img img');
  const latestPostTitle = latestPostContainer.querySelector('.latest-post-title');
  const latestPostExcerpt = latestPostContainer.querySelector('.latest-post-excerpt');

  latestPostImg.src = latestPost.jetpack_featured_media_url;
  latestPostTitle.textContent = htmlDecode(latestPost.title.rendered); 
  latestPostExcerpt.innerHTML = latestPost.excerpt.rendered;

  // Call the function once to set the initial height
  calculateImageHeight();
}

// Function to fetch the latest blog post from WordPress
function fetchLatestPost() {
  fetch('https://emilandret.sg-host.com/wp-json/wp/v2/posts?per_page=1&orderby=id&order=desc&_embed')
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

window.addEventListener('resize', calculateImageHeight);

function calculateImageHeight() {
  const latestPostImg = document.querySelector('.latest-post-img img');
  const aspectRatioWidth = 433;
  const aspectRatioHeight = 224;
  const width = latestPostImg.offsetWidth;
  const calculatedHeight = (width/aspectRatioWidth)*aspectRatioHeight;
  latestPostImg.style.height = `${calculatedHeight}px`;
}

fetchLatestPost();

// Function to fetch all blog posts from WordPress
function fetchAllPosts() {
  fetch('https://emilandret.sg-host.com/wp-json/wp/v2/posts?_embed&per_page=100')
    .then(response => response.json())
    .then(data => {
      // Handle the retrieved posts data
      const blogPostsContainer = document.querySelector('.grid-container');

      // Clear the existing blog posts
      blogPostsContainer.innerHTML = '';

      fetchLatestPost();

      // Loop through the posts data and create blog post elements
      data.forEach((post, index) => {
        if (index === 0) return; // Skip the latest post because it should be shown in latest post element instead
      
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

        // Function to limit text excerpt to certain length
        const excerpt = $(post.excerpt.rendered).text(); 
        const truncatedExcerpt = truncateExcerpt(excerpt, 30);

        function truncateExcerpt(excerpt, limit) {
          const words = excerpt.split(' ');

          if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
          }

          return excerpt;
        } 

        postElement.innerHTML = `
        <div class="blog-post-img">
          <img src="${featuredImage}" alt="Blog Post" />
          <div class="blog-post-overlay">
            <p class="blog-post-excerpt">${truncatedExcerpt}</p>
          </div>
        </div>
        <h3 class="blog-post-title">${htmlDecode(post.title.rendered)}</h3>
        `;
      
        postLink.appendChild(postElement);
      
        // Add the post to the blog post grid
        blogPostsContainer.appendChild(postLink);
      });

      // Trigger a custom event to notify that all blog posts have been added
      document.dispatchEvent(new Event('allPostsAdded'));
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}



fetchAllPosts();
