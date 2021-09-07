const unities = document.querySelectorAll(".unity");
const input = document.querySelector("input[name=cityId]");
unities.forEach((unity) => {
  unity.addEventListener("click", () => {
    unities.forEach((unity) => {
      unity.classList.remove("active");
    });
    unity.classList.add("active");
    input.value = unity.dataset.id;
  });
});
