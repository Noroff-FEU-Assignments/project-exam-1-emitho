// Function to decode HTML entities
function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// Hamburger functionality
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-container ul');

hamburgerMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Function to limit text excerpt to certain length
function truncateExcerpt(excerpt, limit) {
  const words = excerpt.split(' ');

  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }

  return excerpt;
}