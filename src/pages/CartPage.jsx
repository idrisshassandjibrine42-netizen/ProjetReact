import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, totalPrice } =
    useCart();

  return (
    <section className="lux-container py-10">
      <h1 className="font-display text-3xl text-ink">Contenu du panier</h1>

      {cartItems?.length === 0 ? (
        <p className="mt-4 text-graphite">Votre panier est vide.</p>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {cartItems.map((item) => {
              if (!item) return null;

              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <img
                    src={`https://backend-qv04.onrender.com/images/product/${item.imageKey}-1.png`}
                    alt={item.name}
                    className="h-32 w-32 rounded-lg border border-slate-200 object-cover shadow-md transition-transform duration-300 hover:scale-105"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-graphite">
                      {Number(item.price || 0).toLocaleString()} TND
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded border px-3 py-1 hover:bg-red-600 hover:text-white"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="rounded border px-3 py-1 hover:bg-green-600 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, true)}
                    className="rounded border border-red-300 px-3 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Supprimer
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <h2 className="font-display text-2xl text-ink">
              Total : {Number(totalPrice || 0).toLocaleString()} TND
            </h2>
            <button
              type="button"
              onClick={clearCart}
              className="rounded border border-slate-300 px-4 py-2 hover:bg-red-600 hover:text-white  "
            >
              Vider le panier
            </button>
            <Link
              to="/checkout"
              className="rounded bg-gold px-4 py-2 text-white hover:bg-yellow-700 transition"
            >
              Passer à la commande
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
