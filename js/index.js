document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  const carouselContainer = document.querySelector('.carousel-container');

  if (carouselItems.length > 0) {
    let currentPosition = 0;
    const visibleItems = 4;
    const cardWidth = carouselItems[0].clientWidth + 2 * parseInt(getComputedStyle(carouselItems[0]).marginRight);

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

      if (currentPosition <= -(trackWidth - containerWidth - cardWidth * (visibleItems - 1))) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
      }
    }

    // Add event listeners to the carousel controls
    prevButton.addEventListener('click', moveToPrev);
    nextButton.addEventListener('click', moveToNext);

    checkArrows(); // Call this function once on load to disable the left arrow initially
  }

  function fetchPostsAndUpdateCarousel() {
    fetch('https://emilandret.sg-host.com/wp-json/wp/v2/posts?_embed')
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
          const carouselItem = document.createElement('img');
          carouselItem.classList.add('carousel-item');
          carouselItem.src = featuredImage;

          carouselTrack.appendChild(carouselItem);
        });
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  fetchPostsAndUpdateCarousel();

});

// Function for the fade-up effect on contact card
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    useClassNames: true,
    initClassName: false,
    animatedClassName: "aos-animate",
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