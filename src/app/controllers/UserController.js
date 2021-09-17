/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
const User = require("../models/User");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.render("admin/users", { users });
    } catch (err) {
      console.error(err);
      return res.render("/signup", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async create(req, res) {
    return res.render("admin/createUser");
  },
  async post(req, res) {
    try {
      let { name, email, password, phone, city, is_admin } = req.body;
      password = await hash(password, 8);
      is_admin = !!is_admin;
      phone = phone.replace(/\D/g, "");
      const userId = await User.create({
        name,
        email,
        phone,
        password,
        city_id: city,
        is_admin,
      });
      if (!req.session || (req.session && !req.session.is_admin)) {
        req.session.userId = userId;
        req.session.username = name;
        req.session.useremail = email;
      }
      await mailer.sendMail({
        to: req.body.email,
        from: process.env.APP_MAIL,
        subjet: "Cadastro feito com sucesso",
        html: `<h2>Acesse sua conta agora</h2>
                <p><a href="${req.protocol}://${req.headers.host}/login"> Acessar minha conta</a></p>`,
      });

      req.session.save((error) => {
        if (error) throw error;
        if (req.session && req.session.is_admin) {
          return res.redirect(`/users`);
        }
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      return res.render("signup", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async editForm(req, res) {
    const user = await User.find(req.params.id);
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
      return res.render("edit", {
        user,
        error: "Usuário não encontrado!",
      });
    }
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
      let { name, email, phone, id, is_admin } = req.body;
      is_admin = !!is_admin;
      phone = phone.replace(/\D/g, ""); // Get only digits/numbers
      await User.update(id, { name, email, phone, is_admin });
      const user = await User.find(id);
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
  async changePassword(req, res) {
    try {
      const { id, newPassword } = req.body;
      const password = await hash(newPassword, 8);
      await User.update(id, { password });
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
        success: "Senha alterada!",
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
      if (!req.session.is_admin || id == req.session.userId) {
        req.session.destroy();
        res.clearCookie("sid");
        return res.redirect("/");
      } else {
        const users = await User.findAll();
        return res.render("admin/users", {
          users,
          success: "Usuário removido!",
        });
      }
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
