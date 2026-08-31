import { createContext, useEffect, useMemo, useState } from "react";

const readStoredCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch {
    return [];
  }
};

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product?._id) {
      console.error(
        "Ce produit ne possède pas un _id MongoDB valide :",
        product,
      );
      return;
    }

    const productId = product._id;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item?._id === productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          _id: productId,
          quantity: 1,
        },
      ];
    });
  };

  /*const addToCart = (product) => {
    const productId = product?._id ?? product?.id;

    if (!productId) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => (item?._id ?? item?.id) === productId,
      );

      if (existingItem) {
        return prevItems.map((item) => {
          const itemId = item?._id ?? item?.id;
          return itemId === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item;
        });
      }

      return [
        ...prevItems,
        { ...product, _id: productId, id: productId, quantity: 1 },
      ];
    });
  };*/

  const removeFromCart = (productId, removeEntireItem = false) => {
    setCartItems((prevItems) =>
      prevItems.flatMap((item) => {
        const itemId = item?._id ?? item?.id;

        if (itemId !== productId) return [item];
        if (removeEntireItem || (item.quantity || 1) <= 1) return [];

        return [{ ...item, quantity: (item.quantity || 1) - 1 }];
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /* const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );*/

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        if (!item) return total;

        return total + Number(item.price || 0) * Number(item.quantity || 1);
      }, 0),
    [cartItems],
  );

  /*const totalQuantity = useMemo(
    () =>
      cartItems.reduce((total, item) => total + Number(item.quantity || 1), 0),
    [cartItems],
  );*/
  const totalQuantity = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        if (!item) return total;

        return total + Number(item.quantity || 1);
      }, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalQuantity,
        totalItems: totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.Context = CartContext;
