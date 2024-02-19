//переменные
let currentLink = location.pathname;
let btnBurger = document.querySelector(".header-burger");
let headerMenu = document.querySelector(".header-menu");
let bodyEl = document.querySelector("body");
let maskEl = document.querySelector(".mask");
let closeBurger = document.querySelector(".header-close_burger");
let headerWrapEl = document.querySelector(".header-wrapper-inner");
let headerSearchEl = document.querySelector(".header-search");
let menuProducts = document.querySelector(".menu-products");
let headerSubsEl = document.querySelector(".header-container-substrate");
let submenuLink = document.querySelector(".menu-products-link");
let selectedLink;
let inputSearch = document.querySelector(".header-search_fild");
let fieldSearch = document.querySelector(".header-search");
let cleanInputSearch = document.querySelector(".header-search_close");
let form = document.querySelector(".feedback-form");
let btnUp = document.querySelector(".footer-content-btn-up");

let submenuLayout = document.createElement("div");
submenuLayout.className = "menu-products-list_container";
submenuLayout.innerHTML = `<div class="menu-products-list_content">
<h3 class="menu-products-list-title">Продукты</h3>
<ul class="menu-products-list">
  <li class="menu-products-item">
    <a class="menu-products-link" href="#">Масла и присадки</a>
  </li>
  <li class="menu-products-item">
    <a class="menu-products-link" href="#">Катализаторы и химия</a>
  </li>
  <li class="menu-products-item">
    <a class="menu-products-link" href="#">Другие продукты</a>
  </li>
</ul>
</div>`;

//выделение активного пункта меню
function addActiveMenu() {
  document.querySelectorAll(".header-menu_link").forEach((item) => {
    let linkHref = item.getAttribute("href");
    if (currentLink === linkHref) {
      item.classList.add("active");
    }
  });
}

//управление бургер меню
function controlBurger() {
  btnBurger.addEventListener("click", (e) => {
    maskEl.classList.add("active");
    headerWrapEl.classList.add("active");
    btnBurger.classList.add("hidden");
    bodyEl.classList.add("hidden");
  });
  closeBurger.addEventListener("click", (e) => {
    let submenuProducts = document.querySelector(
      ".menu-products-list_container"
    );
    inputSearch.value = "";
    menuProducts.classList.remove("visible");
    headerMenu.classList.remove("visible");
    headerSubsEl.classList.remove("visible");
    submenuProducts.classList.remove("visible");
    maskEl.classList.remove("active");
    headerWrapEl.classList.remove("active");
    btnBurger.classList.remove("hidden");
    bodyEl.classList.remove("hidden");
  });
}

//вставить сабменю в разметку
function insertSubmenuLayout() {
  if (window.innerWidth > 1029) {
    headerMenu.after(submenuLayout);
  } else menuProducts.after(submenuLayout);
}

//управление сабменю
function controlProductsMenu() {
  menuProducts.addEventListener("click", (e) => {
    if (e.target !== menuProducts.querySelector(".header-menu_link")) {
      let submenuProducts = document.querySelector(
        ".menu-products-list_container"
      );
      menuProducts.classList.toggle("visible");
      headerMenu.classList.toggle("visible");
      headerSubsEl.classList.toggle("visible");
      submenuProducts.classList.toggle("visible");
      if (window.innerWidth > 1029) {
        maskEl.classList.toggle("active");
        bodyEl.classList.toggle("hidden");
      }
    } else return;
  });
}

//выделение активного пункта сабменю
function addActiveSubmenu() {
  let submenuProducts = document.querySelector(".menu-products-list_container");
  submenuProducts.onclick = function (e) {
    let target = e.target;
    if (target.tagName == "A") {
      if (selectedLink) {
        selectedLink.classList.remove("active");
      }
      if (target !== selectedLink) {
        target.classList.add("active");
        selectedLink = target;
      } else if (target == selectedLink) {
        selectedLink = false;
      }
    }
  };
}

//проверка поля поиска на наличие введенных данных
function checkSearchField() {
  inputSearch.addEventListener("input", (e) => {
    if (
      inputSearch.value.length > 0 &&
      !fieldSearch.classList.contains("filled")
    ) {
      fieldSearch.classList.add("filled");
    } else if (inputSearch.value.length == 0) {
      fieldSearch.classList.remove("filled");
    }
  });
}

//очистить поле поиска
function cleanSearch() {
  cleanInputSearch.addEventListener("click", (e) => {
    inputSearch.value = "";
    fieldSearch.classList.remove("filled");
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
  document
    .querySelector(".feedback-form-submit")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let requiredInputs = document.querySelectorAll("input[required]");
      let isError = false;

      requiredInputs.forEach((input) => {
        const value = input.value.trim();
        if (
          input.classList.contains("feedback-form-email") &&
          value.length > 0
        ) {
          if (
            value.length < 6 ||
            !value.includes("@") ||
            !value.includes(".")
          ) {
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

document.addEventListener("DOMContentLoaded", function () {
  insertSubmenuLayout();
  addActiveMenu();
  controlBurger();
  controlProductsMenu();
  addActiveSubmenu();
  checkSearchField();
  cleanSearch();
  validationField();
  liftUp();
});

const swiperIntroduction = new Swiper(".swiper-introduction", {
  direction: "horizontal",
  loop: true,
  speed: 900,

  pagination: {
    el: ".swiper-pagination-introduction",
  },
});

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
      slidesPerGroup: 3,
    },

    1441: {
      slidesPerView: 4,
      slidesPerGroup: 4,
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
