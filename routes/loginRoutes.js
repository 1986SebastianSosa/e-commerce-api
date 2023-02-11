const loginRoutes = require("express").Router();
// const methodOverride = require("method-override");
const { loginUser, loginAdmin } = require("../controllers/login");

loginRoutes.post("/user", loginUser);
loginRoutes.post("/admin", loginAdmin);

module.exports = loginRoutes;
