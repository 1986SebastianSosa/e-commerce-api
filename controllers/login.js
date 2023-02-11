const jwt = require("jsonwebtoken");
const { Admin } = require("../db/models/admin");
const { User } = require("../db/models/user");

// Display the specified resource.
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Some login information is missing" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ msg: "Credentials are not correct" });

    const comparePass = await User.comparePassword(password, user.password);

    if (!comparePass)
      return res.status(401).json({ msg: "Credentials are not correct" });

    let response = {
      ...user._doc,
      accessToken: makeToken(user.email, user._id, "user"),
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log("error in loginUser", error);
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Some login information is missing" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(401).json("Credentials are not correct");

    const comparePass = await Admin.comparePassword(password, admin.password);

    if (!comparePass)
      return res.status(401).json("Credentials are not correct");

    let response = {
      ...admin._doc,
      accessToken: makeToken(admin.email, admin._id, "admin"),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log("error in loginAdmin", error);
  }
};

const makeToken = (email, id, type) => {
  const secret =
    type === "admin"
      ? process.env.SECRET_JWT_ADMIN
      : process.env.SECRET_JWT_USER;
  return jwt.sign({ email, id, type }, secret);
};

module.exports = {
  loginUser,
  loginAdmin,
};
