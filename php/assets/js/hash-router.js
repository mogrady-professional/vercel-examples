const pageTitle = "Michael O'Grady | Full Stack Software Engineer | Remote 🇮🇪";
// create an object that maps the url to the template, title, and description
const routes = {
  404: {
    template: '/templates/404.html',
    title: '404 | ' + pageTitle,
    description: 'Page not found',
  },
  '/': {
    // template: "/templates/index.html",
    title: 'Home | ' + pageTitle,
    description: 'This is the landing page',
  },
  home: {
    template: '/templates/index.html',
    title: 'Home | ' + pageTitle,
    description: 'This is the home page',
  },
  about: {
    template: '/templates/about.html',
    title: 'About | ' + pageTitle,
    description: 'This is the about page',
  },
  skills: {
    template: '/templates/skills.html',
    title: 'Skills | ' + pageTitle,
    description: 'This is the skills page',
  },
  experience: {
    template: '/templates/experience.html',
    title: 'Experience | ' + pageTitle,
    description: 'This is the experience page',
  },
  services: {
    template: '/templates/services.html',
    title: 'Services | ' + pageTitle,
    description: 'This is the services page',
  },
  portfolio: {
    template: '/templates/portfolio.html',
    title: 'Portfolio | ' + pageTitle,
    description: 'This is the portfolio page',
    data: [],
  },
  request_quote: {
    template: '/templates/request_quote.html',
    title: 'Request Quote | ' + pageTitle,
    description: 'This is the Request Quote page',
  },
  contact: {
    template: '/templates/contact.html',
    title: 'Contact | ' + pageTitle,
    description: 'This is the contact page',
  },
  Cloud_Solutions_Development: {
    template:
      '/templates/components/services/Cloud_Solutions_Development/Cloud_Solutions_Development.html',
    title: 'Cloud Solutions Development | Services | ' + pageTitle,
    description: 'This is the Cloud Solutions Development page',
  },
  doughbros: {
    template: '/templates/components/portfolio/projects/doughbros.html',
    title: 'Doughbros | Project | ' + pageTitle,
    description: 'This is the Doughbros page',
  },
  warehousegym: {
    template: '/templates/components/portfolio/projects/warehousegym.html',
    title: 'Warehouse Gym | Project | ' + pageTitle,
    description: 'This is the Warehouse Gym page',
  },
  warehousegym_rdbms: {
    template:
      '/templates/components/portfolio/projects/warehousegym_rdbms.html',
    title: 'Warehouse Gym RDBMS| Project | ' + pageTitle,
    description: 'This is the Warehouse Gym RDBMS page',
  },
  codec: {
    template: '/templates/components/portfolio/projects/codec.html',
    title: 'Codec | Project | ' + pageTitle,
    description: 'This is the Codec page',
  },
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
  // get the url path, replace hash with empty string
  var location = window.location.hash.replace('#', '');
  // if the path length is 0, set it to primary page route
  if (location.length == 0) {
    location = '/';
    return;
  }
  // get the route object from the routes object
  const route = routes[location] || routes['404'];
  // get the html from the template
  const html = await fetch(route.template).then((response) => response.text());

  // // load portfolio.json file
  if (location === 'portfolio') {
    // console.log("loading portfolio.json");
    // await fetch("../../data/portfolio.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("portfolio.json loaded");
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log("error loading portfolio.json");
    //     console.log(error);
    //   });
    // const data = await fetch("../../data/portfolio.json").then((response) =>
    //   response.json()
    // );
    // console.log("portfolio.json loaded");
    // console.log(data);
    // route.data = data;
    // console.log("Called from locationHandler");
  }

  // set the content of the content div to the html
  document.getElementById('content').innerHTML = html;
  // set the title of the document to the title of the route
  document.title = route.title;
  // set the description of the document to the description of the route
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', route.description);
  //
  navigationHandler(location);
};

// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener('hashchange', locationHandler);
// call the urlLocationHandler to load the page
locationHandler();

// navigation handler
const navigationHandler = (location) => {
  // console.log(location);
  const header = document.getElementById('header');
  const section = document.querySelector('section');
  header.classList.remove('header-tops');
  header.classList.add('header-top');
  section.style.transition = 'all 0.4s ease-in-out 0s';
  setTimeout(function () {
    section.classList.add('section-show');
    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 10);
  activeNavigation(location);
};

const activeNavigation = (location) => {
  // Loop through nav li elements and compare with location.hash to set active class
  const navLink = document.querySelectorAll('.nav-menu li a');
  const mobileLink = document.querySelectorAll('.mobile-nav li a');

  navLink.forEach((link, mobile) => {
    const mobileNav = mobileLink[mobile];
    const loc = '#' + location;
    const linkHref = '#' + link.href.split('#')[1];
    if (loc === linkHref) {
      // console.log("active match ->", loc, linkHref);
      link.parentElement.classList.add('active');
      mobileNav.parentElement.classList.add('active');
    } else {
      link.parentElement.classList.remove('active');
      mobileNav.parentElement.classList.remove('active');
    }
  });
};
