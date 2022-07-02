const isAuthenticated = require("./middlewares/isAuthenticated");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const tokensRoutes = require("./routes/tokensRoutes");
const userRoutes = require("./routes/userRoutes");
const initialSetup = require("./seeders/initialSetup");

module.exports = (app) => {
  app.use("/admin", isAuthenticated, adminRoutes);
  app.use("/user", userRoutes);
  app.use("/product", productRoutes);
  app.use("/category", categoryRoutes);
  app.use("/tokens", tokensRoutes);
  app.use("/login", loginRoutes);
  app.use("/order", orderRoutes);
  app.use("/resetDataBase", initialSetup);
};
