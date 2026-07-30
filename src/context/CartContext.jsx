import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ Children }) {
  const [cartItems, setCartItems] = useState(() => {
    const localItems = localStorage.getItem("cartItems");
    return localItems ? JSON.parse(localItems) : [];
  });

  //
  useEffect(() => {
    cartItems && localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const produitTrouver = cartItems.find((item) => product._id === item._id);

    if (produitTrouver) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      );
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newProduct]);
    }
  };

  const removeFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const totalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalQuantity,
      }}
    >
      {Children}
    </CartContext.Provider>
  );
}
CartProvider.Context = CartContext;
