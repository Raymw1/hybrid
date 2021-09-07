const days = document.querySelectorAll(".day");
const input = document.querySelector("input[name=day]");
days.forEach((day) => {
  day.addEventListener("click", () => {
    days.forEach((day) => {
      day.classList.remove("active");
    });
    day.classList.add("active");
    input.value = day.dataset.datetime;
  });
});
