const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { id } = req.params;
  try {
    const validate = jwt.verify(
      req.query.accessToken,
      process.env.SECRET_JWT_USER,
      (err, decoded) => {
        console.log(decoded);
        return decoded.id === id;
      }
    );
    console.log(validate);
    if (validate) return next();
  } catch (error) {
    console.log("error in middleware isAuth", error);
  }
  res.status(401).json("bad credential");
};