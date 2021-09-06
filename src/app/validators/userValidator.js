/* eslint-disable no-useless-escape */
const { verifyForm } = require("./mainValidator");
const User = require("../models/User");

module.exports = {
  async post(req, res, next) {
    const emptyFields = verifyForm(req.body);
    // await checkIfIsAdminToCreate(req, res, () => {});
    if (emptyFields)
      return res.render("signup", {
        ...emptyFields,
      });
    const { name, email, phone, password, city } = req.body;
    const data = { name, email, phone, city };
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat))
      return res.render("signup", {
        data,
        error: "Insira um email válido",
      });
    const user = await User.findOne({
      where: { email },
      or: { phone: phone.replace(/\D/g, "") },
    });
    if (user)
      return res.render("signup", {
        data,
        error: "Usuário já cadastrado!",
      });
    // if (password !== passwordRepeat)
    //   return res.render("signup", {
    //     data,
    //     error: "Senhas diferentes, tente novamente!",
    //   });
    next();
  },
};
