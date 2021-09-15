// eslint-disable-next-line no-unused-vars
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header nav ul li a");

menuItems.forEach((menuItem) => {
  if (
    (currentPage.includes(menuItem.getAttribute("href")) &&
      menuItem.getAttribute("href") !== "/") ||
    currentPage === menuItem.getAttribute("href")
  ) {
    menuItem.classList.add("active");
  } else {
    menuItem.classList.remove("active");
  }
});

const Menu = {
  header: document.querySelector(".header-overlay"),
  icon: document.querySelector("a.hamburguer"),
  main: document.querySelector("body > main"),
  open(event) {
    event.preventDefault();
    this.icon.firstElementChild.src = "/assets/images/close.svg";
    this.icon.setAttribute("onclick", "Menu.close(event);");
    this.main.style.marginTop = "6.4rem";
    this.header.classList.add("active");
  },
  close(event) {
    event.preventDefault();
    this.icon.firstElementChild.src = "/assets/images/menu.svg";
    this.main.style.marginTop = "0";
    this.icon.setAttribute("onclick", "Menu.open(event);");
    this.header.classList.remove("active");
  },
};
