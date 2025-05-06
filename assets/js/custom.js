// Mortage Calculator Code
function formatNumber(num) {
  return num.toLocaleString("en-IN");
}

function updateRangeTrack(container) {
  let range = container.querySelector(".rangeInput");
  let track = container.querySelector(".range-track");
  let percent = ((range.value - range.min) / (range.max - range.min)) * 100;
  track.style.width = percent + "%";
}

document.querySelectorAll(".mortCalcInpSec").forEach(section => {
  let range = section.querySelector(".rangeInput");
  let input = section.querySelector(".valueInput");
  let container = section.querySelector(".range-container");

  // Update input when range changes
  range.addEventListener("input", function () {
    input.value = formatNumber(parseInt(this.value));
    updateRangeTrack(container);
  });

  // Update range when input changes
  input.addEventListener("input", function () {
    let rawValue = this.value.replace(/,/g, "");
    let num = parseInt(rawValue);
    if (!isNaN(num) && num >= range.min && num <= range.max) {
      range.value = num;
      updateRangeTrack(container);
    }
    this.value = formatNumber(num);
  });

  // Initialize track on load
  updateRangeTrack(container);
});




$(document).ready(function () {


  // Sticky Header
  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });


  // Code to handle floating lable
  // Function to toggle 'active' class based on value or focus
  function toggleFloatingLabel($element) {
    const hasValue = $element.val() !== '' && (!$element.is('select') || $element.find('option:selected').val() !== '');
    const isFocused = $element.is(':focus');

    const $label = $element.siblings('.floating-label');
    $label.toggleClass('active', hasValue || isFocused);

    // 👇 Apply color change if it's a <select>
    if ($element.is('select')) {
      $element.toggleClass('has-value', hasValue);
    }
  }


  // Event handler for focus, blur, and change
  function handleFloatingLabel(event) {
    toggleFloatingLabel($(this));
  }

  // Apply event handlers to inputs and selects
  $('.floating-labelInp').on('focus blur change', 'input, select', handleFloatingLabel);

  // Check initial state on page load
  $('.floating-labelInp input, .floating-labelInp select').each(function () {
    toggleFloatingLabel($(this));
  });

  // Code to handle file type floating lable and file name
  // Function to update the file name and toggle the floating label
  function updateFileName(inputElement) {
    var fileName = $(inputElement).val().split('\\').pop();
    var $label = $(inputElement).next('.file-option').find('.floating-label');
    var $fileNameSpan = $(inputElement).next('.file-option').find('.file-name');

    if (fileName) {
      $fileNameSpan.text(fileName); // Update the file name display
      $label.addClass('active'); // Float the label
    } else {
      $fileNameSpan.text(' '); // Set default text
      $label.removeClass('active'); // Reset the label
    }
  }




  // Hamburger Menu
  $(".mobile_Menu > a").on("click", function () {
    $(".mobile_MenuContent").toggleClass("active");
    $("body").toggleClass("menu-open");

    if (!$(".menu-overlay").length) {
      $("header").append('<div class="menu-overlay"></div>');
    }
  });

  $(document).on("click", ".menu-overlay, .mobile_Menu_close", function () {
    $(".mobile_MenuContent").removeClass("active");
    $("body").removeClass("menu-open");
    $(".menu-overlay").remove();
  });



  // Lazy Loading
  $("img, iframe").attr("loading", "lazy");


  $('.media_Cards').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 550,
        settings: "unslick" // disables slick below 550px
      }
    ]
  });


  $('.laguna_residence_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  });


  $('.contactMobileTab > li').on('click', function () {
    // Remove active class from all li
    $('.contactMobileTab > li').removeClass('active');

    // Add active class to the clicked li
    $(this).addClass('active');

    // Get the location from data attribute
    var location = $(this).data('location');

    // Remove active from all contact cards
    $('.contactUsCard .dubai_cont, .contactUsCard .abuDhabi_cont').removeClass('active');

    // Add active only to selected location's content
    $('.contactUsCard .' + location).addClass('active');

    // Hide all map images and texts
    $('.contactUsMapCont-div .map-img, .contactUsMapCont-div .contactUsMapContTxt').removeClass('active');

    // Show only the selected location's image and text
    $('.contactUsMapCont-div .' + location).addClass('active');
  });


  $('g.dubai_point, g.abuDhabi_point').on('mouseenter', function () {
    if (window.innerWidth <= 950) return;

    const isDubai = $(this).hasClass('dubai_point');
    const showClass = isDubai ? 'dubai_cont' : 'abuDhabi_cont';
    const hideClass = isDubai ? 'abuDhabi_cont' : 'dubai_cont';

    // Show the map container
    $('.contactUsMapCont').css({
      opacity: 1,
      visibility: 'visible'
    });

    // Toggle visible content inside .contactUsMapCont
    $('.contactUsMapCont .' + hideClass).hide();
    $('.contactUsMapCont .' + showClass).show();

    // Toggle active class inside .contactUsCards
    $('.contactUsCards .' + hideClass).removeClass('active');
    $('.contactUsCards .' + showClass).addClass('active');
  });

  // Hide map container on mouseleave from g elements
  $('g.dubai_point, g.abuDhabi_point').on('mouseleave', function () {
    if (window.innerWidth <= 950) return;

    $('.contactUsMapCont').css({
      opacity: 0,
      visibility: 'hidden'
    });
  });

  // media slider
  $('.hmMediaSlideTxt').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.hmMediaSlideImg'
  });
  $('.hmMediaSlideImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.hmMediaSlideTxt',
    centerMode: true,
    focusOnSelect: true,
  });


  // swiper slider
  var swiper = new Swiper(".boardSwiperBox", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true,
    },
    keyboard: { enabled: true },
    mousewheel: { thresholdDelta: 70 },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2 },
      1560: { slidesPerView: 3 },
    },
  });


  // Marquee Slider
  $('.osLearInfoSlide').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Important for seamless loop
    speed: 5000, // Slower speed for smooth continuous scroll
    cssEase: 'linear',
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 6 }
      },
      {
        breakpoint: 1300,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 }
      }
    ]
  });



// Review Slider
  $('.dev-ReviewsSliderContent').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    appendDots: $('.slider-dots'),
    customPaging: function (slider, i) {
      return '<button type="button"></button>';
    }
  });


  $('.propSpecTxtSec').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.propSpecImg'
  });
  $('.propSpecImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.propSpecTxtSec',
  });



  
  // Function to update dot sizes based on distance from active
  function updateDotSizes(currentIndex) {
    const $dots = $('.slider-dots button');
    $dots.each(function (i) {
      const distance = Math.abs(i - currentIndex);
      const size = Math.max(6, 16 - distance * 2); // 16px for active, smaller for farther
      $(this).css({
        width: `${size}px`,
        height: `${size}px`
      }).toggleClass('active', i === currentIndex);
    });
  }

  // Apply dot sizing on change
  $('.dev-ReviewsSliderContent').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    updateDotSizes(nextSlide);
  });

  // Initial sizing after dots render
  setTimeout(() => updateDotSizes(0), 10);
  



});

// Home Slides
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

let horizontalSection = document.querySelector('.subSecend');

// const cards = gsap.utils.toArray(".sr-commdiv");

console.log(horizontalSection.scrollWidth);

gsap.to('.subSecend', {
    x: () => horizontalSection.scrollWidth * -1,
    xPercent: 100,
    scrollTrigger: {
        trigger: '.subSecend',
        start: 'center center',
        end: "+=" + (cards.length * window.innerHeight),
        pin: '.hmOurDevelop',
        scrub: true,
        invalidateOnRefresh: true
    }
});

// music driven
$(function () {
  $(".mdSlideBox").imagesLoaded(function () {
    $(".spinner").fadeOut();
  });

  $(".mdSlide").hover(
    function () {
      // On mouse enter
      $(this).addClass("active");
      $(this).find(".mdSlideTitle").css({
        transform: "rotate(0deg)",
        top: "10%"
      });
    },
    function () {
      // On mouse leave
      $(this).removeClass("active");
      $(this).find(".mdSlideTitle").css({
        transform: "rotate(90deg)",
        top: "15%"
      });
    }
  );
});




