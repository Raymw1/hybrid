/* eslint-disable camelcase */
const User = require("../models/User");
const { hash } = require("bcryptjs");

module.exports = {
  index() {},
  async listenerCount(req, res) {
    try {
      const users = await User.findAll();
      return res.render("signup", { users });
    } catch (error) {
      console.error(error);
      return res.render("index", {
        user: req.user,
        error: "Erro", //  erro ao cadastrar?
      });
    }
  },
  createUser(req, res) {
    return res.render("tem uma outra rota aqui dentro");
  },
  async post(req, res) {
    try {
      let { name, email, password, phone, city, is_admin } = req.body;
      password = await hash(password, 8);
      is_admin = !!is_admin;
      const userId = await User.create({
        name,
        email,
        phone,
        password,
        city_id: city,
        is_admin,
      });

      req.session.userId = req.user?.is_admin ? req.session.userId : userId;

      // await mailer.sendMail({
      //   to: req.body.email,
      //   from: process.env, //tem mais alguma rota aqui?
      //   subjet: "Cadastro feito com sucesso",
      //   html: `<h2>Acesse sua conta agora</h2>
      //           <p><a href="Aqui vai um link http"> Acessar minha conta</a></p>`,
      // });

      req.session.save((error) => {
        if (error) throw error;
        if (req.user?.is_admin) {
          return res.redirect(`/index`);
        }
        return res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      return res.render("rota de criação de usuário", {
        error: "Sorry, no cookies for you",
      });
    }
  },
};
