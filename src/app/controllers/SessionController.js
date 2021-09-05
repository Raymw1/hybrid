const crypto = require("crypto");
const User = require("../models/User");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
  async forgot(req, res) {
    try {
      const user = req.user;
      const token = crypto.randomBytes(20).toString("hex");

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: process.env.APP_MAIL,
        subject: "Recuperação de senha",
        html: `<h2>Recupere sua senha</h2>
        <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
        <p><a href="http://127.0.0.1:3000/password-reset?token=${token}" target="_blank">RECUPERAR SENHA</a></p>`,
      });
      return res.render("signup", {
        success: "Verifique seu email para resetar sua senha!",
      });
    } catch (err) {
      console.error(err);
      return res.render("signup", {
        error: "Erro inseperado, tente novamente!",
      });
    }
  },
  resetForm(req, res) {
    return res.render("reset-password", { token: req.query.token });
  },
  async reset(req, res) {
    const { user } = req;
    const { password, token } = req.body;
    try {
      const newPassword = await hash(password, 8);
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });
      return res.render("login", {
        success: "Senha atualizada com sucesso!",
      });
    } catch (err) {
      console.error(err);
      return res.render("reset-password", {
        data: req.body,
        token,
        error: "Erro inseperado, tente novamente!",
      });
    }
  },
};
