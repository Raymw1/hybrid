const unities = document.querySelectorAll(".unity");
const input = document.querySelector("input[type=hidden]");
unities.forEach((unity) => {
  unity.addEventListener("click", () => {
    unities.forEach((unity) => {
      unity.classList.remove("active");
    });
    unity.classList.add("active");
    input.value = unity.dataset.id;
  });
});
