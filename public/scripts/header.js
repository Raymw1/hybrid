// eslint-disable-next-line no-unused-vars
const Menu = {
  header: document.querySelector(".header-overlay"),
  icon: document.querySelector("a.hamburguer"),
  main: document.querySelector("body > main"),
  open() {
    this.header.classList.add("active");
    this.icon.setAttribute("onclick", "Menu.close();");
    this.icon.firstElementChild.innerText = "close";
  },
  close() {
    this.header.classList.remove("active");
    this.icon.setAttribute("onclick", "Menu.open();");
    this.icon.firstElementChild.innerText = "menu";
  },
};
