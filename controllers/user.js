const { User } = require("../db/models/user");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
const index = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: "desc" });
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Display the specified resource.
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate({
      path: "ordersHistory",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "products",
        populate: {
          path: "productId",
          model: "Product",
        },
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

// Store a newly created resource in storage.
const store = async (req, res) => {
  console.log("register");
  let { firstName, lastName, email, password, address, phone } = req.body;

  if (!firstName || !lastName || !address || !password || !email || !phone) {
    return res
      .status(400)
      .json({ msg: "Some register information is missing" });
  }

  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    return res
      .status(409)
      .json({ msg: "There's already an account with that email address" });
  }

  const hashedPassword = await User.hashPassword(password);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    let response = {
      ...user._doc,
      accessToken: makeToken(user.email, user._id, "user"),
    };
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msj: "Something went wrong. Please try again", error });
  }
};

// Update the specified resource in storage.
const update = async (req, res) => {
  console.log(req.body.password);
  if (req.body.password) {
    req.body.password = await User.hashPassword(req.body.password);
  }
  const changes = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, changes);
  console.log(updatedUser);
};

// Remove the specified resource from storage.
const destroy = async (req, res) => {};

const makeToken = (email, id, type) => {
  const secret =
    type === "admin"
      ? process.env.SECRET_JWT_ADMIN
      : process.env.SECRET_JWT_USER;
  return jwt.sign({ email, id, type }, secret);
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
