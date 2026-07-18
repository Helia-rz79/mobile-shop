const swiper = new Swiper(".productSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".nextBtn",
    prevEl: ".prevBtn",
  },
  loop: true, 
});

// slider2
const newSwiper = new Swiper(".newSwiper", {
  slidesPerView: 1.5,
  spaceBetween: 12,
  navigation: {
    nextEl: ".newNext",
    prevEl: ".newPrev",
  },
  loop: false,
  watchOverflow: true,
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    950: {
      slidesPerView: 3.5,
      spaceBetween: 12,
    },
    1060: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

//slider3
const blackSwiper = new Swiper(".blackSwiper", {
  slidesPerView: 1.3,
  spaceBetween: 12,
  loop: false,
  watchOverflow: true,
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 12,
    },
    950: {
      slidesPerView: 3.5,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
  },
});

//slider4
const packageSwiper = new Swiper(".packageSwiper", {
  slidesPerView: 1.5,
  spaceBetween: 12,
  navigation: {
    nextEl: ".packageNext",
    prevEl: ".packagePrev",
  },
  loop: false,
  watchOverflow: true,
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 12,
    },
    950: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  },
});