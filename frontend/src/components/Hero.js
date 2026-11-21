import React, { useState, useEffect } from "react";
import { Menu, Heart, ShoppingCart, X, ChevronLeft,ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const artPrints = [
  {
    id: "afro-poetry",
    name: "Afro Poetry",
    image: "/ap1.jpg",
  },
  {
    id: "african-wildlife",
    name: "African Wildlife",
    image: "/ap2.jpg",
  },
  {
    id: "panther",
    name: "Panther",
    image: "/ap3.jpg",
  },
  {
    id: "glass-sunset",
    name: "Glass Sunset",
    image: "/ap4.jpg",
  },
];

const digitalArtworks = [
  {
    id: "black-unicorn",
    name: "The Black Unicorn",
    image: "/dp1.jpg",
  },
  {
    id: "screaming-woman",
    name: "Screaming Woman",
    image: "/dp2.jpg",
  },
  {
    id: "martini-glass",
    name: "Martini Glass",
    image: "/dp3.jpg",
  },
  {
    id: "meditating-woman",
    name: "Meditating Woman",
    image: "/dp4.jpg",
  },
];

const paintings = [
  {
    id: "cake",
    name: "Slice of heaven",
    image: "/pp1.jpg",
  },
  {
    id: "mural",
    name: "Mural",
    image: "/pp2.jpg",
  },
];

function Hero() {

  useEffect(() => {
  const sections = document.querySelectorAll(".scroll-reveal");

  document.documentElement.classList.add("scroll-reveal-enabled");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      section.classList.add("is-visible");
    });

    return () => {
      document.documentElement.classList.remove("scroll-reveal-enabled");
    };
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => {
    observer.disconnect();
    document.documentElement.classList.remove("scroll-reveal-enabled");
  };
}, []);
  const [menuOpen, setMenuOpen] = useState(false);

  const [activePaintingIndex, setActivePaintingIndex ] = useState(0);

  const nextPainting =() => {setActivePaintingIndex((current) => (current + 1) % paintings.length); };

  const previousPainting =() => { setActivePaintingIndex((current) => (current - 1 + paintings.length) % paintings.length); };

  const closeMenu = () => setMenuOpen(false);

  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setContactSubmitted(true);
    form.reset();
  };

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Art Prints", href: "#art-prints" },
    { name: "Digital Art Downloads", href: "#digital-art-downloads" },
    { name: "Paintings", href: "#paintings" },
    { name: "Contact Us", href: "#contact-us" },
  ];

  return (
    <div className="hero-page" id="home">

      <div className="top-gradient-bar"  style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
        <div className="top-icon">
          <img src="/ic1.png" alt="Joelyn Creations logo" />
        </div>
      </div>

      <main className="hero-container">

        <section className="brand-section">

          <div className="brand-controls">

            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              {menuOpen ? (
                <X size={34} strokeWidth={1.5} />
              ) : (
                <Menu size={34} strokeWidth={1.5} />
              )}
            </button>

            <div className="brand-actions">

              <Link to="/wishlist" aria-label="View wishlist">
                <Heart size={30} fill="currentColor" />
              </Link>

              <Link to="/checkout" aria-label="View shopping cart">
                <ShoppingCart size={30} strokeWidth={1.5} />
              </Link>

            </div>

            {menuOpen && (
              <nav className="brand-menu-panel" aria-label="Main navigation">

                {navigationItems.map((item) => (
                  <a
                    href={item.href}
                    key={item.name}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </a>
                ))}

                <div className="brand-menu-divider"></div>

                <Link to="/market" onClick={closeMenu}>
                  Explore Market
                </Link>

                <Link to="/wishlist" onClick={closeMenu}>
                  Wishlist
                </Link>

                <Link to="/checkout" onClick={closeMenu}>
                  Shopping Cart
                </Link>

              </nav>
            )}

          </div>

          <div className="brand-identity">

            <h1>
              Joelyn
              <br />
              Creations
            </h1>

            <h2>DIGITAL ART</h2>
          

            <div className="brand-divider"></div>

            <p>PRINTS & DIGITAL DOWNLOADS</p>

            <Link to="/market" 
            className="brand-market-button">
            Explore Our Market
            </Link>

          </div>
          
        </section>

        <aside className="hero-sidebar">

          <nav>
            {navigationItems.slice(1).map((item) => (
              <a href={item.href} key={item.name}>
                <span className="sidebar-indicator"></span>
                {item.name}
              </a>
            ))}
          </nav>

        </aside>

        <section className="about-section scroll-reveal" id="about">

          <div className="about-sidebar">
            <a href="#about">
              <span className="sidebar-indicator"></span>
              About Us
            </a>
          </div>

          <div className="about-artwork"  style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

            <div className="about-content">

              <div className="about-card">

                <p>
                  We are two Kenyan artists who share a common vision.
                  Based in Nairobi and California, we create artwork
                  that is rooted in culture and driven by creativity.
                  We explore femininity, identity, imagination,
                  emotional honesty and intensity through delicate
                  bits and masterpieces. We create the kind of art
                  that happens when curiosity and a little bit of
                  chaos and beauty collide.
                </p>

                <p>
                  Our mediums include acrylics and oils for paintings,
                  while our digital art downloads feature digital
                  paintings and illustrations. Our aim is to create
                  unique, expressive artwork accessible to anyone
                  looking to bring creativity and personality into
                  their spaces.
                </p>

              </div>

              <Link to="/market" className="explore-market">
                <span className="sidebar-indicator"></span>
                Explore our Art work
              </Link>

            </div>

          </div>

        </section>

        <section className="art-prints-section scroll-reveal" id="art-prints">

          <div className="art-prints-sidebar">
            <a href="#art-prints">
              <span className="sidebar-indicator"></span>
              Art Prints
            </a>
          </div>

          <div className="art-prints-artwork" style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

            <div className="art-prints-grid">

              {artPrints.map((art) => (
                <Link
                  to={`/product/${art.id}`}
                  className="art-print-card"
                  key={art.id}
                  aria-label={`View ${art.name}`}
                >
                  <div className="art-print-image">
                    <img src={art.image} alt={art.name} loading="lazy" />
                  </div>
                </Link>
              ))}

            </div>

          </div>

        </section>

        <section className="digital-downloads-section scroll-reveal" id="digital-art-downloads">

          <div className="digital-downloads-sidebar">
            <a href="#digital-art-downloads">
              <span className="sidebar-indicator"></span>
              Digital Art Downloads
            </a>
          </div>

          <div className="digital-downloads-artwork"  style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }} >

            <div className="digital-downloads-grid">

              {digitalArtworks.map((art) => (
                <Link
                  to={`/product/${art.id}`}
                  className="digital-download-card"
                  key={art.id}
                  aria-label={`View ${art.name}`}
                >
                  <div className="digital-download-image">
                    <img src={art.image} alt={art.name} loading="lazy" />
                  </div>
                </Link>
              ))}

            </div>

          </div>

        </section>

        <section className="paintings-section scroll-reveal" id="paintings">

          <div className="paintings-sidebar">
            <a href="#paintings">
              <span className="sidebar-indicator"></span>
              Paintings
            </a>
          </div>

          <div className="paintings-artwork"  style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

           <div className="paintings-carousel">

  <button
    type="button"
    className="painting-carousel-arrow"
    onClick={previousPainting}
    aria-label="Previous painting"
  >
    <ChevronLeft size={30} />
  </button>

  <div className="painting-slide" key={paintings[activePaintingIndex].id}>

    <Link
      to={`/product/${paintings[activePaintingIndex].id}`}
      className="painting-card"
      aria-label={`View ${paintings[activePaintingIndex].name}`}
    >
      <div className="painting-image">
        <img
          src={paintings[activePaintingIndex].image}
          alt={paintings[activePaintingIndex].name}
        />
      </div>
    </Link>

    <p className="painting-caption">
      {paintings[activePaintingIndex].name}
    </p>

  </div>

  <button
    type="button"
    className="painting-carousel-arrow"
    onClick={nextPainting}
    aria-label="Next painting"
  >
    <ChevronRight size={30} />
  </button>

</div>

<div className="paintings-carousel-indicators">

  {paintings.map((art, index) => (
    <button
      key={art.id}
      type="button"
      className={`painting-indicator ${
        activePaintingIndex === index ? "active" : ""
      }`}
      onClick={() => setActivePaintingIndex(index)}
      aria-label={`Show ${art.name}`}
      aria-current={activePaintingIndex === index ? "true" : undefined}
    />
  ))}

</div>

          </div>

        </section>

        <section className="contact-section scroll-reveal" id="contact-us">

          <div className="contact-sidebar">
            <a href="#contact-us">
              <span className="sidebar-indicator"></span>
              Contact Us
            </a>
          </div>

          <div className="contact-artwork"  style={{
    backgroundImage: "url('/hero.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>

            <div className="contact-card">

              <div className="contact-heading">
                <h2>Get In Touch</h2>
                <p>We'd love to hear from you.</p>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>

                <div className="contact-input-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <button type="submit" className="contact-submit">
                  Send Message
                </button>

              </form>

              {contactSubmitted && (
                <div className="contact-success" role="status">
                  <h3>Thank You !</h3>
                  <p>
                    Your message has been received with thanks, We'll be in touch soon.
                  </p>
                  <button type="button" onClick={() => setContactSubmitted(false)} 
                    > Send Another Message

                  </button>
                </div>
              )}

              <p className="contact-details">
                Reach out to us anytime!
                <br /><br />
                E-mail: joelyncreations@gmail.com
                <br /><br />
                Phone: +254 711715180
              </p>

              <div className="hero-footer">
                © {new Date().getFullYear()} JOELYN CREATIONS. All rights reserved.
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Hero;