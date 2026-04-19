$(document).ready(ready_function);

function ready_function() {
  var $sidebar = $("#sidebar");
  var $sidebarCollapse = $("#sidebarCollapse");
  var $sidebarToggle = $("#sidebarToggle");
  var $content = $("#content");

  // Load sidebar state from local storage
  if (localStorage.getItem("sidebarState") === "collapsed") {
    $sidebar.addClass("collapsed no-transition");
    $content.css("marginLeft", "0");
    $sidebarToggle.find("i").removeClass("bi-chevron-left").addClass("bi-chevron-right");
  } else if (localStorage.getItem("sidebarState") === "active") {
    $sidebar.addClass("active");
  }

  // Remove no-transition class after initial load
  setTimeout(function() {
    $sidebar.removeClass("no-transition");
  }, 100);

  $sidebarCollapse.on("click", function () {
    $sidebar.toggleClass("active");
    // Save sidebar state to local storage
    if ($sidebar.hasClass("active")) {
      localStorage.setItem("sidebarState", "active");
    } else {
      localStorage.removeItem("sidebarState");
    }
  });

  $sidebarToggle.on("click", function () {
    $sidebar.toggleClass("collapsed");
    $content.css("marginLeft", "0");
    // Flip the arrow direction
    var $arrow = $sidebarToggle.find("i");
    $arrow.toggleClass("bi-chevron-left bi-chevron-right");
    // Save sidebar state to local storage
    if ($sidebar.hasClass("collapsed")) {
      localStorage.setItem("sidebarState", "collapsed");
    } else {
      localStorage.removeItem("sidebarState");
    }
  });

  // Close sidebar when clicking outside on mobile
  $content.on("click", function () {
    if ($(window).width() <= 768 && $sidebar.hasClass("active")) {
      $sidebar.removeClass("active");
      localStorage.removeItem("sidebarState");
    }
  });

  // Adjust content margin on window resize
  $(window).on("resize", function () {
    $content.css("marginLeft", "0");
  });

  // Initial margin setting
  $content.css("marginLeft", "0px");
}