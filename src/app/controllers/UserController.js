/* eslint-disable camelcase */
const User = require("../models/User");
const { hash } = require("bcryptjs");

module.exports = {
  index() {},
  createUser(req, res) {
    return res.render("tem uma outra rota aqui dentro");
  },
  async post(req, res) {
    try {
      let { name, email, password, phone, city, is_admin } = req.body;
      password = await hash(password, 8);
      is_admin = !!is_admin;
      phone = phone.replace(/\D/g, ""); // Get only digits/numbers
      const userId = await User.create({
        name,
        email,
        phone,
        password,
        city_id: city,
        is_admin,
      });

      req.session.userId =
        req.user && req.user.is_admin ? req.session.userId : userId;

      // await mailer.sendMail({
      //   to: req.body.email,
      //   from: process.env, //tem mais alguma rota aqui?
      //   subjet: "Cadastro feito com sucesso",
      //   html: `<h2>Acesse sua conta agora</h2>
      //           <p><a href="Aqui vai um link http"> Acessar minha conta</a></p>`,
      // });

      req.session.save((error) => {
        if (error) throw error;
        if (req.user && req.user.is_admin) {
          return res.redirect(`/`);
        }
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      return res.render("/signup", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async editForm(req, res) {
    const user = await User.find(req.session.userId);
    if (user.phone.length > 13) {
      user.phone = user.phone.replace(
        /(\d{3})(\d{2})(\d{5})(\d)/,
        "+$1($2)$3-$4"
      ); // '+999(99)99999-9999'
    } else {
      user.phone = user.phone.replace(
        /(\d{2})(\d{2})(\d{5})(\d)/,
        "+$1($2)$3-$4"
      ); // '+99(99)99999-9999'
    }
    return res.render("edit", { user });
  },
  async put(req, res) {
    try {
      const { name, email, phone, id } = req.body;
      await User.update(id, { name, email, phone });
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
      return res.render("edit", {
        user,
        success: "Usuário atualizado!",
      });
    } catch (err) {
      console.error(err);
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
      return res.render("edit", {
        user,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      await User.delete(id);
      req.session.destroy();
      res.clearCookie("sid");
      return res.redirect("/");
    } catch (err) {
      console.error(err);
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
      return res.render("edit", {
        user,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
};
