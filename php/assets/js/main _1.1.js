/*
Relevant JS only loaded onto the DOM where needed
(elements do not exist on the DOM until added to the DOM)
[Similar concept to React]
*/

// console.log("js file loaded");
const arrow = document.querySelector('.arrow-btn');

document.addEventListener('DOMContentLoaded', function () {
  // copyProtection();
  typed();
  updateCreds(new Date());

  // On Page Scroll, Run showElement Function (manage scroll functionality)
  window.addEventListener('scroll', function () {
    // console.log(window.scrollY);
    showScroller(arrow);
  });
  // add event listener for hash change
  window.addEventListener('hashchange', function () {
    // console.log('hash changed =>', window.location.hash);
    const hash = window.location.hash;
    // Wait until the element is loaded
    this.setTimeout(function () {
      assignLogic(hash);
    }, 400);
  });
  toggleMobileNav();
  toggleMobileNavOverly();

  // remove after
  // getPortfolioData(); // load portfolio data initially on page load
  // portfolio(); // load portfolio functionality initially on page load
  // remove after

  venoboxLightBox(); // load lightbox initially on page load

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
  return new Promise((resolve, reject) => {
    console.log('Calculating Age...');

    setTimeout(() => {
      const diff_ms = Date.now() - dob.getTime();
      const age_dt = new Date(diff_ms);
      //   console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
      document.getElementById('age').innerHTML =
        `<i class="icofont-rounded-right"></i> <strong>Age: </strong> ` +
        Math.abs(age_dt.getUTCFullYear() - 1970);
      console.log('Age Calculated');
      resolve();
    }, 1000);
    console.log('->>>>>>>>>>> Age Displayed in DOM ');
  });
}

// 3. Dynamic Experience Counters
function calculateExperience(date) {
  return new Promise((resolve, reject) => {
    console.log('Calculating Experience...');

    setTimeout(() => {
      // set data-purecounter-end attribute on element of id fe-experience
      const feExperience = document.getElementById('fe-experience');
      const beExperience = document.getElementById('be-experience');
      const ectsCredits = document.getElementById('ects-credits');

      const feDifference = date.getFullYear() - 2018;
      const beDifference = date.getFullYear() - 2019;
      // set attribute of data-purecounter-end
      feExperience.setAttribute('data-purecounter-end', feDifference);
      beExperience.setAttribute('data-purecounter-end', beDifference);
      ectsCredits.setAttribute('data-purecounter-end', '505');
      console.log('Experience Calculated');
      resolve();
    }, 1000);
    console.log('->>>>>>>>>>> Experience Displayed in DOM ');
  });
}

// 4. Dynamically Update Yearly Copyright
const updateCreds = (date) => {
  document.getElementById('credits').innerHTML =
    `<p class="text-center text-md-left mb-md-0"><a href="http://michaelogrady.net/">🤵 Michael O'Grady </a>| Personal Website | &copy; 2016 - ` +
    date.getFullYear() +
    ` All Rights Reserved.</p>`;
};

// 5. Dynamically Update Visit Count through API
// const updateVisitCount = () => {
//   // api.countapi
//   const countDisplay = document.getElementById('visitcount');

//   if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
//     countDisplay.setAttribute('data-purecounter-end', '0');
//   } else {
//     fetch('https://api.countapi.xyz/hit/www.michaelogrady.net/visits')
//       .then((response) => response.json())
//       .then((data) => {
//         countDisplay.setAttribute('data-purecounter-end', data.value);
//         // console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };
// 5. Dynamically Update Visit Count through API
function updateVisitCount() {
  return new Promise((resolve, reject) => {
    console.log('Updating Visit Count...');
    // api.countapi
    const countDisplay = document.getElementById('visitcount');
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) {
      countDisplay.setAttribute('data-purecounter-end', '0');
      console.log('Visit Count Displayed in DOM');
      resolve();
    } else {
      fetch('https://api.countapi.xyz/hit/www.michaelogrady.com/visits')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let count = data.value;
          countDisplay.setAttribute('data-purecounter-end', count);
          console.log('->>>>>>>>>>> Visit Count Updated ');
          console.log('Visit Count Displayed in DOM');
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    }
    countUp();
  });
}

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

  const typed = new Typed('.typed', {
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
    callback: function () {},
    preStringTyped: function () {},
    onStringTyped: function () {},
    resetCallback: function () {},
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
const portfolio = () => {
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
  // Initiate venobox (image gallery feature used in portfolio and other gallery pages)
  // VenoBox 2 -> https://veno.es/venobox/

  setTimeout(function () {
    // Image Gallery
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

    // Video Lightbox
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

  //   var waypoint = new Waypoint({
  //     element: document.querySelector(".skills-content"),
  //     handler: function (direction) {
  //   console.log("Scrolled to waypoint!");
  // loop over .progress .progress-bar in vanilla js
  var progressBars = document.querySelectorAll('.progress .progress-bar');
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
};

const hideLoader = () => {
  const loader = document.getElementById('loader-wrapper');
  //   setTimeout(() => {
  loader.classList.add('hidden');
  //   }, 1000);
};

// use cloneNode() to clone the nav and append to the body

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

const getPortfolioData = async () => {
  // load portfolio.json file
  console.log('loading portfolio.json');

  const data = await fetch('../../data/portfolio.json').then((response) =>
    response.json()
  );
  // console.log(data);

  // get json array from object
  const portfolioData = Object.values(data);
  // console.log(portfolioData);

  let portfolioItemsArray = portfolioData[0]['projects'];
  let categories = portfolioData[0]['categories'];

  // array map to get the portfolio items
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
  let portfolioItemsString = portfolioItems.toString();

  setTimeout(() => {
    let output = document.getElementById('projects-container');
    let portfolioItem = portfolioItemsString.split(',');
    // console.log(portfolioItems);
    portfolioItem.forEach((item) => {
      output.innerHTML += item;
    });
  }, 50);
};

const assignLogic = (hash) => {
  switch (hash) {
    case '#home':
      break;
    case '#about':
      // calculateAge(new Date('1990-10-01'));
      // updateExp(new Date());
      // updateVisitCount();
      // countUp();
      // testimonials();
      // pureCounter();
      runAbout();
      break;
    case '#skills':
      countUp();
      pureCounter();
      break;
    case '#experience':
      break;
    case '#services':
      break;
    case '#portfolio':
      getPortfolioData();
      // Reload portfolio Isotope
      portfolio();
      // Reload lightbox
      venoboxLightBox();
      break;
    case '#contact':
      break;
    case '#Cloud_Solutions_Development':
      // Reload lightbox
      venoboxLightBox();
      break;
    case '#doughbros':
      portfolio();
      venoboxLightBox();
      break;
    default:
      break;
  }
};

async function runAbout() {
  let birthDate = new Date('1990-10-01');
  let today = new Date();
  try {
    await calculateAge(birthDate);
    await calculateExperience(today);
    await updateVisitCount();

    testimonials();
    pureCounter();
  } catch (error) {
    console.log(error);
  }
}
