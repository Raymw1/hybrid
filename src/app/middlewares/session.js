const User = require("../models/User");
const { getSchedules } = require("../services/scheduleServices");

async function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  const id = req.session.userId;
  const user = await User.find(id);
  if (!user)
    return res.render("login", {
      error: "Usuário não cadastrado!",
    });
  req.user = user;
  next();
}

async function onlyAdmins(req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  const id = req.session.userId;
  const user = await User.find(id);
  if (!user)
    return res.render("login", {
      error: "Usuário não cadastrado!",
    });
  if (!user.is_admin) {
    const { name } = await User.find(req.session.userId);
    const schedules = await getSchedules(req.session.userId);
    return res.render("index", { name, schedules, error: "Permissão negada!" });
  }
  req.user = user;
  next();
}

function isLogged(req, res, next) {
  if (req.session.userId) return res.redirect("/");
  next();
}

async function checkIfIsAdminToCreate(req, res, next) {
  const id = req.session.userId;
  if (id) {
    const user = await User.find(id);
    if (!user.is_admin) {
      return res.render("edit", {
        user: user,
        error: "Você não tem permissão para entrar nesta área!",
      });
    }
    req.user = user;
  }
  next();
}

module.exports = {
  onlyUsers,
  isLogged,
  onlyAdmins,
  checkIfIsAdminToCreate,
};
