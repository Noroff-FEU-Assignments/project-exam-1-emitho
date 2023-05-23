
$(document).ready(function () {
  const postsPerPage = 12;
  const blogPosts = $(".blog-post");
  let currentPostIndex = 0;

  function showPosts(count) {
    const nextPosts = blogPosts.slice(currentPostIndex, currentPostIndex + count);
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
    blogPosts
    showPosts(postsPerPage);
  }

  $(".load-more-button").on("click", function () {
    showPosts(postsPerPage);
  });

  initialize();
});

