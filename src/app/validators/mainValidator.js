module.exports = {
  verifyForm(body) {
    const keys = Object.keys(body);
    for (const key of keys) {
      if (Array.isArray(body[key])) {
        for (const subkey in key) {
          if (body[key][subkey]?.trim() === "") {
            return { user: body, error: "Insira todos os valores!" };
          }
        }
      } else {
        if (key !== "removed_files" && body[key].trim() === "") {
          return { data: body, error: "Insira todos os valores!" };
        }
      }
    }
    return 0;
  },
};
