// Hamburger functionality

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-container ul');

hamburgerMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});



// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const carouselContainer = document.querySelector('.carousel-container');

let currentPosition = 0;
const visibleItems = 4;
const cardWidth = carouselItems[0].clientWidth + 2 * parseInt(getComputedStyle(carouselItems[0]).marginRight);

function moveToPrev() {
  currentPosition += cardWidth * visibleItems;
  if (currentPosition > 0) {
    currentPosition = 0;
  }
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

function moveToNext() {
  const trackWidth = carouselTrack.scrollWidth;
  const containerWidth = carouselContainer.clientWidth;
  currentPosition -= cardWidth * visibleItems;
  if (currentPosition < -(trackWidth - containerWidth)) {
    currentPosition = -(trackWidth - containerWidth);
  }
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

// Add event listeners to the carousel controls
prevButton.addEventListener('click', moveToPrev);
nextButton.addEventListener('click', moveToNext);


// Function for the fade-up effect on contact card

document.addEventListener('DOMContentLoaded', function () {
  AOS.init();
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


