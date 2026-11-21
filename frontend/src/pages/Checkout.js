import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./Checkout.css";

const initialCart = JSON.parse(
  localStorage.getItem("joelyn_cart") || "[]"
);
const migratedCart = initialCart.map((item) => ({
  ...item,
  cartItemId: item.cartItemId || crypto.randomUUID(),
}));

if (JSON.stringify(initialCart) !== JSON.stringify(migratedCart)) {
  localStorage.setItem("joelyn_cart", JSON.stringify(migratedCart));
}

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(migratedCart);
  const [step, setStep] = useState(1);

  const [shipping, setShipping] = useState({
    country: "Kenya",
    email: "",
    address: "",
    name: "",
    mobile: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );
    const discount = promoApplied 
  ? Number ((subtotal * 0.1).toFixed(2))
  :0;

  const shippingCost = cart.length > 0 ? 2 : 0;
  const tax = cart.length > 0 ? 1 : 0;

  const total = Math.max(
    0,
    subtotal + shippingCost + tax - discount
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(
      "joelyn_cart",
      JSON.stringify(updatedCart)
    );
  };

  const updateQuantity = (cartItemId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId
        ? { ...item, quantity: Number(quantity) }
        : item
    );

    updateCart(updatedCart);
  };

  const updateSize = (cartItemId, size) => {
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId
        ? { ...item, size }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (cartItemId) => {
    const updatedCart = cart.filter(
      (item) => item.cartItemId !== cartItemId
    );

    updateCart(updatedCart);
  };

  const addToWishlist = (item) => {
  let wishlist = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem("joelyn_wishlist") || "[]"
    );

    wishlist = Array.isArray(saved) ? saved : [];
  } catch {
    wishlist = [];
  }

  const alreadySaved = wishlist.some(
    (savedItem) => savedItem.id === item.id
  );

  if (!alreadySaved) {
    wishlist.push({
      ...item,
      price: Number(item.price),
    });

    localStorage.setItem(
      "joelyn_wishlist",
      JSON.stringify(wishlist)
    );
  }
};

const saveForLater = (item) => {
  addToWishlist(item);
  removeItem(item.cartItemId);
};

const handleWishlist = (item) => {
  addToWishlist(item);
};

const editItem = (item) => {
  navigate(`/product/${item.id}`);
};

  const updateShipping = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "JOELYN10") {
      setPromoApplied(true);
      setPromoMessage("Promo code applied successfully!");
    } else {
      setPromoApplied(false);
      setPromoMessage("Invalid promo code.");
    }
  };

  const nextStep = () => {
    if (cart.length === 0) return;

    setStep((current) => Math.min(current + 1, 4));
    window.scrollTo(0, 0);
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo(0, 0);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    alert(
      `You selected ${
        paymentMethod === "mpesa"
          ? "M-Pesa"
          : paymentMethod === "card"
          ? "Card"
          : paymentMethod === "apple"
          ? "Apple Pay"
          : "Google Pay"
      }. Secure payment integration will be connected next.`
    );
  };

  const stepTitles = [
    "Your Cart",
    "Checkout",
    "Checkout",
    "Payment Information",
  ];

  return (
    <main className="checkout-page" style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

      <section className="checkout-container">

        <header className="checkout-header">
          <div className="checkout-title">
            <span className="checkout-indicator"></span>
            <span>{stepTitles[step - 1]}</span>
          </div>
          <div className="page-navigation">
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
        </header>

        <div className="checkout-content">

          {step === 1 && (
            <div className="cart-step">

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <h2>Your cart is empty</h2>
                  <p>
                    Discover artwork from Joelyn Creations.
                  </p>

                  <button
                    onClick={() => navigate("/market")}
                  >
                    Explore Market
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="cart-item" key={item.cartItemId || item.id}>

                      <div className="cart-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      <div className="cart-item-details">

                        <h3>{item.name}</h3>

                        <p className="cart-item-price">
                          ${Number(item.price).toFixed(2)}
                        </p>

                        <p className="stock-status">
                          In Stock
                        </p>

                        <div className="cart-options">

                          <label>
                            Quantity

                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.cartItemId,
                                  e.target.value
                                )
                              }
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (number) => (
                                  <option
                                    key={number}
                                    value={number}
                                  >
                                    {number}
                                  </option>
                                )
                              )}
                            </select>
                          </label>

                          {item.category !== "Digital Art" && (
                            <label>
                              Size

                              <select
                                value={item.size || "8 x 10"}
                                onChange={(e) =>
                                  updateSize(
                                    item.cartItemId,
                                    e.target.value
                                  )
                                }
                              >
                                <option>8 x 10</option>
                                <option>11 x 14</option>
                                <option>16 x 20</option>
                                <option>20 x 24</option>
                              </select>
                            </label>
                          )}

                        </div>

                        <div className="cart-item-actions">

                          <button type="button" onClick={() => editItem(item)}>
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId)}
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>

                          <button type="button" onClick={() => saveForLater(item)}>
                            Save for Later
                          </button>

                          <button type="button" onClick={() => handleWishlist(item)}>
                            <Heart size={13} />
                            Wishlist
                          </button>

                        </div>

                      </div>

                      <div className="cart-item-total">
                        <span>Total</span>

                        <strong>
                          $
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </strong>
                      </div>

                    </div>
                  ))}

                  <div className="cart-summary">

                    <strong>
                      {itemCount} {itemCount === 1 ? "Item" : "Items"}
                    </strong>

                    <strong>
                      ${subtotal.toFixed(2)}
                    </strong>

                  </div>

                  <div className="checkout-step-actions">

                    <button
                      type="button"
                      onClick={() => navigate("/market")}
                      className="back-button"
                    >
                      Continue Shopping
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="checkout-button"
                    >
                      Proceed to Checkout
                    </button>

                  </div>

                </>
              )}

            </div>
          )}

          {step === 2 && (
            <form
              className="shipping-step"
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >

              <div className="shipping-field">
                <label>SHIPPING COUNTRY</label>

                <select
                  name="country"
                  value={shipping.country}
                  onChange={updateShipping}
                >
                  <option>Kenya</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>South Africa</option>
                </select>
              </div>

              <div className="shipping-field">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  name="email"
                  value={shipping.email}
                  onChange={updateShipping}
                  required
                />
              </div>

              <div className="shipping-field">
                <label>DELIVERY ADDRESS</label>

                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={updateShipping}
                  required
                />
              </div>

              <div className="shipping-field">

                <label>YOUR INFORMATION</label>

                <div className="shipping-personal">

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={shipping.name}
                    onChange={updateShipping}
                    required
                  />

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={shipping.mobile}
                    onChange={updateShipping}
                    required
                  />

                </div>

              </div>

              <div className="checkout-step-actions">

                <button
                  type="button"
                  onClick={previousStep}
                  className="back-button"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="checkout-button"
                >
                  Continue
                </button>

              </div>

            </form>
          )}

          {step === 3 && (
            <div className="summary-step">

              <div className="promo-section">

                <label>Enter Promo Code</label>

                <div className="promo-input">

                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                      setPromoMessage("");
                    } }
                  />

                  <button
                    type="button"
                    onClick={applyPromo}
                  >
                    Submit
                  </button>

                </div>

                {promoMessage && (
                  <p className="promo-message">
                    {promoMessage}
                  </p>
                )}

              </div>

              <div className="order-totals">

                <div>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <span>Shipping cost</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>

                <div>
                  <span>Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>

                <div>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="order-grand-total">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>

              </div>

              <div className="checkout-step-actions">

                <button
                  type="button"
                  onClick={previousStep}
                  className="back-button"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="checkout-button"
                >
                  Proceed to Payment
                </button>

              </div>

            </div>
          )}

          {step === 4 && (
            <form
              className="payment-step"
              onSubmit={handlePayment}
            >

              <h3>Payment method</h3>

              <p className="payment-description">
                Select your preferred payment method.
                Payment processing will be securely handled
                through an integrated payment provider.
              </p>

              <div className="payment-methods">

                <button
                  type="button"
                  className={
                    paymentMethod === "card" ? "selected" : ""
                  }
                  onClick={() => setPaymentMethod("card")}
                >
                  💳
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "mpesa" ? "selected" : ""
                  }
                  onClick={() => setPaymentMethod("mpesa")}
                >
                  <span>M-Pesa</span>
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "apple" ? "selected" : ""
                  }
                  onClick={() => setPaymentMethod("apple")}
                >
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "google" ? "selected" : ""
                  }
                  onClick={() => setPaymentMethod("google")}
                >
                  <span>Google Pay</span>
                </button>

              </div>

              <div className="payment-provider-notice">
                <h4>
                  {paymentMethod === "mpesa"
                    ? "M-Pesa"
                    : paymentMethod === "card"
                    ? "Card Payment"
                    : paymentMethod === "apple"
                    ? "Apple Pay"
                    : "Google Pay"}
                </h4>

                <p>
                  Your payment will be processed through
                  a secure payment provider. No card
                  credentials or payment PINs are collected
                  or stored by Joelyn Creations.
                </p>
              </div>

              <div className="payment-total">
                <strong>
                  Total: ${total.toFixed(2)}
                </strong>
              </div>

              <div className="checkout-step-actions">

                <button
                  type="button"
                  onClick={previousStep}
                  className="back-button"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="checkout-button"
                >
                  Continue to Secure Payment
                </button>

              </div>

            </form>
          )}

        </div>

      </section>

    </main>
  );
}

export default Checkout;