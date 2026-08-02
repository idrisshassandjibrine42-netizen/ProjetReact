const IMAGES_BASE_URL = "http://localhost:5001/images";

const normalizeImageKey = (value) => {
  if (!value) return "";

  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const getProductImageUrl = (product, variant = 1) => {
  if (!product) return null;

  const imageKey = product.imageKey || product.slug || product.name;
  if (!imageKey) return null;

  const normalizedKey = normalizeImageKey(imageKey);
  if (!normalizedKey) return null;

  if (
    /^https?:\/\//.test(String(imageKey)) ||
    String(imageKey).startsWith("/")
  ) {
    return String(imageKey);
  }

  return `${IMAGES_BASE_URL}/product/${normalizedKey.replace(/\.png$/i, "")}-${variant}.png`;
};
