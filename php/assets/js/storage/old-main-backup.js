/**
Main Javascript & jQuery File
*/

// ******* Text Copy Protection - JS *************
// Prevent Context Menu From Opening
document.addEventListener(
    "contextmenu",
    function(evt) {
        evt.preventDefault();
    },
    false
);

// Prevent Clipboard Copying
document.addEventListener(
    "copy",
    function(evt) {
        // Change the copied text if you want
        evt.clipboardData.setData(
            "text/plain",
            "Copying is not allowed on this webpage"
        );

        // Prevent the default copy action
        evt.preventDefault();
    },
    false
);
// ******* Text Copy Protection - JS *************

!(function($) {
    "use strict";

    // Hero typed
    if ($(".typed").length) {
        var typed_strings = $(".typed").data("typed-items");
        typed_strings = typed_strings.split(",");
        new Typed(".typed", {
            strings: typed_strings,
            loop: true,
            typeSpeed: 1,
            backSpeed: 2,
            backDelay: 2000,
        });
    }

    // Nav Menu
    $(document).on(
        "click",
        ".nav-menu a, .mobile-nav a, .services h4 a, #navigate, .portfolio .portfolio-wrap .portfolio-links a, .interests .icon-box h3 a, .section-title h3 a",
        function(e) {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var hash = this.hash;
                var target = $(hash);
                if (target.length) {
                    e.preventDefault();
                    // Autoscroll to top of Window on next navigation
                    $(window).scrollTop(0);

                    if ($(this).parents(".nav-menu, .mobile-nav").length) {
                        $(".nav-menu .active, .mobile-nav .active").removeClass("active");
                        $(this).closest("li").addClass("active");
                    }

                    if (hash == "#header") {
                        $("#header").removeClass("header-top");
                        $("section").removeClass("section-show");
                        return;
                    }

                    if (!$("#header").hasClass("header-top")) {
                        $("#header").addClass("header-top");
                        setTimeout(function() {
                            $("section").removeClass("section-show");
                            $(hash).addClass("section-show");
                        }, 350);
                    } else {
                        $("section").removeClass("section-show");
                        $(hash).addClass("section-show");
                    }

                    if ($("body").hasClass("mobile-nav-active")) {
                        $("body").removeClass("mobile-nav-active");
                        $(".mobile-nav-toggle i").toggleClass(
                            "icofont-navigation-menu icofont-close"
                        );
                        $(".mobile-nav-overly").fadeOut();
                    }

                    return false;
                }
            }
        }
    );

    // Mobile Navigation
    if ($(".nav-menu").length) {
        var $mobile_nav = $(".nav-menu").clone().prop({
            class: "mobile-nav d-lg-none",
        });
        $("body").append($mobile_nav);
        $("body").prepend(
            '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
        );
        $("body").append('<div class="mobile-nav-overly"></div>');

        $(document).on("click", ".mobile-nav-toggle", function(e) {
            $("body").toggleClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
                "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").toggle();
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass(
                        "icofont-navigation-menu icofont-close"
                    );
                    $(".mobile-nav-overly").fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000,
    });

    // Skills section
    $(".skills-content").waypoint(
        function() {
            $(".progress .progress-bar").each(function() {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
        }, {
            offset: "80%",
        }
    );

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            900: {
                items: 3,
            },
        },
    });

    // Porfolio isotope and filter
    $(window).on("load", function() {
        var portfolioIsotope = $(".portfolio-container").isotope({
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows",
        });

        $("#portfolio-flters li").on("click", function() {
            $("#portfolio-flters li").removeClass("filter-active");
            $(this).addClass("filter-active");

            portfolioIsotope.isotope({
                filter: $(this).data("filter"),
            });
        });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
        $(".venobox").venobox();
    });

    // jQuery Scroll Function for Arrow Button
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 700) {
                $(".arrow-btn").css({
                    opacity: "1",
                    "pointer-events": "auto",
                });
            } else {
                $(".arrow-btn").css({
                    opacity: "0",
                    "pointer-events": "none",
                });
            }
        });
        $(".arrow-btn").click(function() {
            $("html").animate({ scrollTop: 0 }, 500);
        });
    });
    // End jQuery Scroll Function for Arrow Button

    // api.countapi
    const countEl = document.getElementById("visitcount");

    updateVisitCount();

    // function updateVisitCount() {
    //     fetch('https://api.countapi.xyz/hit/www.michaelogrady.net/visits')
    //         .then(res => res.json())
    //         .then(res => {
    //             countEl.innerHTML = res.value;
    //         })
    // }
})(jQuery);