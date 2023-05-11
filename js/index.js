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