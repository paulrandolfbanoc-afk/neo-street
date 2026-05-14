import { useEffect, useMemo, useState } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const categories = [
    {
      name: 'Oversized',
      subtitle: 'Relaxed streetwear silhouettes',
      image:
        'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Minimal',
      subtitle: 'Clean everyday essentials',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2069&auto=format&fit=crop',
    },
    {
      name: 'Luxury',
      subtitle: 'Premium elevated streetwear',
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop',
    },
    {
      name: 'Graffiti',
      subtitle: 'Bold graphic statement pieces',
      image:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1974&auto=format&fit=crop',
    },
    {
      name: 'Hoodies',
      subtitle: 'Heavyweight comfort layers',
      image:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
    },
  ];

  const productImages = {
    Oversized: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop',
    ],
    Minimal: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop',
    ],
    Luxury: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    ],
    Graffiti: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1973&auto=format&fit=crop',
    ],
    Hoodies: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop',
    ],
  };

  const productNames = {
    Oversized: [
      'Neo Oversized Tee',
      'Heavyweight Box Tee',
      'Loose Street Shirt',
      'Drop Shoulder Tee',
      'Wide Fit Urban Tee',
      'Oversized Core Black',
      'Relaxed White Fit',
      'Boxy Manila Tee',
      'Neo Heavy Cotton Tee',
      'Wide Cut Graphic Tee',
    ],
    Minimal: [
      'Neo Minimal Tee',
      'Core White Essential',
      'Plain Black Staple',
      'Daily Fit Tee',
      'Clean Cut Shirt',
      'Essential Cotton Tee',
      'Monochrome Crew',
      'White Label Tee',
      'Black Label Tee',
      'Neo Basic Fit',
    ],
    Luxury: [
      'Neo Utility Jacket',
      'Premium Monochrome Hoodie',
      'Luxury Urban Coat',
      'Executive Street Jacket',
      'Premium Heavy Tee',
      'Neo Luxe Overshirt',
      'Structured Black Jacket',
      'Premium Street Vest',
      'Neo Signature Set',
      'Luxury Drop Jacket',
    ],
    Graffiti: [
      'Graffiti Drop Hoodie',
      'Street Art Graphic Tee',
      'Tagline Print Tee',
      'Urban Wall Hoodie',
      'Spray Mark Shirt',
      'Neo Graffiti Black',
      'Concrete Print Tee',
      'Street Mural Hoodie',
      'Bold Tag Oversized Tee',
      'Underground Graphic Fit',
    ],
    Hoodies: [
      'Neo Heavy Hoodie',
      'Core Black Hoodie',
      'White Smoke Hoodie',
      'Oversized Zip Hoodie',
      'Drop Shoulder Hoodie',
      'Minimal Pullover',
      'Urban Layer Hoodie',
      'Luxury Cotton Hoodie',
      'Neo Logo Hoodie',
      'Limited Night Hoodie',
    ],
  };

  const products = Object.entries(productNames).flatMap(([category, names], categoryIndex) =>
    names.map((name, index) => ({
      id: `${category}-${index + 1}`,
      name,
      category,
      price: `₱${799 + categoryIndex * 250 + index * 75}`,
      image: productImages[category][index % productImages[category].length],
    }))
  );

  const heroProducts = products.slice(0, 12);

  useEffect(() => {
    const slider = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 2500);

    return () => clearInterval(slider);
  }, [heroProducts.length]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((item) => item.category === activeCategory);
  }, [activeCategory, products]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price.replace('₱', '').replace(',', '')) * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const changeQuantity = (productId, action) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== productId) return item;
          const nextQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const scrollToProducts = (category) => {
    setActiveCategory(category);
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50">
          <div className="w-full max-w-md bg-white text-black h-full shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-[0.3em] text-neutral-500 text-xs">Shopping Bag</p>
                <h2 className="text-3xl font-black uppercase">Your Cart</h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-black text-white font-bold"
              >
                X
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="border border-black/10 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-black uppercase mb-3">Cart is empty</h3>
                <p className="text-neutral-500 mb-6">Add products to preview the checkout flow.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-black text-white px-6 py-3 rounded-full font-bold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border border-black/10 rounded-2xl p-4">
                      <img src={item.image} alt={item.name} className="w-24 h-28 object-cover grayscale rounded-xl" />

                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.category}</p>
                        <h3 className="font-black uppercase leading-tight mt-1">{item.name}</h3>
                        <p className="text-neutral-600 mt-1">{item.price}</p>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => changeQuantity(item.id, 'decrease')}
                            className="w-8 h-8 rounded-full border border-black/20 font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 'increase')}
                            className="w-8 h-8 rounded-full border border-black/20 font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-sm underline text-neutral-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/10 mt-8 pt-6 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold uppercase">Subtotal</span>
                    <span className="font-black">₱{cartTotal.toLocaleString()}</span>
                  </div>

                  <p className="text-sm text-neutral-500">
                    Free shipping applies for orders above ₱2,000.
                  </p>

                  <button
                    onClick={() => alert('Checkout preview only')}
                    className="w-full bg-black text-white py-4 rounded-full font-black uppercase"
                  >
                    Checkout
                  </button>

                  <button
                    onClick={() => setCart([])}
                    className="w-full border border-black/20 py-4 rounded-full font-bold uppercase"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-black/10 bg-white shadow-sm">
              <img src="/Logo.png" alt="Neo Street Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-[0.25em] uppercase">Neo Street</h1>
              <p className="text-xs text-neutral-500 uppercase tracking-[0.35em]">STREETWEAR</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8 uppercase tracking-[0.18em] text-sm text-neutral-600">
            <a href="#home" className="hover:text-black">Home</a>
            <a href="#categories" className="hover:text-black">Categories</a>
            <a href="#products" className="hover:text-black">Shop</a>
            <a href="#promo" className="hover:text-black">Promo</a>
            <a href="#about" className="hover:text-black">About</a>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="bg-black text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition"
          >
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center border-b border-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2070&auto=format&fit=crop"
          alt="Black and white streetwear hero"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-25"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-28">
          <div>
            <p className="uppercase tracking-[0.4em] text-sm text-neutral-500 mb-6">NEO STREET</p>
            <h2 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tight mb-8">
              Own
              <br />
              The
              <br />
              Street
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed max-w-xl mb-10">
              Streetwear for those who live
              with confidence and originality.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition">
                Shop Collection
              </a>
              <a href="#promo" className="border border-black/20 px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition">
                View Promo
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-[2rem] overflow-hidden border border-black/10 shadow-2xl bg-white">
              <img
                src={heroProducts[heroIndex].image}
                alt={heroProducts[heroIndex].name}
                className="w-full h-[620px] object-cover grayscale transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-black text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.25em]">
                Drop 07
              </div>
              <div className="absolute top-6 right-6 bg-white text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]">
                {heroProducts[heroIndex].price}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="uppercase tracking-[0.3em] text-xs text-neutral-300 mb-3">
                  {heroProducts[heroIndex].category} Collection
                </p>
                <h3 className="text-4xl font-black uppercase">{heroProducts[heroIndex].name}</h3>
                <button
                  onClick={() => addToCart(heroProducts[heroIndex])}
                  className="mt-5 bg-white text-black px-6 py-3 rounded-full text-sm font-black uppercase hover:bg-neutral-200 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-neutral-500 text-sm mb-3">Categories</p>
            <h2 className="text-5xl font-black uppercase">CATEGORIES</h2>
          </div>
          <p className="text-neutral-600 max-w-md">Click a category to show more products under that style.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => scrollToProducts(cat.name)}
              className="group text-left relative h-72 rounded-3xl overflow-hidden border border-black/10 hover:border-black transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover grayscale group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-black uppercase">{cat.name}</h3>
                <p className="text-sm text-neutral-300 mt-2">{cat.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="products" className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="uppercase tracking-[0.3em] text-neutral-400 text-sm mb-3">Product Catalog</p>
              <h2 className="text-5xl font-black uppercase">
                {activeCategory === 'All' ? 'Products' : `${activeCategory} Collection`}
              </h2>
              <p className="text-neutral-400 mt-3">Showing products</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {['All', ...categories.map((cat) => cat.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full border transition ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <div key={item.id} className="group bg-black border border-white/10 rounded-3xl overflow-hidden hover:border-white/40 transition">
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase leading-tight">{item.name}</h3>
                  <p className="text-neutral-400 mt-2">{item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-5 bg-white text-black px-5 py-3 rounded-full text-sm font-bold hover:bg-neutral-200 transition"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="promo" className="bg-white text-black py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[2rem] overflow-hidden h-[620px] border border-black/10 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop"
                alt="Limited streetwear sale promo"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="uppercase tracking-[0.3em] text-xs text-neutral-300 mb-4">Limited Campaign</p>
                <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-5">
                  50% Off
                  <br />
                  Street Sale
                </h2>
              </div>
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-neutral-500 text-sm mb-3">NEO STREET PROMOS</p>
              <h2 className="text-5xl font-black uppercase leading-tight mb-8">Promo, Free Shipping, and Limited Drops</h2>

              <div className="space-y-5">
                <div className="border border-black/10 rounded-3xl p-8 bg-neutral-50">
                  <h3 className="text-3xl font-black uppercase mb-3">Free Shipping</h3>
                  <p className="text-neutral-600">Free nationwide delivery for orders above ₱2,000.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="border border-black/10 rounded-3xl p-8 bg-neutral-50">
                    <h3 className="text-2xl font-black uppercase mb-3">Buy 1 Get 1</h3>
                    <p className="text-neutral-600">Double the Fun, One Low Price! Buy 1, Get 1 FREE</p>
                  </div>
                  <div className="border border-black/10 rounded-3xl p-8 bg-neutral-50">
                    <h3 className="text-2xl font-black uppercase mb-3">24-Hour Drop</h3>
                    <p className="text-neutral-600">Double Up Before Time Runs Out!.</p>
                  </div>
                </div>
              </div>

              <a href="#products" className="inline-block mt-10 bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition">Shop The Promo</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-neutral-400 text-sm mb-4">About Neo Street</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-8">
                Built For Urban Culture
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                Neo Street is a modern streetwear brand inspired by urban culture, creativity, and self-expression. We create pieces that speak your style.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
               
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-black uppercase">Urban</h3>
                  <p className="text-neutral-400 text-sm mt-2">Inspired by city movement.</p>
                </div>
                <div className="border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-black uppercase">Creative</h3>
                  <p className="text-neutral-400 text-sm mt-2">Made for self-expression.</p>
                </div>
                <div className="border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-black uppercase">Local</h3>
                  <p className="text-neutral-400 text-sm mt-2">Near RTU Mandaluyong.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
              <div className="p-6 border-b border-white/10">
                <p className="uppercase tracking-[0.25em] text-xs text-neutral-400">Location</p>
                <h3 className="text-2xl font-black uppercase mt-2">Near RTU Mandaluyong, Philippines</h3>
              </div>
              <iframe
                title="Neo Street Location Near RTU Mandaluyong"
                src="https://www.google.com/maps?q=Rizal%20Technological%20University%20Mandaluyong%20Philippines&output=embed"
                className="w-full h-[430px] grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.3em] text-neutral-500 text-sm mb-4">Join The Community</p>
          <h2 className="text-5xl font-black uppercase mb-6">Get Early Access</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto mb-10">Be the first to access limited drops, exclusive collections, and luxury streetwear releases.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border border-black/20 bg-transparent text-black outline-none"
            />
            <button onClick={() => alert('Subscribed successfully')} className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition">Subscribe</button>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 py-16 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10">
                <img src="/Logo.png" alt="Neo Street Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-[0.2em]">Neo Street</h3>
                <p className="text-neutral-500 text-xs uppercase tracking-[0.3em]">STREETWEAR</p>
              </div>
            </div>
            <p className="text-neutral-500 leading-relaxed">Luxury streetwear crafted for the culture.</p>
          </div>

          <div>
            <h4 className="font-black uppercase mb-5">Shop</h4>
            <div className="flex flex-col gap-3 text-neutral-500">
              {categories.map((cat) => (
                <button key={cat.name} onClick={() => scrollToProducts(cat.name)} className="text-left hover:text-black">{cat.name}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase mb-5">Company</h4>
            <div className="flex flex-col gap-3 text-neutral-500">
              <a href="#about" className="hover:text-black">About</a>
              <a href="#promo" className="hover:text-black">Promo</a>
              <a href="#products" className="hover:text-black">Products</a>
              <a href="#home" className="hover:text-black">Back to Top</a>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase mb-5">Cart Summary</h4>
            <p className="text-neutral-500 mb-3">Items: {cartCount}</p>
            <p className="text-neutral-500 mb-5">Total: ₱{cartTotal.toLocaleString()}</p>
            <button onClick={() => setCartOpen(true)} className="bg-black text-white px-5 py-3 rounded-full font-bold">Open Cart</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
