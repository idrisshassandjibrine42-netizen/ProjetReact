import { useCart } from "../hooks/useCart";
import { getProductImageUrl } from "../utils/productImage";

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
              const itemId = item?._id ?? item?.id;
              const imageUrl = getProductImageUrl(item, 1) || item.image || "";

              return (
                <div
                  key={itemId}
                  className="flex flex-wrap items-center gap-4 border border-slate-200 bg-white p-4 shadow-sm"
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt={item.name} width={120} />
                  ) : null}

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
                      onClick={() => removeFromCart(itemId)}
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
                    onClick={() => removeFromCart(itemId, true)}
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
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
