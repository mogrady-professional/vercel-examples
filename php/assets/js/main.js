/*
Relevant JS only loaded onto the DOM where needed
(elements do not exist on the DOM until added to the DOM)
[Similar concept to React]
*/

// console.log("js file loaded");
const arrow = document.querySelector('.arrow-btn');

// use cloneNode() to clone the desktop nav and append to the body for mobile nav
const mobileNav = document.getElementById('nav-menu');
const mobileNavClone = mobileNav.cloneNode(true);
mobileNavClone.setAttribute('class', 'mobile-nav d-lg-none');
mobileNavClone.setAttribute('id', 'mobile-nav-clone');
document.body.appendChild(mobileNavClone);
const mobileNavOverly = document.createElement('div');
mobileNavOverly.classList.add('mobile-nav-overly');
mobileNavOverly.style.display = 'none';
mobileNavOverly.setAttribute('id', 'mobile-nav-overly');
document.body.appendChild(mobileNavOverly);

document.addEventListener('DOMContentLoaded', function () {
  // copyProtection();
  typed();
  updateFooter(new Date());

  // On Page Scroll, -> manage scroll functionality
  window.addEventListener('scroll', function () {
    // console.log(window.scrollY);
    showScroller(arrow);
  });

  // add event listener for hash change
  window.addEventListener('hashchange', function () {
    console.log('hash changed =>', window.location.hash);
    const hash = window.location.hash;
    // split hash by #
    const hashArray = hash.split('#');
    // get the hash from the array
    const hashValue = hashArray[1];
    console.log('hashValue =>', hashValue);
    // check host
    if (
      !location.hostname === 'localhost' ||
      !location.hostname === '127.0.0.1'
    ) {
      countPageClicks(hashValue);
    }
    // Wait until the elements are loaded on-screen
    // check internet connection -> determine the loading time of JS elements on page
    // elements will not exist on page
    this.setTimeout(function () {
      assignLogic(hash);
    }, checkDownloadSpeed());
  });
  // Assign logic to mobile navigation
  toggleMobileNav();
  toggleMobileNavOverly();
  // load lightbox initially on page load for offline viewing
  venoboxLightBox();
  // hide loader
  window.addEventListener('load', hideLoader);
});

// 1. Copy Protection
const copyProtection = () => {
  // ******* Text Copy Protection - JS *************
  // Prevent Context Menu From Opening
  document.addEventListener(
    'contextmenu',
    function (evt) {
      evt.preventDefault();
    },
    false
  );

  // Prevent Clipboard Copying
  document.addEventListener(
    'copy',
    function (evt) {
      // Change the copied text if you want
      evt.clipboardData.setData(
        'text/plain',
        'Copying is not allowed on this webpage'
      );

      // Prevent the default copy action
      evt.preventDefault();
    },
    false
  );
  // ******* Text Copy Protection - JS *************
};

// 2. Dynamically Calculate Age
function calculateAge(dob) {
  console.log('Calculating Age...');
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);
  //   console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
  document.getElementById('age').innerHTML =
    `<i class="icofont-rounded-right"></i> <strong>Age: </strong> ` +
    Math.abs(age_dt.getUTCFullYear() - 1970);
  console.log('Age Calculated');
  console.log('->>>>>>>>>>> Age Displayed in DOM ');
}

// 3. Dynamic Experience Counters
function calculateExperience(date) {
  console.log('Calculating Experience...');
  // set data-purecounter-end attribute on element of id fe-experience
  const feDifference = date.getFullYear() - 2018;
  const beDifference = date.getFullYear() - 2019;
  // set attribute of data-purecounter-end
  document
    .getElementById('fe-experience')
    .setAttribute('data-purecounter-end', feDifference);
  document
    .getElementById('be-experience')
    .setAttribute('data-purecounter-end', beDifference);
  document
    .getElementById('ects-credits')
    .setAttribute('data-purecounter-end', '505');
  console.log('Experience Calculated');
  console.log('->>>>>>>>>>> Experience Displayed in DOM ');
}

// 4. Dynamically Update Yearly Copyright
const updateFooter = (date) => {
  document.getElementById('credits').innerHTML =
    `<p class="text-center text-md-left mb-md-0"><a href="http://michaelogrady.net/">🤵 Michael O'Grady </a>| Personal Website | &copy; 2016 - ` +
    date.getFullYear() +
    ` All Rights Reserved.</p>`;
};

// 5. Dynamically Update Visit Count through API
const updateVisitCount = async () => {
  // get the count from the api if not localhost
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    document
      .getElementById('visitcount')
      .setAttribute('data-purecounter-end', '0');
  } else {
    let response = await fetch(
      'https://api.countapi.xyz/hit/www.michaelogrady.com/visits'
    );
    let data = await response.json();
    // set the count to the element
    let countDisplay = document.getElementById('visitcount');
    countDisplay.setAttribute('data-purecounter-end', data.value);
  }

  console.log('->>>>>>>>>>> Visit Count Updated ');
  console.log('Visit Count Displayed in DOM');
  countUp();
};

// 6. Dynamic Typed Text
const typed = () => {
  // Typed.js
  const typed_strings = [
    'Hi there!.. 👋',
    'Welcome to my Personal Website.. 🖥️',
    "I'm Michael O' Grady.. 🤵",
    "I'm a Full Stack Software Engineer.. 👨‍💻",
    'and I am based in the West of Ireland.. 🌍 🌊 ⛱️ 🌳 ☘️',
    'Why not take a look around.. 🖱️',
    "Don't hesitate to get in touch!.. 📧",
    'Until then..,Bye for now!.. 🖐️',
  ];

  new Typed('.typed', {
    //   stringsElement: ".typed-strings",
    strings: typed_strings,
    typeSpeed: 2,
    backSpeed: 2,
    loop: true,
    loopCount: Infinity,
    showCursor: false,
    //   startDelay: 1000,
    backDelay: 2000,
    //   shuffle: true,
    //   smartBackspace: true,
    //   fadeOut: true,
    //   fadeOutClass: "typed-fade-out",
    //   fadeOutDelay: 500,
    loopCount: Infinity,
    cursorChar: '|',
    attr: null,
    contentType: 'html',
    // callback: function () {},
    // preStringTyped: function () {},
    // onStringTyped: function () {},
    // resetCallback: function () {},
  });
};

// 7. Show/Hide Scroll Button
const showScroller = (arrow) => {
  if (window.scrollY > 700) {
    arrow.classList.add('arrow-btn-visible');
    // console.log("show");
  } else {
    arrow.classList.remove('arrow-btn-visible');
    // console.log("hide");
  }

  arrow.addEventListener('click', function (e) {
    // console.log("click");
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

// 8. Portfolio Isotope & Gallery Lightbox
const portfolioIsotope = () => {
  console.log('2. Portfolio Isotope & Gallery Lightbox');
  setTimeout(function () {
    var grid = document.querySelector('.portfolio-container');

    var iso = new Isotope(grid, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      // filter: '.cat-all, .cat-frontend, .cat-backend, .cat-full-stack',
      // sortAscending: {
      // 	name: true,
      // 	date: false
      // },
      // masonry: {
      //     percentPosition: true,
      //     columnWidth: '.portfolio-list__sizer',
      //     gutter: '.portfolio-list__gutter'
      // },
      // stagger: 10,
      transitionDuration: '0.6s',
    });

    // bind filter button on click
    var gridFilters = document.querySelectorAll('#portfolio-filters li');
    for (i = 0; i < gridFilters.length; i++) {
      gridFilters[i].addEventListener('click', function () {
        // set class filter-active to current filter
        for (j = 0; j < gridFilters.length; j++) {
          gridFilters[j].classList.remove('filter-active');
        }
        this.classList.add('filter-active');
        // get filter value
        //   console.log(
        //     " " +
        //       this.parentElement.getAttribute("class") +
        //       " " +
        //       this.dataset.filter
        //   );
        var filterValue = this.dataset.filter;
        // use filter if matches value
        iso.arrange({ filter: filterValue });
      });
    }
    // alert("Portfolio Isotope & Filters loaded");
    // }, 200);
  }, 1200);
};

const venoboxLightBox = () => {
  console.log('3. Venobox Lightbox loaded');
  // Initiate venobox (image gallery feature used in portfolio and other gallery pages)
  // VenoBox 2 -> https://veno.es/venobox/

  setTimeout(function () {
    // Image Gallery - VenoBox
    new VenoBox({
      selector: '.venobox',
      toolsBackground: '#1C1C1C',
      titleattr: 'data-title',
      titlePosition: 'bottom',
      titleStyle: 'bar',
      spinner: 'pulse',
      spinColor: '#4ceb95',
      // share: [
      //   {
      //     facebook: true,
      //     twitter: true,
      //     googleplus: true,
      //     linkedin: true,
      //     pinterest: true,
      //     tumblr: true,
      //     email: true,
      //     print: true,
      //   },
      // ],
      // shareStyle: "bar",
    });

    // Video Lightbox (YouTube)
    new VenoBox({
      selector: '.my-video-links',
      titlePosition: 'bottom',
      spinner: 'pulse',
      spinColor: '#4ceb95',
    });

    // alert("Lightbox loaded");
  }, 1000);
};

const countUp = () => {
  // WayPoint.js not needed for SPA

  //   const waypoint = new Waypoint({
  //     element: document.querySelector(".skills-content"),
  //     handler: function (direction) {
  //   console.log("Scrolled to waypoint!");
  // loop over .progress .progress-bar in vanilla js
  const progressBars = document.querySelectorAll('.progress .progress-bar');
  for (i = 0; i < progressBars.length; i++) {
    progressBars[i].style.width =
      progressBars[i].getAttribute('aria-valuenow') + '%';
  }
  // },
  //   });
};

// https://github.com/srexi/purecounterjs
// HTML query selector for spesific element
const pureCounter = () => {
  new PureCounter({
    selector: '.purecounter',
  });
  console.log('PureCounter loaded');
};

const hideLoader = () => {
  const loader = document.getElementById('loader-wrapper');
  loader.classList.add('hidden');
};

// Handle mobile navigation
const toggleMobileNav = () => {
  document
    .getElementById('mobile-nav-icon')
    .addEventListener('click', function (e) {
      //   console.error("click");
      e.preventDefault();
      this.classList.toggle('icofont-close');
      this.classList.toggle('icofont-navigation-menu');
      document
        .getElementsByTagName('BODY')[0]
        .classList.toggle('mobile-nav-active');
      document.getElementById('mobile-nav-overly').style.display =
        document.getElementById('mobile-nav-overly').style.display === 'none'
          ? 'block'
          : 'none';
    });
};

// Handle mobile navigation overlay
const toggleMobileNavOverly = () => {
  document
    .getElementById('mobile-nav-clone')
    .addEventListener('click', function (e) {
      document
        .getElementById('mobile-nav-icon')
        .classList.toggle('icofont-close');
      document
        .getElementById('mobile-nav-icon')
        .classList.toggle('icofont-navigation-menu');
      document
        .getElementsByTagName('BODY')[0]
        .classList.toggle('mobile-nav-active');
      document.getElementById('mobile-nav-overly').style.transition =
        'ease-in-out 0.8s';
      setTimeout(() => {
        document.getElementById('mobile-nav-overly').style.display =
          document.getElementById('mobile-nav-overly').style.display === 'none'
            ? 'block'
            : 'none';
      }, 100);
    });
};

// Testimonials Swiper
const testimonials = () => {
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
};

// Get Portfolio Items
const getPortfolioData = async () => {
  return new Promise((resolve, reject) => {
    fetch('../../data/portfolio.json') // fetch data from json file
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        console.log(data);
        // console.log(data);
        console.log(data);
        // get json array from object
        const portfolioData = Object.values(data);

        const portfolioItemsArray = portfolioData[0]['projects'];
        const categories = portfolioData[0]['categories'];

        // console.log(portfolioData);
        // console.log(portfolioItemsArray);

        // array map the portfolio items
        const portfolioItems = portfolioItemsArray.map((item) => {
          return `
<!-- ${item.title} Start -->
     <div class="col-lg-4 col-md-6 portfolio-item filter-${item.category}">
         <div class="portfolio-wrap">
             <img src="${item.img}" class="img-fluid" alt="${item.alt}" />
             <div class="portfolio-info">
                 <h4>${item.title}</h4>
                 <p class="pb-2">${item.subtitle}</p>
                 <p>
                     <i class="${item.devicon_icons.icon1_class}"></i>                   
                     <i class="${item.devicon_icons.icon2_class}"></i>
                     <i class="${item.devicon_icons.icon3_class}"></i>
                     <i class="${item.devicon_icons.icon4_class}"></i>
                     <i class="${item.devicon_icons.icon5_class}"></i>
                     <i class="${item.devicon_icons.icon6_class}"></i>
                     <i class="${item.devicon_icons.icon7_class}"></i>
                     <i class="${item.devicon_icons.icon8_class}"></i>
                     <i class="${item.devicon_icons.icon9_class}"></i>
                     <i class="${item.devicon_icons.icon10_class}"></i>
                 </p>
                 <div class="portfolio-links">
                     <a href="${item.portfolio_links.image_gallery_link}" data-gall="portfolioGallery" class="venobox" data-title="${item.portfolio_links.data_title}"><i class="${item.portfolio_icons.icon1_view_in_gallery_class}" title="View in Gallery"></i
       ></a>
                     <a href="${item.portfolio_links.project_link}" title="Link to Project" target="_blank"><i class="${item.portfolio_icons.icon2_link_to_project_class}"></i
       ></a>
                     <a href="${item.portfolio_links.github_link}" title="Link to GitHub" target="_blank"><i class="${item.portfolio_icons.icon3_link_to_github_class}"></i></a>
                     <a href="${item.portfolio_links.local_project_detail_link}" title="View Project Details"><i class="${item.portfolio_icons.icon4_link_to_local_project_details}"></i></a>
                 
                     </div>
             </div>
         </div>
     </div>
     <!-- ${item.title} End -->`;
        });
        // console.log(portfolioItems);
        return (portfolioItemsString = portfolioItems.toString());
      })
      .then((portfolioItemsString) => {
        // Append portfolio items to portfolio container
        let output = document.getElementById('projects-container');
        let portfolioItem = portfolioItemsString.split(',');
        // console.log(portfolioItems);
        portfolioItem.forEach((item) => {
          output.innerHTML += item;
        });
      });
  })
    .then(() => {
      // Allow For Image Download Time (with slower internet connection)
      // Initialize isotope and lightbox after portfolio images should be loaded
      let speed = navigator.connection.downlinkMax;
      console.log(speed);
      if (speed < 2) {
        speed = 6400;
      } else {
        speed = 400;
      }
      console.log(speed);
      // call the portfolio isotope filter & lightbox functions after images should be loaded
      setTimeout(() => {
        portfolioIsotope();
        venoboxLightBox();
        console.log('portfolio isotope loaded');
      }, speed);
    })
    .catch((error) => {
      reject(error);
      console.log(error);
    });
};

const assignLogic = (hash) => {
  switch (hash) {
    case '#home':
      break;
    case '#about':
      aboutFunctions();
      break;
    case '#skills':
      skillsFunctions();
      break;
    case '#experience':
      break;
    case '#services':
      break;
    case '#portfolio':
      portfolioFunctions();
      break;
    case '#contact':
      break;
    case '#Cloud_Solutions_Development':
      // Reload lightbox
      venoboxLightBox();
      break;
    case '#doughbros':
      projectPageFunctions();
      break;
    default:
      break;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp

//  Page Specific Functions
// About
const aboutFunctions = async () => {
  let startTime = performance.now();
  let birthDate = new Date('1990-10-01');
  let today = new Date();

  await updateVisitCount()
    .then(console.log('Visit Count Updated'))
    .catch((error) => {
      console.log(error);
    });

  calculateAge(birthDate);
  calculateExperience(today);
  pureCounter();
  testimonials();
  // calculate load time in ms
  let elapsedTime = performance.now() - startTime;
  console.log(`About Page Load time: ${elapsedTime}ms`);
};

// Skills
const skillsFunctions = () => {
  let startTime = performance.now();
  countUp();
  pureCounter();
  // calculate load time in ms
  let elapsedTime = performance.now() - startTime;
  console.log(`Skills Page Load time: ${elapsedTime}ms`);
};

// Portfolio
const portfolioFunctions = async () => {
  let startTime = performance.now();
  try {
    await getPortfolioData();
  } catch (error) {
    console.log(error);
  }
  // calculate load time in ms
  let elapsedTime = performance.now() - startTime;
  console.log(`Portfolio Page Load time: ${elapsedTime}ms`);
};

// Check Download Speeds
const checkDownloadSpeed = () => {
  const downloadMaxSpeed = this.navigator.connection.downlinkMax;
  if (downloadMaxSpeed < 2) {
    console.log('Slow Connection Detected: ', downloadMaxSpeed);
    return 1400;
  } else {
    // console.log(`Download Speed: ${downloadMaxSpeed}`);
    return 400;
  }
};

const projectPageFunctions = () => {
  portfolioIsotope();
  venoboxLightBox();
};

// https://countapi.xyz/
// Count Each Page View
const countPageClicks = async (hashValue) => {
  let response = await fetch(
    `https://api.countapi.xyz/hit/www.michaelogrady.com/${hashValue}`
  );
  let data = await response.json();
  console.log(`${hashValue} page click count => ${data.value}`);
};

/*
Count Element Click without page reload functionality
1. Just to think of elements to track now!
*/
// const countElementClicks = async (element) => {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", `https://api.countapi.xyz/hit/mysite.com/${element}`);
//     xhr.responseType = "json";
//     xhr.onload = function() {
//         alert(`${element} has been clicked ${this.response.value} times!`);
//     }
//     xhr.send();
// }

// const contactSummit = async (e) => {
//   e.preventDefault();
//   let form = document.getElementById('contact-form');
//   let formData = new FormData(form);
//   let formDataJSON = {};
//   formData.forEach((value, key) => {
//     formDataJSON[key] = value;
//   });
//   console.log(formDataJSON);
//   let response = await fetch('https://api.michaelogrady.com/contact', {
//     method: 'POST',
//     body: JSON.stringify(formDataJSON),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   let data = await response.json();
//   console.log(data);
//   if (data.status === 'success') {
//     alert('Message Sent!');
//     form.reset();
//   } else {
//     alert('Message Not Sent!');
//   }
// }
