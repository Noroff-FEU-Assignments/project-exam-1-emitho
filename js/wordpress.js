// Function to decode HTML entities
function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// Function to fetch the categories of a post
function fetchPostCategories(post) {
  return fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/categories?include=${post.categories.join(',')}`)
    .then(response => response.json())
    .then(categories => {
      const categoryButtons = categories.map((category, index) => {
        return `<button class="category-button ${index % 2 === 0 ? 'black' : 'gray'}">${category.name}</button>`;
      }).join('');
      return categoryButtons;
    })
    .catch(error => console.error(error));
}

// Function to update the latest post section
function updateLatestPost(latestPost) {
  const latestPostContainer = document.querySelector('.latest-post');
  const latestPostImg = latestPostContainer.querySelector('.latest-post-img img');
  const latestPostTitle = latestPostContainer.querySelector('.latest-post-title');
  const latestPostExcerpt = latestPostContainer.querySelector('.latest-post-excerpt');

  latestPostImg.src = latestPost.jetpack_featured_media_url;
  latestPostTitle.textContent = htmlDecode(latestPost.title.rendered);
  latestPostExcerpt.innerHTML = latestPost.excerpt.rendered;

  // Fetch the categories of the latest post and add them to the page
  fetchPostCategories(latestPost)
    .then(categoryButtons => {
      if (categoryButtons) {
        const categoryContainer = document.querySelector('.latest-post .category-container');
        
        if (!categoryContainer) {
          const newCategoryContainer = document.createElement('div');
          newCategoryContainer.classList.add('category-container');
          newCategoryContainer.innerHTML = categoryButtons;
        
          // Get the 'latest-post-overlay' div and append the categories to it
          const overlayContainer = latestPostContainer.querySelector('.latest-post-overlay');
          overlayContainer.appendChild(newCategoryContainer);
        }
      }
    });

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

        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
          featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
        }

        if (!featuredImage && post.content && post.content.rendered) {
          const regex = /<img.*?src=['"](.*?)['"]/;
          const match = regex.exec(post.content.rendered);
          if (match && match[1]) {
            featuredImage = match[1];
          }
        }

        if (!featuredImage) {
          featuredImage = 'default-image.jpg';
        }

        const excerpt = $(post.excerpt.rendered).text();
        const truncatedExcerpt = truncateExcerpt(excerpt, 20);

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
        blogPostsContainer.appendChild(postLink);

        fetch(`https://emilandret.sg-host.com/wp-json/wp/v2/categories?include=${post.categories.join(',')}`)
          .then(response => response.json())
          .then(categories => {
            const categoryButtons = categories.map((category, index) => {
              return `<button class="category-button ${index % 2 === 0 ? 'black' : 'gray'}">${category.name}</button>`;
            }).join('');

            const postCategoriesContainer = postElement.querySelector('.post-categories');
            postCategoriesContainer.innerHTML = categoryButtons;
          })
          .catch(error => console.error(error));
      });

      document.dispatchEvent(new Event('allPostsAdded'));
    })
    .catch(error => {
      console.error(error);
    });
}

fetchAllPosts();
