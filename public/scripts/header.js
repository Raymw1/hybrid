// eslint-disable-next-line no-unused-vars
const Menu = {
  header: document.querySelector("header"),
  icon: document.querySelector("a.hamburguer"),
  open() {
    this.header.classList.add("active");
    this.icon.setAttribute("onclick", "Menu.close();");
  },
  close() {
    this.header.classList.remove("active");
    this.icon.setAttribute("onclick", "Menu.open();");
  },
};
