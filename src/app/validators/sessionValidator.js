const User = require("../models/User");
const { verifyForm } = require("./mainValidator");
const { compare } = require("bcryptjs");

module.exports = {
  async login(req, res, next) {
    try {
      const emptyFields = verifyForm(req.body);
      if (emptyFields) return res.render("login", { ...emptyFields });
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.render("login", {
          data: { email },
          error: "Email não cadastrado!",
        });
      const passwordValidation = await compare(password, user.password);
      if (!passwordValidation)
        return res.render("login", {
          data: { email },
          error: "Senha inválida!",
        });
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.render("login", { error: "Algo inesperado ocorreu!" });
    }
  },
  async forgot(req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.render("signup", {
          error: "Email não cadastrado",
        });
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.render("/signup", { error: "Algo inesperado ocorreu!" });
    }
  },
  async reset(req, res, next) {
    const { email, password, passwordRepeat, token } = req.body;
    try {
      const emptyFields = verifyForm(req.body);
      if (emptyFields)
        return res.render("reset-password", {
          ...emptyFields,
          token,
        });
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.render("reset-password", {
          data: req.body,
          token,
          error: "Email não cadastrado",
        });
      if (password !== passwordRepeat)
        return res.render("reset-password", {
          data: req.body,
          token,
          error: "Senhas diferentes!",
        });

      if (token !== user.reset_token)
        return res.render("reset-password", {
          data: req.body,
          token,
          error: "Token inválido! Solicite uma nova recuperação de senha.",
        });

      let now = new Date();
      now = now.setHours(now.getHours());

      if (now > user.reset_token_expires)
        return res.render("reset-password", {
          data: req.body,
          token,
          error: "Token expirado! Solicite uma nova recuperação de senha.",
        });

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      if (err)
        return res.render("password-reset", {
          data: req.body,
          token: token || req.query.token || req.body.token,
          error: "Erro inesperado, tente novamente!",
        });
    }
  },
};
