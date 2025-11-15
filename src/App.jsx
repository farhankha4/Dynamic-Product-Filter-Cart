import './App.css'
import React, { useState, useMemo } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 1200,
    image:
      "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Surface-Laptop-Go-3_OG_Twitter-image?scl=1",
  },
  {
    id: 2,
    name: "T-Shirt",
    category: "Clothing",
    price: 25,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTACS7SZyAt5J5HKIaiVNWTT2-aQH6zQNRIWA&s",
  },
  {
    id: 3,
    name: "The Great Gatsby",
    category: "Books",
    price: 15,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwH-hcvmSi_C2Mmxwjhi0uwTKj6Bxu1Z9lw&s",
  },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    price: 800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3vKxf6VGz4AuJwZh5dJHAm4MCJQ6H2-9HQ&s",
  },
  {
    id: 5,
    name: "Jeans",
    category: "Clothing",
    price: 50,
    image:
      "https://t3.ftcdn.net/jpg/04/83/25/50/360_F_483255019_m1r1ujM8EOkr8PamCHF85tQ0rHG3Fiqz.jpg",
  },
  {
    id: 6,
    name: "Headphones",
    category: "Electronics",
    price: 150,
    image:
      "https://img.freepik.com/premium-photo/black-headphone-isolate-white-background_167862-5979.jpg",
  },
  {
    id: 7,
    name: "Earbuds",
    category: "Electronics",
    price: 100,
    image:
      "https://www.shutterstock.com/image-photo/white-wireless-headphones-no-background-600nw-2071692311.jpg",
  },
  {
    id: 8,
    name: "Tablet",
    category: "Electronics",
    price: 600,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi5ezpzTYks6zULjuw3Vpj8nAZ3ct9CE1jEg&s",
  },
  {
    id: 9,
    name: "Smartwatch",
    category: "Electronics",
    price: 300,
    image:
      "https://t3.ftcdn.net/jpg/05/89/20/84/360_F_589208452_jTxyYyu4DdPnVKFz2MBBb3nNs71ouyFo.jpg",
  },
  {
    id: 10,
    name: "Sneakers",
    category: "Clothing",
    price: 80,
    image:
      "https://st2.depositphotos.com/4307429/7393/i/950/depositphotos_73934615-stock-photo-sneaker-on-white-background.jpg",
  },
  {
    id: 11,
    name: "Backpack",
    category: "Accessories",
    price: 40,
    image:
      "https://t4.ftcdn.net/jpg/04/68/18/63/360_F_468186330_QtTAhIvQSpQp1lh7oVDS2ApqUlQythZ9.jpg",
  },
  {
    id: 12,
    name: "Camera",
    category: "Electronics",
    price: 500,
    image:
      "https://media.istockphoto.com/id/1140393948/photo/camera-isolated-on-white-background-with-clipping-path-mirrorless-camera-isolated-on-white.jpg?s=612x612&w=0&k=20&c=-hxMypenMupiCMQmZoADk7fwJQvYl0Oq-83AkMmr1f8=",
  },
];

export default function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return category === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === category);
  }, [category]);

  const addToCart = (product) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        updated[product.id].qty++;
      } else {
        updated[product.id] = { ...product, qty: 1 };
      }
      return updated;
    });
  };

  const modifyQty = (id, delta) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[id]) return prev;

      updated[id].qty += delta;
      if (updated[id].qty <= 0) delete updated[id];

      return updated;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cartItems = Object.values(cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-linear-to-br from-blue-50 to-purple-50 text-gray-900'}`}>
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-5xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dynamic Product Filter & Cart
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-[80vh] gap-6 px-6">
        <div className="w-full lg:w-1/2">
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-transparent
                  ${
                    category === c
                      ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/50 border-white/20"
                      : `bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-gray-900 dark:hover:text-white`
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-xl p-6 flex flex-col transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={product.image}
                  className="h-48 w-full object-cover rounded-lg shadow-md"
                />

                <div className="mt-6">
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white">{product.name}</h2>
                  <p className="text-green-600 dark:text-green-400 font-semibold text-lg mt-1">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
                </div>

                <button
                  className="mt-6 bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-900/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Shopping Cart</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty.</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Add some products to get started!</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 max-h-[60vh] overflow-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 flex gap-6 items-center last:border-b-0"
                    >
                      <img
                        src={item.image}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          ${item.price.toFixed(2)} × {item.qty}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => modifyQty(item.id, -0.5)}
                            className="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400 font-bold transition-all duration-200 transform hover:scale-110 shadow-md"
                          >
                            -
                          </button>
                          <span className="font-bold text-lg min-w-8 text-center text-gray-900 dark:text-white">{item.qty}</span>
                          <button
                            onClick={() => modifyQty(item.id, +0.5)}
                            className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-600 dark:text-green-400 font-bold transition-all duration-200 transform hover:scale-110 shadow-md"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-sm font-semibold transition-colors duration-200"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold text-2xl mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Total: </span>
                  <span className="text-green-600 dark:text-green-400">${total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
