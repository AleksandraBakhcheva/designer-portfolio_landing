let year = document.querySelector(".year");
year.textContent = "Copyright © " + new Date().getFullYear();

const STORAGEKEY = "theme-preference";

const handleThemeSwitch = () => {
  THEME.value = THEME.value === "light" ? "dark" : "light";
  setThemeColor();
};

const getThemeColor = () => {
  if (localStorage.getItem(STORAGEKEY)) return localStorage.getItem(STORAGEKEY);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

const THEME = {
  value: getThemeColor(),
};

const setThemeColor = () => {
  localStorage.setItem(STORAGEKEY, THEME.value);
  displayThemeColor();
};

const displayThemeColor = () => {
  document.firstElementChild.setAttribute("data-theme", THEME.value);
  document
    .querySelector("#theme-toggle")
    ?.setAttribute("aria-label", THEME.value);
};

displayThemeColor();

window.onload = () => {
  displayThemeColor();
  document
    .querySelector("#theme-toggle")
    .addEventListener("click", handleThemeSwitch);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    THEME.value = isDark ? "dark" : "light";
    setThemeColor();
  });

let items = document.querySelectorAll(".portfolio-block__slider img");
const NEXTPROJECT = document.querySelector(".slider-next");
const PREVIOUSPROJECT = document.querySelector(".slider-previous");
let count = 0;

function getNextProject() {
  items[count].classList.remove("active");
  if (count < items.length - 1) {
    count++;
  } else {
    count = 0;
  }
  items[count].classList.add("active");
}

function getPreviousProject() {
  items[count].classList.remove("active");
  if (count > 0) {
    count--;
  } else {
    count = items.length - 1;
  }
  items[count].classList.add("active");
}

NEXTPROJECT.addEventListener("click", getNextProject);
PREVIOUSPROJECT.addEventListener("click", getPreviousProject);
