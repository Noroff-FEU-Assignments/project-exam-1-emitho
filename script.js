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

let currentPosition = 0;
const cardWidth = carouselItems[0].clientWidth;
const cardMargin = parseInt(getComputedStyle(carouselItems[0]).marginRight);

// Move the carousel track to the previous set of items
function moveToPrev() {
  currentPosition += (cardWidth + cardMargin) * 4;
  if (currentPosition > 0) {
    currentPosition = 0;
  }
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

// Move the carousel track to the next set of items
function moveToNext() {
  const trackWidth = carouselTrack.scrollWidth;
  const containerWidth = carouselContainer.clientWidth;
  currentPosition -= (cardWidth + cardMargin) * 4;
  if (currentPosition < -(trackWidth - containerWidth)) {
    currentPosition = -(trackWidth - containerWidth);
  }
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

// Add event listeners to the carousel controls
prevButton.addEventListener('click', moveToPrev);
nextButton.addEventListener('click', moveToNext);