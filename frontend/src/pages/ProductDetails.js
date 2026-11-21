import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import "./ProductDetails.css";

const productDetails = {
  "black-unicorn": {
    id: "black-unicorn",
    name: "The Black Unicorn",
    category: "Digital Art",
    price: "10.99",
    image: "/dp1.jpg",
    description:
      "This unique digital artwork features the map of Africa transformed into a powerful visual story symbolizing connection, life, and flow. It celebrates identity and culture. Rendered in rich earthy tones with contrasting ocean blues, this artwork blends abstract expression with cultural storytelling, making it a bold and meaningful addition to any space.",
  },

  "screaming-woman": {
    id: "screaming-woman",
    name: "Screaming Woman",
    category: "Digital Art",
    price: "10.99",
    image: "/dp2.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },

  "martini-glass": {
    id: "martini-glass",
    name: "Martini Glass",
    category: "Digital Art",
    price: "10.99",
    image: "/dp3.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
  "meditating-woman": {
    id: "meditating-woman",
    name: "Meditating Woman",
    category: "Digital Art",
    price: "10.99",
    image: "/dp4.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
   "afro-poetry": {
    id: "afro-poetry",
    name: "Afro Poetry",
    category: "Art Prints",
    price: "10.99",
    image: "/ap1.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
    "african-wildlife": {
    id: "african-wildlife",
    name: "African Wildlife",
    category: "Art Prints",
    price: "10.99",
    image: "/ap2.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
    "panther": {
    id: "panther",
    name: "Panther",
    category: "Art Prints",
    price: "10.99",
    image: "/ap3.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
    "glass-sunset": {
    id: "glass-sunset",
    name: "Glass-sunset",
    category: "Art Prints",
    price: "10.99",
    image: "/ap4.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
   "cake": {
    id: "cake",
    name: "Slice of Heaven",
    category: "paintings",
    price: "10.99",
    image: "/pp1.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
   "mural": {
    id: "mural",
    name: "mural",
    category: "paintings",
    price: "10.99",
    image: "/pp2.jpg",
    description:
      "Discover this expressive digital artwork from Joelyn Creations.",
  },
};

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productDetails[productId];

const [isFavourite, setIsFavourite] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("joelyn_wishlist") || "[]");
    return Array.isArray(saved) && saved.some((item) => item.id === product?.id);
  } catch {
    return false;
  }
});
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Artwork not found</h2>
        <Link to="/market">Return to Market</Link>
      </main>
    );
  }

const handleAddToCart = () => {
  let existingCart = [];

  try {
    const savedCart = JSON.parse(
      localStorage.getItem("joelyn_cart") || "[]"
    );

    existingCart = Array.isArray(savedCart) ? savedCart : [];
  } catch {
    existingCart = [];
  }

  const existingProduct = existingCart.find(
    (item) => item.id === product.id && item.size === null
  );

  let updatedCart;

  if (existingProduct) {
    updatedCart = existingCart.map((item) =>
      item.cartItemId === existingProduct.cartItemId
        ? {
            ...item,
            quantity: Number(item.quantity) + 1,
          }
        : item
    );
  } else {
    updatedCart = [
      ...existingCart,
      {
        ...product,
        cartItemId: `${productId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        price: Number(product.price),
        quantity: 1,
        size: null,
      },
    ];
  }

  localStorage.setItem("joelyn_cart", JSON.stringify(updatedCart));

  setAddedToCart(true);

  setTimeout(() => {
    setAddedToCart(false);
  }, 2500);
};

  const toggleWishlist = () => {
  const saved = JSON.parse(localStorage.getItem("joelyn_wishlist") || "[]");
  const currentWishlist = Array.isArray(saved) ? saved : [];

  const alreadySaved = currentWishlist.some(
    (item) => item.id === product.id
  );

  const updatedWishlist = alreadySaved
    ? currentWishlist.filter((item) => item.id !== product.id)
    : [
        ...currentWishlist,
        {
          ...product,
          price: Number(product.price),
        },
      ];

  localStorage.setItem("joelyn_wishlist", JSON.stringify(updatedWishlist));
  setIsFavourite(!alreadySaved);
};

  return (
    <main className="product-details-page" style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

      <section className="product-details-container">
          <div className="flex w-full justify-end mb-8 gap-8">
           <button
    type="button"
    className="page-back-button"
    onClick={() => window.history.back()}
  >
    ← Back
  </button>

  <Link to="/" className="page-home-button">
    ⌂ Home
  </Link>
        </div>

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-content">

          <div className="product-information">

            <h1>{product.name}</h1>

            <p className="product-category">
              {product.category}
            </p>

            <h2 className="product-price">
              ${product.price}
            </h2>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-actions">

              <button
                className={`product-favourite ${
                  isFavourite ? "active" : ""
                }`}
                onClick={toggleWishlist}
                aria-label="Toggle favourite"
              >
                <Heart
                  size={30}
                  fill={isFavourite ? "currentColor" : "none"}
                />
              </button>

              <button
                className="add-to-cart-button"
                type="button"
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  "Added to Cart ✓"
                ) : (
                  <>
                    <ShoppingCart size={17} />
                    Add to Cart
                  </>
                )}
              </button>

            </div>

            {addedToCart && (
              <div className="cart-confirmation">
                Artwork successfully added to your cart.

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                >
                  View Cart
                </button>
              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;