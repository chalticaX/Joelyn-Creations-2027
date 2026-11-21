import React from "react";
import { Link } from "react-router-dom";
import "./Market.css";

export const products = [
  {
    id: "black-unicorn",
    name: "The Black Unicorn",
    price: "10.99",
    image: "././dp1.jpg",
  },
  {
    id: "screaming-woman",
    name: "Screaming Woman",
    price: "10.99",
    image: "././dp2.jpg",
  },
  {
    id: "martini-glass",
    name: "Martini Glass",
    price: "10.99",
    image: "././dp3.jpg",
  },
  {
    id: "meditating-woman",
    name: "Meditating Woman",
    price: "10.99",
    image: "././dp4.jpg",
  },
   {
    id: "afro-poetry",
    name: "Afro Poetry",
    price: "10.99",
    image: "././ap1.jpg",
  },
   {
    id: "african-wildlife",
    name: "African Wildlife",
    price: "10.99",
    image: "././ap2.jpg",
  },
   {
    id: "panther",
    name: "Panther",
    price: "10.99",
    image: "././ap3.jpg",
  },
   {
    id: "glass-sunset",
    name: "Glass Sunset",
    price: "10.99",
    image: "././ap4.jpg",
  },
  {
    id: "cake",
    name: "Slice o Heaven",
    price: "10.99",
    image: "././pp1.jpg",
  },
   {
    id: "mural",
    name: "Mural",
    price: "10.99",
    image: "././pp2.jpg",
  },
];

function Market() {
  return (
    <main className="market-page" style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

      <section className="market-container" >
        
            
        <h2 className="market-heading">More like this
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
        </h2>
      

        <div className="market-products" >

          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="market-product"
              key={product.id}
            >

              <div className="market-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <p className="market-product-price">
                ${product.price}
              </p>

              <p className="market-product-name">
                {product.name}
              </p>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Market;