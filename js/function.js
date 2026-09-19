(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  $window.on("load", function () {
    $(".preloader").fadeOut(600);

    if (typeof ScrollTrigger !== "undefined") {
      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 300);
    }
  });

  function setHeaderHeight() {
    var headerHeight = $("header .header-sticky").outerHeight();

    if (headerHeight) {
      $("header.main-header").css("height", headerHeight);
    }
  }

  if ($(".header-sticky").length) {
    setHeaderHeight();

    $window.on("resize", function () {
      setHeaderHeight();

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });

    $window.on("scroll", function () {
      var scrollTop = $window.scrollTop();
      var headerHeight = $("header .header-sticky").outerHeight() || 0;

      $("header .header-sticky").toggleClass("active", scrollTop > 80);

      $("header .header-sticky").toggleClass(
        "hide",
        scrollTop > headerHeight + 100,
      );
    });
  }

  var toggler = document.querySelector(".navbar-toggler");
  var menu = document.querySelector("#mainMenu");

  if (toggler && menu) {
    toggler.setAttribute("aria-expanded", "false");

    toggler.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("show");

      toggler.setAttribute("aria-expanded", isOpen ? "true" : "false");

      $body.toggleClass("menu-open", isOpen);
    });

    menu.querySelectorAll(".nav-link, .header-btn a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("show");
        toggler.setAttribute("aria-expanded", "false");
        $body.removeClass("menu-open");
      });
    });
  }

  $(document).on("click", "a[href^='#']", function (event) {
    var targetId = $(this).attr("href");

    if (!targetId || targetId === "#") {
      return;
    }

    var target = $(targetId);

    if (!target.length) {
      return;
    }

    event.preventDefault();

    var headerHeight = $("header .header-sticky").outerHeight() || 0;
    var targetPosition = target.offset().top - headerHeight;

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: Math.max(targetPosition, 0),
        },
        700,
      );
  });

  if ($(".hero-swiper").length && typeof Swiper !== "undefined") {
    new Swiper(".hero-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 900,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
    });
  }

  if ($(".service-highlight-swiper").length && typeof Swiper !== "undefined") {
  new Swiper(".service-highlight-swiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    speed: 800,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    watchOverflow: false,
    observer: true,
    observeParents: true,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".service-highlight-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },

    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
    },
  });
}

  if (
    $(".service-single-slider").length &&
    $(".service-single-slider .swiper").length &&
    typeof Swiper !== "undefined"
  ) {
    new Swiper(".service-single-slider .swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".service-pagination",
        clickable: true,
      },
    });
  }

  $("#faqaccordion .accordion-button").on("click", function () {
    var $button = $(this);
    var $item = $button.closest(".accordion-item");
    var $content = $item.find(".accordion-collapse");
    var isOpen = $content.hasClass("show");

    $("#faqaccordion .accordion-collapse")
      .not($content)
      .stop(true, true)
      .slideUp(350)
      .removeClass("show");

    $("#faqaccordion .accordion-button")
      .not($button)
      .addClass("collapsed")
      .attr("aria-expanded", "false");

    if (isOpen) {
      $content.stop(true, true).slideUp(350).removeClass("show");
      $button.addClass("collapsed").attr("aria-expanded", "false");
    } else {
      $content.stop(true, true).slideDown(350).addClass("show");
      $button.removeClass("collapsed").attr("aria-expanded", "true");
    }
  });

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.utils.toArray(".reveal").forEach(function (container) {
      var image = container.querySelector("img");

      if (!image) {
        return;
      }

      gsap.set(container, {
        autoAlpha: 1,
        overflow: "hidden",
      });

      gsap.set(image, {
        xPercent: 0,
        scale: 1,
      });

      gsap.fromTo(
        container,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        image,
        {
          xPercent: 8,
          scale: 1.08,
        },
        {
          xPercent: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    var fadeUpSelectors = [
      ".section-title",
      ".about-content",
      ".about-list",
      ".service-item",
      ".why-choose-image",
      ".why-choose-item",
      ".testimonial-counter-box",
      ".testimonial-item",
      ".our-faqs-content",
      ".our-faq-section",
      ".contact-content",
      ".contact-form",
      ".gallery-description",
    ];

    fadeUpSelectors.forEach(function (selector) {
      gsap.utils.toArray(selector).forEach(function (element) {
        if (element.closest(".hero")) {
          return;
        }

        if (element.dataset.gsapReady === "true") {
          return;
        }

        element.dataset.gsapReady = "true";

        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    });

    gsap.utils.toArray(".hero-content").forEach(function (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        },
      );
    });

    gsap.utils.toArray(".hero-slider-image img").forEach(function (image) {
      gsap.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
        },
      );
    });

    if ($(".text-anime-style-1").length && typeof SplitText !== "undefined") {
      $(".text-anime-style-1").each(function () {
        var element = this;
        var split = new SplitText(element, {
          type: "words",
        });

        gsap.fromTo(
          split.words,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }

    if ($(".text-anime-style-2").length && typeof SplitText !== "undefined") {
      $(".text-anime-style-2").each(function () {
        var element = this;
        var split = new SplitText(element, {
          type: "chars",
        });

        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            x: 20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.025,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }

    if ($(".text-anime-style-3").length && typeof SplitText !== "undefined") {
      $(".text-anime-style-3").each(function () {
        var element = this;
        var split = new SplitText(element, {
          type: "lines,words,chars",
          linesClass: "split-line",
        });

        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.02,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }

    gsap.utils.toArray(".service-item").forEach(function (item, index) {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (index % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    gsap.utils.toArray(".why-choose-item").forEach(function (item, index) {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: 30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    gsap.utils.toArray(".testimonial-item").forEach(function (item, index) {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    setTimeout(function () {
      ScrollTrigger.refresh();
    }, 500);
  } else {
    $(".reveal").css({
      opacity: 1,
      visibility: "visible",
    });

    $(
      ".section-title, .about-content, .about-list, .service-item, .why-choose-image, .why-choose-item, .testimonial-counter-box, .testimonial-item, .our-faqs-content, .our-faq-section, .contact-content, .contact-form, .gallery-description",
    ).css({
      opacity: 1,
      visibility: "visible",
      transform: "none",
    });
  }

  if (
    $(".parallaxie").length &&
    typeof $.fn.parallaxie === "function" &&
    $window.width() > 991
  ) {
    $(".parallaxie").parallaxie({
      speed: 0.45,
      offset: 0,
    });
  }

  if ($(".gallery-item").length && typeof $.fn.magnificPopup === "function") {
    $(".gallery-item").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
      mainClass: "mfp-fade",
      removalDelay: 200,
      closeOnContentClick: true,
      fixedContentPos: true,
      image: {
        titleSrc: "title",
      },
    });
  }

  if ($(".popup-video").length && typeof $.fn.magnificPopup === "function") {
    $(".popup-video").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  }

  if ($(".counter").length && typeof $.fn.counterUp === "function") {
    $(".counter").each(function () {
      $(this).counterUp({
        delay: 6,
        time: 2000,
      });
    });
  }

  if ($(".skills-progress-bar").length && typeof $.fn.waypoint === "function") {
    $(".skills-progress-bar").waypoint(
      function () {
        $(".skillbar").each(function () {
          var percent = $(this).attr("data-percent");

          $(this).find(".count-bar").stop(true, true).animate(
            {
              width: percent,
            },
            1800,
          );
        });
      },
      {
        offset: "80%",
      },
    );
  }

  if ($("#herovideo").length && typeof $.fn.YTPlayer === "function") {
    $("#herovideo").YTPlayer();
  }

  if (typeof WOW !== "undefined" && $(".wow").length) {
    new WOW().init();
  }

  var $contactform = $("#contactForm");

  if ($contactform.length && typeof $.fn.validator === "function") {
    $contactform
      .validator({
        focus: false,
      })
      .on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          submitForm();
        }
      });
  }

  function submitForm() {
    var fname = $("#fname").val() || "";
    var lname = $("#lname").val() || "";
    var email = $("#email").val() || "";
    var phone = $("#phone").val() || "";
    var message = $("#msg").val() || "";

    $.ajax({
      type: "POST",
      url: "form-process.php",
      data: {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        message: message,
      },
      success: function (text) {
        if (text === "success") {
          formSuccess();
        } else {
          submitMSG(false, text);
        }
      },
      error: function () {
        submitMSG(false, "Something went wrong. Please try again.");
      },
    });
  }

  function formSuccess() {
    $contactform[0].reset();
    submitMSG(true, "Message Sent Successfully!");
  }

  function submitMSG(valid, msg) {
    var msgClasses = valid ? "h3 text-success" : "h3 text-danger";

    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      if (menu) {
        menu.classList.remove("show");
      }

      if (toggler) {
        toggler.setAttribute("aria-expanded", "false");
      }

      $body.removeClass("menu-open");
    }
  });

  $window.on("resize", function () {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
})(jQuery);
