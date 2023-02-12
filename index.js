require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const isAuthenticated = require("./middlewares/isAuthenticated");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const tokensRoutes = require("./routes/tokensRoutes");
const userRoutes = require("./routes/userRoutes");
const initialSetup = require("./seeders/initialSetup");
const usage = require("./usage.json");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.APP_PORT || 3022;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes(app);
app.get("/", (req, res) => res.json(usage));
app.use("/admin", isAuthenticated, adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/tokens", tokensRoutes);
app.use("/login", loginRoutes);
app.use("/order", orderRoutes);
app.post("/resetDataBase", initialSetup);

require("./db/connection")();

app.listen(PORT, () => console.log(`Listening though port: ${PORT}`));
