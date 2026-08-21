document.addEventListener("alpine:init", () => {
Alpine.data("shopApp", () => ({
galleryModalOpen: false,
galleryIndex: 0,
reviewFormOpen: false,
reviewRating: 0,
addressModalOpen: false,
addressModalStep: "map",
addressText: "",
reviewVotes: [
  { likes: 5, dislikes: 0, selected: null },
  { likes: 2, dislikes: 0, selected: null },
],
galleryImages: [
  "./src/img/iphone17-4.png",
  "./src/img/iphone17-1.png",
  "./src/img/iphone17-2.png",
  "./src/img/iphone17-3.png",
],
openGallery(index = 0) {
  this.galleryIndex = index;
  this.galleryModalOpen = true;
  document.body.style.overflow = "hidden";
},
closeGallery() {
  this.galleryModalOpen = false;
  document.body.style.overflow = "";
},
nextGalleryImage() {
  this.galleryIndex = (this.galleryIndex + 1) % this.galleryImages.length;
},
previousGalleryImage() {
  this.galleryIndex = (this.galleryIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
},
selectGalleryImage(index) {
  this.galleryIndex = index;
},
openAddressModal() {
  this.addressModalStep = "map";
  this.addressModalOpen = true;
  document.body.style.overflow = "hidden";
  this.$nextTick(() => this.$refs.addressModalClose?.focus());
},
closeAddressModal() {
  if (!this.addressModalOpen) return;
  this.addressModalOpen = false;
  document.body.style.overflow = "";
  this.$nextTick(() => this.$refs.addressModalTrigger?.focus());
},
showAddressStep(step) {
  this.addressModalStep = step;
  this.$nextTick(() => {
    if (this.$refs.addressModalDialog) this.$refs.addressModalDialog.scrollTop = 0;
  });
},
submitAddress() {
  this.closeAddressModal();
},
voteReview(index, type) {
  const vote = this.reviewVotes[index];
  if (!vote || vote.selected === type) return;

  if (vote.selected === "like") vote.likes--;
  if (vote.selected === "dislike") vote.dislikes--;

  vote.selected = type;
  if (type === "like") vote.likes++;
  if (type === "dislike") vote.dislikes++;
},
init() {
const mobileInput = document.querySelector("#mobile");

const toPersianDigits = (value) =>
  value
    .replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
    .replace(/[٠-٩]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit.charCodeAt(0) - 1632]);

mobileInput?.addEventListener("input", (event) => {
  const input = event.currentTarget;
  const cursorPosition = input.selectionStart;
  const convertedValue = toPersianDigits(input.value);

  if (convertedValue === input.value) return;

  input.value = convertedValue;
  input.setSelectionRange(cursorPosition, cursorPosition);
});

const passwordDisplay = document.querySelector("#password-display");
const passwordInput = document.querySelector("#password");
let passwordValue = "";

const renderMaskedPassword = () => {
  if (!passwordDisplay || !passwordInput) return;
  passwordDisplay.value = "*".repeat(passwordValue.length);
  passwordInput.value = passwordValue;
  passwordDisplay.setSelectionRange(passwordDisplay.value.length, passwordDisplay.value.length);
};

passwordDisplay?.addEventListener("beforeinput", (event) => {
  if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") {
    event.preventDefault();
    passwordValue = passwordValue.slice(0, -1);
    renderMaskedPassword();
    return;
  }

  if (event.inputType === "insertText" && event.data) {
    event.preventDefault();
    const digits = event.data.replace(/[^0-9۰-۹٠-٩]/g, "");
    passwordValue += digits;
    renderMaskedPassword();
  }
});

passwordDisplay?.addEventListener("paste", (event) => {
  event.preventDefault();
  const digits = event.clipboardData.getData("text").replace(/[^0-9۰-۹٠-٩]/g, "");
  passwordValue += digits;
  renderMaskedPassword();
});

const mobileMenuOpen = document.querySelector("#mobile-menu-open");
const mobileMenuClose = document.querySelector("#mobile-menu-close");
const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");
const mobileMenu = document.querySelector("#mobile-menu");

const setMobileMenu = (isOpen) => {
  if (!mobileMenuOpen || !mobileMenuOverlay || !mobileMenu) return;

  mobileMenuOpen.setAttribute("aria-expanded", String(isOpen));
  mobileMenuOverlay.setAttribute("aria-hidden", String(!isOpen));
  mobileMenuOverlay.classList.toggle("opacity-0", !isOpen);
  mobileMenuOverlay.classList.toggle("pointer-events-none", !isOpen);
  mobileMenu.classList.toggle("translate-x-full", !isOpen);
  document.body.classList.toggle("overflow-hidden", isOpen);
};

mobileMenuOpen?.addEventListener("click", () => setMobileMenu(true));
mobileMenuClose?.addEventListener("click", () => setMobileMenu(false));

mobileMenuOverlay?.addEventListener("click", (event) => {
  if (event.target === mobileMenuOverlay) setMobileMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenuOpen?.getAttribute("aria-expanded") === "true") {
    setMobileMenu(false);
  }
});

document.querySelectorAll(".mobile-submenu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const submenu = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    submenu?.classList.toggle("hidden", isExpanded);
    button.querySelector("svg")?.classList.toggle("rotate-180", !isExpanded);
  });
});

const mobileMenuTabs = document.querySelectorAll(".mobile-menu-tab");
const mobileMenuPanels = document.querySelectorAll("[data-menu-panel]");

mobileMenuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const activeTab = tab.dataset.menuTab;

    mobileMenuTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("bg-white", isActive);
      item.classList.toggle("shadow-sm", isActive);
    });

    mobileMenuPanels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.menuPanel !== activeTab);
    });
  });
});

const desktopCategoriesTrigger = document.querySelector("#desktop-categories-trigger");
const desktopMegaMenu = document.querySelector("#desktop-mega-menu");
let desktopMenuPinned = false;
let desktopMenuCloseTimer;

const setDesktopMenu = (isOpen) => {
  if (!desktopCategoriesTrigger || !desktopMegaMenu) return;

  desktopCategoriesTrigger.setAttribute("aria-expanded", String(isOpen));
  desktopMegaMenu.setAttribute("aria-hidden", String(!isOpen));
  desktopMegaMenu.classList.toggle("lg:invisible", !isOpen);
  desktopMegaMenu.classList.toggle("lg:opacity-0", !isOpen);
  desktopMegaMenu.classList.toggle("lg:translate-y-2", !isOpen);
  desktopCategoriesTrigger.querySelector("svg")?.classList.toggle("rotate-180", isOpen);
};

const cancelDesktopMenuClose = () => clearTimeout(desktopMenuCloseTimer);
const scheduleDesktopMenuClose = () => {
  cancelDesktopMenuClose();
  desktopMenuCloseTimer = setTimeout(() => {
    if (!desktopMenuPinned) setDesktopMenu(false);
  }, 120);
};

desktopCategoriesTrigger?.addEventListener("mouseenter", () => {
  cancelDesktopMenuClose();
  setDesktopMenu(true);
});
desktopCategoriesTrigger?.addEventListener("mouseleave", scheduleDesktopMenuClose);
desktopMegaMenu?.addEventListener("mouseenter", cancelDesktopMenuClose);
desktopMegaMenu?.addEventListener("mouseleave", scheduleDesktopMenuClose);

desktopCategoriesTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  desktopMenuPinned = !desktopMenuPinned;
  setDesktopMenu(desktopMenuPinned);
});

desktopCategoriesTrigger?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    desktopMenuPinned = !desktopMenuPinned;
    setDesktopMenu(desktopMenuPinned);
  }
});

document.addEventListener("click", (event) => {
  if (!desktopMegaMenu?.contains(event.target) && !desktopCategoriesTrigger?.contains(event.target)) {
    desktopMenuPinned = false;
    setDesktopMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    desktopMenuPinned = false;
    setDesktopMenu(false);
  }
});

if (typeof Swiper !== "undefined") {
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
  slidesPerView: 1.5,
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

// Product page: independent related-content sliders
const installmentPaymentSwiper = new Swiper(".installmentPaymentSwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  allowTouchMove: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const relatedProductSlides = document.querySelectorAll(".relatedProductsSwiper .swiper-slide");
const relatedProductImages = [
  "./src/img/iphone16.png",
  "./src/img/watch.png",
  "./src/img/tablet.png",
  "./src/img/iphone17.png",
  "./src/img/airpods.png",
];
const relatedProductCard = relatedProductSlides[0]?.firstElementChild;
if (relatedProductCard) {
  relatedProductSlides.forEach((slide, index) => {
    if (index > 0) slide.replaceChildren(relatedProductCard.cloneNode(true));
    const image = slide.querySelector("img");
    if (image) image.src = relatedProductImages[index] || relatedProductImages[0];
  });
}

const relatedProductsSwiper = new Swiper(".relatedProductsSwiper", {
  slidesPerView: 1.5,
  spaceBetween: 12,
  watchOverflow: true,
  navigation: {
    nextEl: ".relatedProductsNext",
    prevEl: ".relatedProductsPrev",
  },
  breakpoints: {
    500: { slidesPerView: 2, spaceBetween: 12 },
    768: { slidesPerView: 3, spaceBetween: 12 },
    950: { slidesPerView: 3.5, spaceBetween: 12 },
    1060: { slidesPerView: 4, spaceBetween: 20 },
  },
});

const relatedArticlesSwiper = new Swiper(".relatedArticlesSwiper", {
  slidesPerView: 1.2,
  spaceBetween: 14,
  watchOverflow: true,
  navigation: {
    nextEl: ".relatedArticlesNext",
    prevEl: ".relatedArticlesPrev",
  },
  breakpoints: {
    560: { slidesPerView: 2, spaceBetween: 16 },
    900: { slidesPerView: 3, spaceBetween: 20 },
  },
});
}

// Category filters
const categoryFilterButton = document.getElementById("mobile-filter-btn");
const categoryFilters = document.getElementById("category-filters");
const categoryFilterLabel = document.getElementById("mobile-filter-label");
const categorySortButton = document.getElementById("mobile-sort-btn");
const mobileSheetOverlay = document.getElementById("mobile-sheet-overlay");
const filterSheet = document.getElementById("filter-sheet");
const sortSheet = document.getElementById("sort-sheet");
const applyMobileFilters = document.getElementById("apply-mobile-filters");
const mobilePriceSlider = document.getElementById("mobile-price-slider");
const mobilePriceMin = document.getElementById("mobile-price-min");
const mobilePriceMax = document.getElementById("mobile-price-max");
const mobilePriceMinOutput = document.getElementById("mobile-price-min-output");
const mobilePriceMaxOutput = document.getElementById("mobile-price-max-output");

document.querySelectorAll(".filter-title").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".filter-box")?.classList.toggle("closed");
  });
});

const closeMobileSheet = () => {
  if (!mobileSheetOverlay) return;
  filterSheet?.classList.add("translate-y-full");
  sortSheet?.classList.add("translate-y-full");
  mobileSheetOverlay.classList.add("opacity-0", "invisible");
  mobileSheetOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overflow-hidden");
};

const openMobileSheet = (sheet) => {
  if (!mobileSheetOverlay || !sheet) return;
  filterSheet?.classList.add("hidden", "translate-y-full");
  sortSheet?.classList.add("hidden", "translate-y-full");
  sheet.classList.remove("hidden");
  mobileSheetOverlay.classList.remove("invisible", "opacity-0");
  mobileSheetOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");
  requestAnimationFrame(() => sheet.classList.remove("translate-y-full"));
};

categoryFilterButton?.addEventListener("click", () => openMobileSheet(filterSheet));
categorySortButton?.addEventListener("click", () => openMobileSheet(sortSheet));
applyMobileFilters?.addEventListener("click", closeMobileSheet);
mobileSheetOverlay?.addEventListener("click", (event) => {
  if (event.target === mobileSheetOverlay) closeMobileSheet();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileSheet();
});

const renderMobilePriceRange = () => {
  if (!mobilePriceMin || !mobilePriceMax || !mobilePriceSlider) return;
  const minimum = Number(mobilePriceMin.min);
  const maximum = Number(mobilePriceMin.max);
  const minValue = Number(mobilePriceMin.value);
  const maxValue = Number(mobilePriceMax.value);
  const minPercent = ((minValue - minimum) / (maximum - minimum)) * 100;
  const maxPercent = ((maxValue - minimum) / (maximum - minimum)) * 100;
  const fill = mobilePriceSlider.querySelector(".dual-range-fill");

  if (fill) {
    fill.style.left = `${minPercent}%`;
    fill.style.right = `${100 - maxPercent}%`;
  }
  if (mobilePriceMinOutput) mobilePriceMinOutput.value = minValue.toLocaleString("fa-IR");
  if (mobilePriceMaxOutput) mobilePriceMaxOutput.value = maxValue.toLocaleString("fa-IR");
};

mobilePriceMin?.addEventListener("input", () => {
  if (Number(mobilePriceMin.value) > Number(mobilePriceMax.value)) {
    mobilePriceMin.value = mobilePriceMax.value;
  }
  renderMobilePriceRange();
});
mobilePriceMax?.addEventListener("input", () => {
  if (Number(mobilePriceMax.value) < Number(mobilePriceMin.value)) {
    mobilePriceMax.value = mobilePriceMin.value;
  }
  renderMobilePriceRange();
});
mobilePriceSlider?.addEventListener("pointerdown", (event) => {
  if (event.target?.matches("input")) return;
  const bounds = mobilePriceSlider.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
  const value = Number(mobilePriceMin.min) + ratio * (Number(mobilePriceMin.max) - Number(mobilePriceMin.min));
  const target = Math.abs(value - Number(mobilePriceMin.value)) <= Math.abs(value - Number(mobilePriceMax.value))
    ? mobilePriceMin
    : mobilePriceMax;
  target.value = String(Math.round(value / Number(target.step)) * Number(target.step));
  target.dispatchEvent(new Event("input", { bubbles: true }));
});
renderMobilePriceRange();

const setupDualPriceRange = (sliderId, minId, maxId, minOutputId, maxOutputId) => {
  const slider = document.getElementById(sliderId);
  const minInput = document.getElementById(minId);
  const maxInput = document.getElementById(maxId);
  const minOutput = document.getElementById(minOutputId);
  const maxOutput = document.getElementById(maxOutputId);
  if (!slider || !minInput || !maxInput) return;

  const render = () => {
    const minimum = Number(minInput.min);
    const maximum = Number(minInput.max);
    const minValue = Number(minInput.value);
    const maxValue = Number(maxInput.value);
    const minPercent = ((minValue - minimum) / (maximum - minimum)) * 100;
    const maxPercent = ((maxValue - minimum) / (maximum - minimum)) * 100;
    const fill = slider.querySelector(".dual-range-fill");
    if (fill) {
      fill.style.left = `${minPercent}%`;
      fill.style.right = `${100 - maxPercent}%`;
    }
    if (minOutput) minOutput.value = minValue.toLocaleString("fa-IR");
    if (maxOutput) maxOutput.value = maxValue.toLocaleString("fa-IR");
  };

  minInput.addEventListener("input", () => {
    if (Number(minInput.value) > Number(maxInput.value)) minInput.value = maxInput.value;
    render();
  });
  maxInput.addEventListener("input", () => {
    if (Number(maxInput.value) < Number(minInput.value)) maxInput.value = minInput.value;
    render();
  });
  slider.addEventListener("pointerdown", (event) => {
    if (event.target?.matches("input")) return;
    const bounds = slider.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const value = Number(minInput.min) + ratio * (Number(minInput.max) - Number(minInput.min));
    const target = Math.abs(value - Number(minInput.value)) <= Math.abs(value - Number(maxInput.value)) ? minInput : maxInput;
    target.value = String(Math.round(value / Number(target.step)) * Number(target.step));
    target.dispatchEvent(new Event("input", { bubbles: true }));
  });
  render();
};

setupDualPriceRange(
  "desktop-price-slider",
  "desktop-price-min",
  "desktop-price-max",
  "desktop-price-min-output",
  "desktop-price-max-output",
);

// Product gallery
const productGalleryMain = document.getElementById("product-gallery-main");
document.querySelectorAll(".product-gallery-thumb").forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    if (productGalleryMain && thumbnail.dataset.image) {
      productGalleryMain.src = thumbnail.dataset.image;
    }
    document.querySelectorAll(".product-gallery-thumb").forEach((item) => {
      const isActive = item === thumbnail;
      item.classList.toggle("border-[#00c29f]", isActive);
      item.classList.toggle("border-transparent", !isActive);
    });
  });
});

// Product information tabs
const productTabs = document.querySelectorAll(".product-tab");
const productTabPanels = document.querySelectorAll(".product-tab-panel");
productTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    productTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("border-b-2", isActive);
      item.classList.toggle("border-[#b00091]", isActive);
      item.classList.toggle("font-bold", isActive);
    });
    productTabPanels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.panel !== tab.dataset.tab);
    });
  });
});

// Expandable product description and reviews
document.querySelectorAll(".expand-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.expandTarget || "");
    if (!target) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    target.classList.toggle("hidden", isExpanded);

    const label = button.querySelector("span:first-child");
    const icon = button.querySelector("svg");
    if (label) {
      label.textContent = isExpanded
        ? button.dataset.collapsedLabel || "مشاهده بیشتر"
        : "مشاهده کمتر";
    }
    if (icon) icon.classList.toggle("rotate-180", !isExpanded);
  });
});

// Product color and warranty selection
const selectedProductColor = document.getElementById("selected-product-color");
document.querySelectorAll(".product-color").forEach((colorButton) => {
  colorButton.addEventListener("click", () => {
    document.querySelectorAll(".product-color-check").forEach((check) => check.classList.add("hidden"));
    colorButton.querySelector(".product-color-check")?.classList.remove("hidden");
    if (selectedProductColor) selectedProductColor.textContent = colorButton.dataset.color || "";
  });
});

const productWarranty = document.getElementById("product-warranty");
const selectedProductWarranty = document.getElementById("selected-product-warranty");
productWarranty?.addEventListener("change", () => {
  if (selectedProductWarranty) selectedProductWarranty.textContent = productWarranty.value;
});
},
}));
});
