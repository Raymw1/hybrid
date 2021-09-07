const unities = document.querySelectorAll(".unity");
const inputCity = document.querySelector("input[name=cityId]");
unities.forEach((unity) => {
  unity.addEventListener("click", () => {
    unities.forEach((unity) => {
      unity.classList.remove("active");
    });
    unity.classList.add("active");
    inputCity.value = unity.dataset.id;
  });
});
