/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// ----- Define Global Variables -----
const navList = document.getElementById('navbar__list'); // ul element
const navElements = document.querySelectorAll('section'); // section elements

// ----- Build menu -----
navElements.forEach(el => {
  const navElementsList = `<li class="menu__link ${el.className}" data-link="${el.id}"><a href="#${el.id}">${el.dataset.nav}</a></li>`;
  navList.insertAdjacentHTML('beforeend', navElementsList);
});

// Scroll to section on link click
navList.addEventListener('click', e => {
  e.preventDefault();

  const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
  const scrollToTarget = document.getElementById(parent.dataset.link);

  scrollToTarget.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// ----- Set sections & navlinks as active with Intersection Observer API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API -----
const callback = entries => {
  entries.forEach(entry => {
    const section = document.getElementById(entry.target.id);

    const navElementsList = document.querySelector(`.menu__link[data-link="${entry.target.id}"]`);

    if (entry.isIntersecting) {
      navElementsList.classList.add('active');
      section.classList.add('active');
    } else {
      if (navElementsList.classList.contains('active')) {
        navElementsList.classList.remove('active');
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active');
      }
    }
  });
};

// ----- The options object passed, let you control the circumstances under which the observer's callback is invoked. -----
const options = {
  root: null, // Defaults to the browser viewport
  rootMargin: '0px',
  threshold: 0.8, // The target's visibility the observer's callback should be executed.
};

// Create observer and give it a target element to watch
const observer = new IntersectionObserver(callback, options);
navElements.forEach(el => {
  observer.observe(document.getElementById(el.id));
});
