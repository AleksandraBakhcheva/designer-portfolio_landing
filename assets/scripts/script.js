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
