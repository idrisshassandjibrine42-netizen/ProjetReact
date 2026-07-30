import Product from "../models/Products.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const Product = await Product.findById(req.params.id);

  if (!Product) {
    res.status(404).json({ message: "Produit non trouvé" });
  }

  res.json(Product);
};

const createProduct = async (req, res) => {
  const Product = await Product.create(req.body);
  res.status(201).json(Product);
};

const updateProduct = async (req, res) => {
  const Product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!Product) {
    return res.status(404).json({ message: "produit introvable" });
  }

  res.status(200).json(Product);

  res.json(Product);
};

const deleteProduct = async (req, res) => {
  const Product = await Product.findByIdAndDelete(req.params.id);

  if (!Product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }

  res.status(200).json({ message: "Produit supprimé avec succès" });
};
const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ featured: true });
  res.json(products);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};
