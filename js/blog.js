$(document).ready(function () {
  let blogPosts;
  let currentPostIndex = 0;
  const postsPerPage = 12;

  document.addEventListener('allPostsAdded', function () {
    blogPosts = $(".blog-post");
    initialize();
  });

  function showPosts(count) {
    const nextPosts = blogPosts.slice(currentPostIndex, currentPostIndex + count);
    console.log('Next posts to show: ', nextPosts.length);
    if (nextPosts.length === 0) {
      // No more posts to show
      $(".load-more-button").hide();
      return;
    }
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
});
