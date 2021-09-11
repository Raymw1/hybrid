const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value);
    }, 1);
  },
  formatPhone(value) {
    value = value.replace(/\D/g, ""); // Get only digits/numbers
    if (value.length > 14) {
      value = value.slice(0, -1);
    }
    if (value.length > 13) {
      value = value.replace(/(\d{3})(\d{2})(\d{5})(\d)/, "+$1($2)$3-$4"); // '+999(99)99999-9999'
    } else {
      value = value.replace(/(\d{1})(\d)/, "+$1$2"); // '+9999999999999'
      value = value.replace(/(\d{2})(\d{2})(\d)/, "$1($2)$3"); // '+99(99)999999999'
      value = value.replace(/(\d{5})(\d)/, "$1-$2"); // '+99(99)99999-9999'
    }
    return value;
  },
  cpfCnpj(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 14) {
      value = value.slice(0, -1);
    }
    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, "$1.$2"); // '11.222333444455'
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // '11.222.333444455'
      value = value.replace(/(\d{3})(\d)/, "$1/$2"); // '11.222.333/444455'
      value = value.replace(/(\d{4})(\d)/, "$1-$2"); // '11.222.333/4444-55'
    } else {
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // '112.22333444'
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // '112.223.33444'
      value = value.replace(/(\d{3})(\d)/, "$1-$2"); // '112.223.334-44'
    }
    return value;
  },
};
