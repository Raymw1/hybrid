const passwordButtons = document.querySelectorAll("img.passwordButton");
passwordButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const input = button.parentNode.firstElementChild;
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  });
});
