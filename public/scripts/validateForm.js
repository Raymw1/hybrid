/* eslint-disable no-useless-escape */
// =========== VALIDATE ===========
const Validate = {
  errorBox: document.querySelector(".message-popup"),
  apply(input, func) {
    Validate.clearErrors();
    const results = Validate[func](input.value);
    input.value = results.value;
    if (results.error) {
      Validate.displayError(input, results.error);
    }
  },
  clearErrors() {
    if (Validate.errorBox.classList.contains("active")) {
      Validate.errorBox.classList.remove("active");
    }
  },
  displayError(input, error) {
    Validate.errorBox.innerHTML = `<img src="/assets/images/error.png" alt="Erro" >${error}`;
    Validate.errorBox.classList.add("active");
    setTimeout(() => {
      setTimeout(() => {
        Validate.errorBox.innerText = "";
      }, 400);
      Validate.errorBox.classList.remove("active");
    }, 4000);
    input.focus();
  },
  isEmail(value) {
    let error = null;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.match(mailFormat)) {
      error = "Email inválido!";
    }
    return {
      error,
      value,
    };
  },
  allFields(event) {
    const fields = event.currentTarget.querySelectorAll(
      ".input-group input, .input-group select, .input-group textarea"
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
