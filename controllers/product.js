const { Product } = require("../db/models/product");

// Display a listing of the resource.
const index = async (req, res) => {
  try {
    const products = await Product.find()
      .gt("stock", 0)
      .sort({ createdAt: "desc" })
      .limit(20);
    console.log("pego con tuti");
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

// Display the specified resource.
const show = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

// Store a newly created resource in storage.
const store = async (req, res) => {
  const { name, description, imgUrl, price, stock, categoryId, createdBy } =
    req.body;
  const slug = slugName(name);
  try {
    const product = await Product.create({
      name,
      description,
      imgUrl,
      price,
      stock,
      categoryId,
      createdBy,
      starred: false,
      slug,
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

// Update the specified resource in storage.
const update = async (req, res) => {};

// Remove the specified resource from storage.
const destroy = async (req, res) => {};

const slugName = (productName) => {
  console.log(productName);
  const slugString = productName.replace(" ", "-").toLowerCase();
  return slugString;
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
