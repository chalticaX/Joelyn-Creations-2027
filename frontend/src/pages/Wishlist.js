import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import "./Wishlist.css";

function getWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem("joelyn_wishlist") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Wishlist() {
  const [wishlist, setWishlist] = useState(getWishlist);
  const navigate = useNavigate();

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);

    setWishlist(updatedWishlist);
    localStorage.setItem("joelyn_wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("joelyn_cart") || "[]");
      const cart = Array.isArray(savedCart) ? savedCart : [];

      const existingProduct = cart.find((item) => item.id === product.id);

      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            ...product,
            price: Number(product.price),
            quantity: 1,
            size: null,
          },
        ];
      }

      localStorage.setItem("joelyn_cart", JSON.stringify(updatedCart));
      navigate("/checkout");
    } catch {
      alert("Unable to add this artwork to your cart.");
    }
  };

  return (
    <main className="wishlist-page" style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

      <div className="wishlist-top-bar">
        <Link to="/" className="wishlist-back">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

      
        <Link to="/checkout" className="wishlist-cart-link">
          <ShoppingCart size={23} />
          Cart
        </Link>
      </div>

      <section className="wishlist-container">

        <div className="wishlist-heading">
          <Heart size={35} fill="currentColor" />
          <h1>My Wishlist</h1>
          <p>Your favourite pieces, all in one place.</p>
        </div>

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">
            <Heart size={65} strokeWidth={1.2} />

            <h2>Your wishlist is empty</h2>

            <p>
              You haven't saved any artwork yet.
              Explore our collection and find something you love.
            </p>

            <Link to="/market" className="wishlist-explore-button">
              Explore Market
            </Link>
          </div>

        ) : (

          <>
            <div className="wishlist-count">
              {wishlist.length} {wishlist.length === 1 ? "Artwork" : "Artworks"} Saved
            </div>

            <div className="wishlist-grid">

              {wishlist.map((product) => (

                <article className="wishlist-card" key={product.id}>

                  <Link
                    to={`/product/${product.id}`}
                    className="wishlist-image"
                  >
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </Link>

                  <div className="wishlist-card-content">

                    <div className="wishlist-product-info">
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                      <span>${Number(product.price).toFixed(2)}</span>
                    </div>

                    <div className="wishlist-card-actions">

                      <button
                        className="wishlist-add-button"
                        onClick={() => addToCart(product)}
                        type="button"
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>

                      <button
                        className="wishlist-remove-button"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        type="button"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </>

        )}

        <div className="wishlist-bottom">
          <Link to="/market">
            Continue Exploring
          </Link>
        </div>

      </section>

      <footer className="wishlist-footer">
        © {new Date().getFullYear()} JOELYN CREATIONS. All rights reserved.
      </footer>

    </main>
  );
}

export default Wishlist;