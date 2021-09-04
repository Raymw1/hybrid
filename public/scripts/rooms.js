const desks = document.querySelectorAll(".desk");
const input = document.querySelector("input[type=hidden]");
desks.forEach((desk) => {
  desk.addEventListener("click", () => {
    if (!desk.classList.contains("occuped")) {
      desks.forEach((desk) => {
        desk.classList.remove("active");
      });
      desk.classList.add("active");
      input.value = desk.dataset.id;
    }
  });
});
