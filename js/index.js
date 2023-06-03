document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  let carouselItems;
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentPosition = 0;
  const visibleItems = 4;
  let cardWidth;

  function moveToPrev() {
    currentPosition += cardWidth * visibleItems;
    if (currentPosition > 0) {
      currentPosition = 0;
    }
    carouselTrack.style.transform = `translateX(${currentPosition}px)`;
    checkArrows();
  }

  function moveToNext() {
    const trackWidth = carouselTrack.scrollWidth;
    const containerWidth = carouselContainer.clientWidth;
    currentPosition -= cardWidth * visibleItems;
    if (currentPosition < -(trackWidth - containerWidth)) {
      currentPosition = -(trackWidth - containerWidth);
    }
    carouselTrack.style.transform = `translateX(${currentPosition}px)`;
    checkArrows();
  }

  function checkArrows() {
    if (currentPosition === 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    const trackWidth = carouselTrack.scrollWidth;
    const containerWidth = carouselContainer.clientWidth;

    if (currentPosition <= -(trackWidth - containerWidth)) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  // Add event listeners to the carousel controls
  prevButton.addEventListener('click', moveToPrev);
  nextButton.addEventListener('click', moveToNext);

  function fetchPostsAndUpdateCarousel() {
    fetch('https://emilandret.sg-host.com/wp-json/wp/v2/posts?_embed&per_page=100')
      .then(response => response.json())
      .then(posts => {
        const carouselTrack = document.querySelector('.carousel-track');
        posts.forEach((post, index) => {
          // Extract the featured image from the post data
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
        
          // Create a new carousel item and add it to the carousel
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');

          const postLink = document.createElement('a');
          postLink.href = `blog-specific.html?postId=${post.id}`;

          const contentDiv = document.createElement('div');
          contentDiv.classList.add('carousel-content');
          
          const titleElement = document.createElement('h3');
          titleElement.classList.add('carousel-item-title');
          titleElement.textContent = htmlDecode(post.title.rendered); // Use htmlDecode function
          
          const imgElement = document.createElement('img');
          imgElement.src = featuredImage;
          imgElement.style.width = "100%";
          imgElement.style.height = "100%";
          imgElement.style.objectFit = "cover";
          
          contentDiv.appendChild(titleElement);
          contentDiv.appendChild(imgElement);
          postLink.appendChild(contentDiv);
          carouselItem.appendChild(postLink);
          
          carouselTrack.appendChild(carouselItem);
        });

        // Recalculate the carousel items and card width
        carouselItems = document.querySelectorAll('.carousel-item');
        if (carouselItems.length > 0) {
          cardWidth = carouselItems[0].clientWidth + 2 * parseInt(getComputedStyle(carouselItems[0]).marginRight);
        }
        checkArrows();
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  fetchPostsAndUpdateCarousel();

});

// Home post (mobile replacement for carousel)
function getImageFromPost(post) {
  // Check if there is a featured image
  if (post._embedded && post._embedded['wp:featuredmedia']) {
      return post._embedded['wp:featuredmedia'][0].source_url;
  }

  // Check if there is an image in the content
  const imgRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
  const match = imgRegex.exec(post.content.rendered);
  if (match && match[1]) {
      return match[1];
  }

  return "no image";
}

window.addEventListener('DOMContentLoaded', (event) => {
  // Fetch posts from Wordpress API
  fetch('https://emilandret.sg-host.com/wp-json/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc')
      .then(response => response.json())
      .then(posts => {
          // Get the home-posts div
          const homePostsDiv = document.getElementById('home-posts');

          // Get the "See more" button
          const seeMoreButton = document.querySelector(".see-more");

          // Remove the "See more" button temporarily
          seeMoreButton.remove();

          // Create the HTML for each post
          posts.forEach(post => {
              const homePostDiv = document.createElement('div');
              homePostDiv.className = 'home-post';

              const postImageSrc = getImageFromPost(post); 
              const postImage = document.createElement('img');
              postImage.src = postImageSrc;
              postImage.alt = `Blog post ${posts.indexOf(post) + 1}`;

              const postLink = document.createElement('a');  
              postLink.href = `blog-specific.html?postId=${post.id}`;

              const postTitle = document.createElement('h3');
              postTitle.textContent = htmlDecode(post.title.rendered); 

              postLink.appendChild(postTitle); 
              homePostDiv.appendChild(postImage);
              homePostDiv.appendChild(postLink);  

              
              homePostsDiv.appendChild(homePostDiv);
          });

          // Put the "See more" button at the end of home-posts div
          homePostsDiv.appendChild(seeMoreButton);
      })
      .catch(err => console.log(err));
});


// Function for the fade-up effect on contact card
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    useClassNames: true,
    initClassName: false,
    animatedClassName: "aos-animate",
    offset: -100, 
  });
});

// Latest Tweet loading place holder
window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

twttr.ready(function (twttr) {
  twttr.events.bind('loaded', function (event) {
    const tweetPlaceholder = document.querySelector('.tweet-placeholder');
    tweetPlaceholder.style.display = 'none';
  });
});
