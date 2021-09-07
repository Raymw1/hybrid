/* eslint-disable no-useless-escape */
// =========== VALIDATE ===========
const Validate = {
  errorBox: document.querySelector(".message-popup"),
  isEmail(input) {
    let img = document.querySelector(".input img");
    if (img)
      document.querySelector(".input input").parentElement.removeChild(img);
    // eslint-disable-next-line no-undef
    img = new Image();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    img.src = !input.value.match(mailFormat)
      ? "/assets/images/error.png"
      : "/assets/images/success.svg";
    input.parentElement.appendChild(img);
  },
  allFields(event) {
    const fields = event.target.parentElement.querySelectorAll(
      "input, select, textarea"
    );
    for (const field of fields) {
      if (
        field.value.trim() === "" &&
        field.name !== "removed_files" &&
        field.name !== "avatar" &&
        field.name !== "photos"
      ) {
        event.preventDefault();
        Validate.errorBox.innerHTML = `<img src="/assets/images/error.png" alt="Erro" >Por favor, preencha todos os campos!`;
        Validate.errorBox.classList.add("active");
        setTimeout(() => {
          setTimeout(() => {
            Validate.errorBox.innerText = "";
          }, 400);
          Validate.errorBox.classList.remove("active");
        }, 4000);
      }
    }
  },
};
