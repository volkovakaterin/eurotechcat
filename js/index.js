//переменные
const currentLink = location.pathname;
const btnBurger = document.querySelector(".header-burger");
const headerMenu = document.querySelector(".header-menu");
const bodyEl = document.querySelector("body");
const maskEl = document.querySelector(".mask");
const closeBurger = document.querySelector(".header-close_burger");
const headerWrapEl = document.querySelector(".header-wrapper-inner");
const menuProducts = document.querySelectorAll(".menu-products");
const headerSubsEl = document.querySelector(".introduction__substrate");
const submenuLink = document.querySelector(".menu-products-link");
let selectedLink;
const inputSearch = document.querySelectorAll(".search__field");
const fieldSearch = document.querySelector(".search__wrapper");
const cleanInputSearch = document.querySelectorAll(".search__close");
const form = document.querySelector(".feedback-form");
const btnUp = document.querySelector(".footer-content-btn-up");
const submenuProducts = document.querySelector(".menu-products-list_container");
const feedbackFormSubmit = document.querySelector(".feedback-form-submit");
const arrowSelect = document.querySelectorAll(".select__arrow");
const selectBody = document.querySelectorAll(".select__body");
const optionSelect = document.querySelectorAll(".option__item");
const selectCustom = document.querySelectorAll(".select__custom");
const navbarPopup = document.querySelector(".menu__popup");
const boxes = Array.from(document.querySelectorAll(".accordion_box"));

//выделение активного пункта меню
function addActiveMenu() {
  document.querySelectorAll(".header-menu_link").forEach((item) => {
    const linkHref = item.getAttribute("href");
    if (currentLink.replace(/.*\//, "") === linkHref.replace(/.*\//, "")) {
      item.classList.add("active");
    }
  });
}

//закрытие бургера
function closeBurgerMenu() {
  navbarPopup.querySelector(".search__field").value = "";
  navbarPopup.querySelector(".search__wrapper").classList.remove("filled");
  maskEl.classList.remove("active");
  navbarPopup.classList.remove("visible");
  bodyEl.classList.remove("hidden");
}

//управление бургер меню
function controlBurger() {
  btnBurger.addEventListener("click", (e) => {
    maskEl.classList.add("active");
    navbarPopup.classList.add("visible");
    bodyEl.classList.add("hidden");
  });
  closeBurger.addEventListener("click", (e) => {
    closeBurgerMenu();
  });
}

//управление сабменю
function controlProductsMenu() {
  const subMenuBtn = document.querySelector(".header-container .menu-products");
  document.addEventListener("mouseover", (e) => {
    if (window.innerWidth > 1029) {
      const withinBoundaries = e.composedPath().includes(subMenuBtn);
      if (withinBoundaries) {
        navbarPopup.classList.add("visible");
        maskEl.classList.add("active");
        bodyEl.classList.add("hidden");
      } else if (!e.composedPath().includes(navbarPopup)) {
        navbarPopup.classList.remove("visible");
        maskEl.classList.remove("active");
        bodyEl.classList.remove("hidden");
      }
    }
  });
}

//закрытие бургера и сабменю при нажатии на оверлэй
function clickOverlay() {
  maskEl.addEventListener("click", (e) => {
    closeBurgerMenu();
    navbarPopup.classList.remove("visible");
    maskEl.classList.remove("active");
    bodyEl.classList.remove("hidden");
    submenuProducts.classList.remove("visible");
    navbarPopup.querySelector(".menu-products").classList.remove("expanded");
  });
}

//проверка поля поиска на наличие введенных данных
function checkSearchField(field) {
  field.addEventListener("input", (e) => {
    if (
      field.value.length > 0 &&
      !field.closest(".search__wrapper").classList.contains("filled")
    ) {
      field.closest(".search__wrapper").classList.add("filled");
    } else if (field.value.length == 0) {
      field.closest(".search__wrapper").classList.remove("filled");
    }
  });
}

//очистить поле поиска
function cleanSearch(btn) {
  btn.addEventListener("click", (e) => {
    btn.closest(".search__wrapper").querySelector(".search__field").value = "";
    btn.closest(".search__wrapper").classList.remove("filled");
  });
}

//наверх
function liftUp() {
  btnUp.addEventListener("click", (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}

//валидация
function validationField() {
  feedbackFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const requiredInputs = document.querySelectorAll("input[required]");
    let isError = false;

    requiredInputs.forEach((input) => {
      const value = input.value.trim();
      if (input.classList.contains("feedback-form-email") && value.length > 0) {
        if (value.length < 6 || !value.includes("@") || !value.includes(".")) {
          isError = true;
          input.classList.add("invalid-input");
          input.parentElement.classList.add("invalid-field");
        } else {
          input.classList.remove("invalid-input");
          input.parentElement.classList.remove("invalid-field");
        }
      } else if (!value) {
        isError = true;
        input.classList.add("required-input");
        input.parentElement.classList.add("required-field");
      } else {
        input.classList.remove("required-input");
        input.parentElement.classList.remove("required-field");
      }
    });
    if (!isError) {
      form.submit();
      form.reset();
    }
  });
}

//управление  select
function manageSelect(item) {
  item.addEventListener("click", (e) => {
    item.closest(".select__custom").classList.toggle("expanded");
  });
}

//выбор select
function chooseSelect(option) {
  const selectParent = option.closest(".select__custom");
  const options = selectParent.querySelectorAll(".option__item");
  const currentSelect = selectParent.querySelector(".select__current");
  option.addEventListener("click", (e) => {
    options.forEach((item) => {
      item.classList.remove("option__choose");
    });
    option.classList.add("option__choose");
    currentSelect.innerText = option.innerText;
    currentSelect.classList.add("current__choose");
    selectParent.classList.remove("expanded");
  });
}

//закрытие select по клику вне элемента
function closeSelect() {
  document.addEventListener("click", (e) => {
    selectCustom.forEach((item) => {
      const withinBoundaries = e.composedPath().includes(item);
      if (!withinBoundaries) {
        item.classList.remove("expanded");
      }
    });
  });
}

//аккордеон
function boxHandler(e) {
  if (window.innerWidth < 1030) {
    let currentBox = e.target.closest(".accordion_box");
    console.log(currentBox);
    let currentContent = currentBox.querySelector(
      ".menu-products-list_container"
    );
    console.log(currentContent);
    currentBox.classList.toggle("expanded");
    if (currentBox.classList.contains("expanded")) {
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    } else {
      currentContent.style.maxHeight = 0;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  clickOverlay();
  addActiveMenu();
  controlBurger();
  controlProductsMenu();
  inputSearch.forEach((item) => {
    checkSearchField(item);
  });
  cleanInputSearch.forEach((item) => {
    cleanSearch(item);
  });
  liftUp();
  if (feedbackFormSubmit) {
    validationField();
  }
  if (arrowSelect) {
    arrowSelect.forEach((item) => {
      manageSelect(item);
    });
  }
  closeSelect();
  if (optionSelect) {
    optionSelect.forEach((option) => {
      chooseSelect(option);
    });
  }
  boxes.forEach((box) => {
    box.addEventListener("click", boxHandler);
  });
});

if (document.querySelector(".swiper-introduction")) {
  const swiperIntroduction = new Swiper(".swiper-introduction", {
    direction: "horizontal",
    loop: true,
    spaceBetween: 20,
    speed: 900,

    pagination: {
      el: ".swiper-pagination-introduction",
    },
  });
}

if (document.querySelector(".swiper-news")) {
  const swiperNews = new Swiper(".swiper-news", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1.5,
    slidesPerGroup: 2,
    spaceBetween: 20,
    speed: 900,

    breakpoints: {
      391: {
        slidesPerView: 1.77,
        slidesPerGroup: 2,
      },

      1030: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },

      1441: {
        slidesPerView: 4,
      },
    },

    navigation: {
      nextEl: ".swiper-news-button-next",
      prevEl: ".swiper-news-button-prev",
    },

    pagination: {
      el: ".swiper-pagination-news",
    },
  });
}

if (document.querySelector(".swiper__oil_additive")) {
  const swiperOilAdditive = new Swiper(".swiper__oil_additive", {
    direction: "horizontal",
    loop: true,
    speed: 900,
    spaceBetween: 20,

    breakpoints: {
      1030: {
        slidesPerView: 1.35,
        slidesPerGroup: 2,
      },
      1441: {
        slidesPerView: 1.85,
        slidesPerGroup: 2,
      },
    },

    pagination: {
      el: ".pagination__oil_additive",
    },
  });
}

if (document.querySelector(".swiper__other_products")) {
  const swiperswiperOtherProducts = new Swiper(".swiper__other_products", {
    direction: "horizontal",
    loop: true,
    speed: 900,
    spaceBetween: 20,

    breakpoints: {
      1030: {
        slidesPerView: 1.35,
        slidesPerGroup: 2,
      },
      1441: {
        slidesPerView: 1.85,
        slidesPerGroup: 2,
      },
    },

    pagination: {
      el: ".pagination__other_products",
    },
  });
}

if (document.querySelector(".swiper__catalysts")) {
  const swiperCatalysts = new Swiper(".swiper__catalysts", {
    direction: "horizontal",
    loop: true,
    speed: 900,
    spaceBetween: 20,

    breakpoints: {
      1030: {
        slidesPerView: 1.35,
        slidesPerGroup: 2,
      },
      1441: {
        slidesPerView: 1.85,
        slidesPerGroup: 2,
      },
    },

    pagination: {
      el: ".pagination__catalysts",
    },
  });
}

ymaps.ready(init);
var myMap, myPlacemark;

function init() {
  myMap = new ymaps.Map("map", {
    center: [55.754203, 37.556388],
    zoom: 16,
  });

  myPlacemark = new ymaps.Placemark(
    [55.754203, 37.556388],
    {
      balloonContent: "",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "./assets/images/location.png",
      iconImageSize: [46, 58],
    }
  );
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable("scrollZoom");
}
