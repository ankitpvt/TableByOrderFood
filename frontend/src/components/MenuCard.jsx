import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import "../style/MenuCard.css";

const MenuCard = () => {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate hook

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("https://tablebyorderfood-2.onrender.com/api/menu");
        setMenu(response.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const placeOrder = async (item) => {
    const customerName = prompt("Enter your name:");
    if (!customerName) return toast.info("Order cancelled.");

    const order = { customerName, items: [item] };
    try {
      const response = await axios.post("https://tablebyorderfood-2.onrender.com/api/orders", order);
      toast.success(`Order placed successfully! 🍴 Order ID: ${response.data._id}`);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order!");
    }
  };

  // ✅ Navigate to Table page
  const goToTablePage = () => {
    navigate("/");
  };

  return (
    <div className="menu-container">
      <h1 className="restaurant-title">🍽️ Ankit’s Delight</h1>
      <p className="restaurant-tagline">Taste the perfection in every bite!</p>

      {/* Button to go to table page */}
      <div style={{ marginBottom: "20px" }}>
        <button className="order-btn" onClick={goToTablePage}>
          Go to Home
        </button>
      </div>

      <div className="menu-grid">
        {menu.map((item) => (
          <div key={item._id} className="menu-card">
            <div className="menu-content">
              <h2 className="menu-item-name">{item.name}</h2>
              <p className="menu-item-price">₹{item.price}</p>
              <p className="menu-item-desc">{item.description || "Delicious and freshly prepared just for you."}</p>
              <button className="order-btn" onClick={() => placeOrder(item)}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-link">
        <Link to="/admin">Go to Admin Page</Link>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default MenuCard;
