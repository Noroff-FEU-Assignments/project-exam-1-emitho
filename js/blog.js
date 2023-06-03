$(document).ready(function () {
  let currentPostIndex = 0;
  const postsPerPage = 12;

  function showPosts(count) {
    const blogPosts = $(".blog-post");
    const nextPosts = blogPosts.slice(currentPostIndex, currentPostIndex + count);
    console.log('Next posts to show: ', nextPosts.length);
    if (nextPosts.length === 0) {
      // No more posts to show
      $(".load-more-button").hide();
      return;
    }
    nextPosts.fadeIn().css("display", "grid");
    currentPostIndex += count;
  
    // Check if there are less posts left than the postsPerPage, if so, hide the button
    if (blogPosts.slice(currentPostIndex).length < postsPerPage) {
      $(".load-more-button").hide();
    } else {
      $(".load-more-button").show();
    }
}


  function initialize() {
    const blogPosts = $(".blog-post");
    blogPosts.hide();
    showPosts(postsPerPage);
  
    if (blogPosts.length <= postsPerPage) {
      $(".load-more-button").hide();
    } else {
      $(".load-more-button").show();
    }
  }

  document.addEventListener('postsLoaded', function () {
    currentPostIndex = 0; // Reset to the first post
    initialize(); // Re-initialize
  });

  $(".load-more-button").on("click", function () {
    showPosts(postsPerPage);
  });

  // Call initialize function once document is ready
  initialize();
});
