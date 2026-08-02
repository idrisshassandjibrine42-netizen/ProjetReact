import Product from "../models/Products.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) {
    return res.status(404).json({ message: "produit introvable" });
  }

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }

  return res.status(200).json({ message: "Produit supprimé avec succès" });
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
