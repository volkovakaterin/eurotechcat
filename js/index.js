//переменные
const currentLink = location.pathname;
const fullPath = window.location.href;
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
const inputSearchingPage = document.querySelector(
  ".searching__field_container .search__field"
);
let request = "";
const searchFieldMenu = document.querySelectorAll(".search__field_menu");
const searchLoupMenu = document.querySelectorAll(".search__loup_menu");
const documentZoom = document.querySelectorAll(".document__card_zoom");
const zoomSlider = document.querySelector(".zoom__slider");
const zoomCloseEl = document.querySelector(".zoom__slider_close ");

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
      } else if (
        e.target == maskEl &&
        navbarPopup.classList.contains("visible")
      ) {
        navbarPopup.classList.remove("visible");
        maskEl.classList.remove("active");
        bodyEl.classList.remove("hidden");
      }
    }
  });

  subMenuBtn.addEventListener("click", (e) => {
    if (window.innerWidth > 1029 && e.target.tagName == "A") {
      e.preventDefault();
      navbarPopup.classList.add("visible");
      maskEl.classList.add("active");
      bodyEl.classList.add("hidden");
    }
  });

  navbarPopup.querySelector(".menu-products").addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(submenuProducts);
    if (window.innerWidth > 1029 && !withinBoundaries) {
      e.preventDefault();
      navbarPopup.classList.remove("visible");
      maskEl.classList.remove("active");
      bodyEl.classList.remove("hidden");
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

//переход на страницу поиска
function executeSearch() {
  searchFieldMenu.forEach((item) => {
    item.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        request = e.target.value;
        window.location.href = `./searching-page.html?q=${request}`;
      }
    });
  });

  searchLoupMenu.forEach((item) => {
    item.addEventListener("click", (e) => {
      const field = item
        .closest(".search__wrapper")
        .querySelector(".search__field_menu");
      request = field.value;
      window.location.href = `./searching-page.html?q=${request}`;
    });
  });
}

//установить значение запроса поиска на странице поиска
function setRequestSearch() {
  const decodePath = decodeURIComponent(fullPath);
  const index = decodePath.indexOf("q=");
  if (index !== -1) {
    const searchData = decodePath.substring(index + 2);
    inputSearchingPage.value = searchData;
  } else {
    inputSearchingPage.value = "";
  }
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
    const selectCustom = item.closest(".select__custom");
    const currentContent = selectCustom.querySelector(".select__body");
    selectCustom.classList.toggle("expanded");
    if (selectCustom.classList.contains("expanded")) {
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    } else {
      currentContent.style.maxHeight = 0;
    }
  });
}

//выбор select
function chooseSelect(option) {
  const selectParent = option.closest(".select__custom");
  const currentContent = selectParent.querySelector(".select__body");
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
    currentContent.style.maxHeight = 0;
  });
}

//закрытие select по клику вне элемента
function closeSelect() {
  document.addEventListener("click", (e) => {
    selectCustom.forEach((item) => {
      const withinBoundaries = e.composedPath().includes(item);
      if (!withinBoundaries) {
        item.classList.remove("expanded");
        const currentContent = item.querySelector(".select__body");
        currentContent.style.maxHeight = 0;
      }
    });
  });
}

//аккордеон
function boxHandler(e) {
  if (window.innerWidth < 1030) {
    let currentBox = e.target.closest(".accordion_box");
    let currentContent = currentBox.querySelector(
      ".menu-products-list_container"
    );
    currentBox.classList.toggle("expanded");
    if (currentBox.classList.contains("expanded")) {
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    } else {
      currentContent.style.maxHeight = 0;
    }
  }
}

//пагинация
const postsBoxEl = document.querySelector(".posts__container");
const paginationBox = document.querySelector(".pagination__list");
const paginationPrev = document.querySelector(".pagination__prev");
const paginationNext = document.querySelector(".pagination__next");

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

async function pagination() {
  const posts = await getData();
  let rows = 5;
  function displayList(arrData, rowPerPage, page = 1) {
    page--;
    postsBoxEl.innerHTML = "";
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);
    paginatedData.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post__item");
      postEl.innerHTML = `<div class="post__date"><span>21.01.2024</span></div>
      <div class="post__content">
        <span
          >${post.title}</span
        >
        <p>
         ${post.body}
        </p>
      </div>
      <div class="post__breadcrumbs">
        <ul class="breadcrumbs__list">
          <li class="breadcrumbs__item">
            <a href="./index.html">Главная</a>
          </li>
          <li class="breadcrumbs__item_arrow">
            <svg
              width="21"
              height="36"
              viewBox="0 0 21 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.919099 0.585786C1.70015 -0.195262 2.96648 -0.195262 3.74753 0.585786L19.7475 16.5858C20.5286 17.3668 20.5286 18.6332 19.7475 19.4142L3.74753 35.4142C2.96648 36.1953 1.70015 36.1953 0.919099 35.4142C0.138051 34.6332 0.138051 33.3668 0.919099 32.5858L15.5049 18L0.919099 3.41421C0.138051 2.63317 0.138051 1.36683 0.919099 0.585786Z"
                fill="#18191A"
              />
            </svg>
          </li>
          <li class="breadcrumbs__item">
            <a href="./news-page.html">Новости</a>
          </li>
        </ul>
      </div>`;
      postsBoxEl.appendChild(postEl);
    });
  }
  function displayPagination(arrData, rowPerPage, currentPage = 1) {
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    let left = Math.max(currentPage - 1, 1);
    let right = Math.min(left + 1 * 2, pagesCount);
    left = Math.max(right - 1 * 2, 1);
    let items = [];
    if (left > 1) items.push(1);
    if (left > 2) items.push("...");
    for (let page = left; page <= right; page++) items.push(page);
    if (right < pagesCount - 1) items.push("...");
    if (right < pagesCount) items.push(pagesCount);

    paginationBox.innerHTML = "";

    items.forEach((item) => {
      const liEl = displayPaginationBtn(item, currentPage);
      paginationBox.appendChild(liEl);
    });

    if (currentPage == 1) {
      paginationPrev.classList.add("disable");
    } else {
      paginationPrev.classList.remove("disable");
    }
    if (currentPage == pagesCount) {
      paginationNext.classList.add("disable");
    } else {
      paginationNext.classList.remove("disable");
    }
  }
  function displayPaginationBtn(page, currentPage) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    if (page == currentPage) {
      liEl.classList.add("active");
    }
    liEl.innerText = page;
    liEl.addEventListener("click", (e) => {
      if (page !== "...") {
        displayList(posts, rows, page);
        displayPagination(posts, rows, page);
      }
    });

    return liEl;
  }

  function scrollBtn() {
    paginationNext.addEventListener("click", (e) => {
      if (!paginationNext.classList.contains("disable")) {
        const currentPage = document.querySelector(".pagination__item.active");
        const numberPage = currentPage.innerText;
        const nextPage = Number(numberPage) + 1;
        displayList(posts, rows, nextPage);
        displayPagination(posts, rows, nextPage);
      }
    });
    paginationPrev.addEventListener("click", (e) => {
      if (!paginationPrev.classList.contains("disable")) {
        const currentPage = document.querySelector(".pagination__item.active");
        const numberPage = currentPage.innerText;
        const nextPage = Number(numberPage) - 1;
        displayList(posts, rows, nextPage);
        displayPagination(posts, rows, nextPage);
      }
    });
  }

  displayList(posts, rows);
  displayPagination(posts, rows);
  scrollBtn();
}

// zoom
function documentsZoom(item) {
  item.addEventListener("click", (e) => {
    zoomSlider.classList.add("active");
    maskEl.classList.add("active");
    bodyEl.classList.add("hidden");
  });
}

function zoomClose() {
  zoomCloseEl.addEventListener("click", (e) => {
    zoomSlider.classList.remove("active");
    maskEl.classList.remove("active");
    bodyEl.classList.remove("hidden");
  });
}

function zoomCloseOnMask() {
  maskEl.addEventListener("click", (e) => {
    if (zoomSlider.classList.contains("active")) {
      zoomSlider.classList.remove("active");
      maskEl.classList.remove("active");
      bodyEl.classList.remove("hidden");
    }
  });
}

document.addEventListener("mouseover", (e) => {
  console.log(e.target);
});

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
  if (feedbackFormSubmit) validationField();
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
  if (paginationBox) pagination();
  executeSearch();
  if (inputSearchingPage) setRequestSearch();
  if (documentZoom) {
    documentZoom.forEach((item) => {
      documentsZoom(item);
    });
    zoomCloseOnMask();
  }
  if (zoomCloseEl) {
    zoomClose();
  }
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

if (document.querySelector(".swiper__documents")) {
  const swiperDocuments = new Swiper(".swiper__documents", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1.5,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 900,

    breakpoints: {
      391: {
        slidesPerView: 1.77,
      },

      1030: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },

    navigation: {
      nextEl: ".swiper__document_button_next",
      prevEl: ".swiper__document_button_prev",
    },

    pagination: {
      el: ".swiper__pagination_documents",
    },
  });
}

if (document.querySelector(".swiper__zoom")) {
  const swiperZoom = new Swiper(".swiper__zoom", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 900,

    navigation: {
      nextEl: ".swiper__zoom_button_next",
      prevEl: ".swiper__zoom_button_prev",
    },
  });
}

ymaps.ready(init);
let myMap, myPlacemark;

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
