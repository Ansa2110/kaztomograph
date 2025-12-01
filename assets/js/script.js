'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }

(function () {
    const slider = document.querySelector('.project-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const windowEl = slider.querySelector('.slider-window');
    const items = Array.from(track.children);
    const prevBtn = slider.querySelector('.slider-arrow-prev');
    const nextBtn = slider.querySelector('.slider-arrow-next');

    let index = 0;

    function getVisibleCount() {
      const item = items[0];
      if (!item) return 1;
      const itemWidth = item.getBoundingClientRect().width;
      const windowWidth = windowEl.getBoundingClientRect().width;
      const visible = Math.round(windowWidth / itemWidth) || 1;
      return visible;
    }

    function updateSlider() {
      if (!items.length) return;

      const visibleCount = getVisibleCount();
      const itemWidth = items[0].getBoundingClientRect().width;

      // gap между карточками
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || 0);

      const maxIndex = Math.max(0, items.length - visibleCount);
      if (index > maxIndex) index = maxIndex;

      const shift = index * (itemWidth + gap);
      track.style.transform = `translateX(-${shift}px)`;

      // если нужно блокировать стрелки на концах, раскомментируй:
      // prevBtn.disabled = index === 0;
      // nextBtn.disabled = index === maxIndex;
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visibleCount);
      index = Math.min(maxIndex, index + 1);
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  })();