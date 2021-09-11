/* eslint-disable eqeqeq */
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
  async put(req, res, next) {
    const emptyFields = verifyForm(req.body);
    if (emptyFields) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Preencha todos os campos!" });
    }
    const { email, phone, id } = req.body;
    if (!req.session.is_admin && id != req.session.userId) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Permissão negada!" });
    }
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailFormat)) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Email inválido!" });
    }
    const user = await User.findOne({
      where: { email },
      or: { phone: phone.replace(/\D/g, "") },
    });
    if (!user) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Usuário não encontrado!" });
    }
    next();
  },
  async delete(req, res, next) {
    const { id } = req.body;
    if (!id || (!req.session.is_admin && id != req.session.userId)) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Permissão negada!" });
    }
    const user = await User.find(id);
    if (!user) {
      const user = await User.find(req.session.userId);
      if (user.phone.length > 13) {
        user.phone = user.phone.replace(
          /(\d{3})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      } else {
        user.phone = user.phone.replace(
          /(\d{2})(\d{2})(\d{5})(\d)/,
          "+$1($2)$3-$4"
        );
      }
      return res.render("edit", { user, error: "Usuário não encontrado!" });
    }
    next();
  },
};
