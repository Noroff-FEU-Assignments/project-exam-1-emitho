$(document).ready(function () {
  const postsPerPage = 12;
  const blogPosts = $(".blog-post");
  let currentPostIndex = 0;

  function showPosts(count) {
    const nextPosts = blogPosts.slice(currentPostIndex, currentPostIndex + count);
    nextPosts.fadeIn().css("display", "grid");
    currentPostIndex += count;

    if (currentPostIndex >= blogPosts.length) {
      $(".load-more-button").hide();
    }
  }

  function initialize() {
    blogPosts.hide();
    showPosts(postsPerPage);
  }

  $(".load-more-button").on("click", function () {
    showPosts(postsPerPage);
  });

  initialize();
});

// Carousel scroll functionality

$(document).ready(function () {
  let carouselItemWidth = $('.carousel-item').width();
  let carouselContainer = $('#carousel-container');
  
  $('.carousel-control.next').click(function () {
    carouselContainer.animate({ scrollLeft: '+=' + carouselItemWidth * 4 }, 400);
  });
  
  $('.carousel-control.prev').click(function () {
    carouselContainer.animate({ scrollLeft: '-=' + carouselItemWidth * 4 }, 400);
  });
});