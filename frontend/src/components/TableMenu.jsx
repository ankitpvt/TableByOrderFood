import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../style/TableMenu.css";

const TableMenuPage = () => {
  const { tableNumber } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://tablebyorderfood-2.onrender.com/api/menu");
        setMenu(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch menu!");
      }
    };
    fetchMenu();
  }, []);

  const placeOrder = async (item) => {
    const order = {
      customerName: `Table-${tableNumber}`,
      tableNumber,
      items: [item],
    };

    try {
      await axios.post("https://tablebyorderfood-2.onrender.com/api/orders", order);
      toast.success(`Order for Table ${tableNumber} placed successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order!");
    }
  };

  return (
    <div className="table-menu-container">
      <div className="nav-links">
        <Link to="/" className="nav-link">🏠 Back to Home</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
      </div>

      <h1 className="table-title">Table {tableNumber} Menu</h1>

      <div className="table-menu-grid">
        {menu.map((item) => (
          <div key={item._id} className="table-menu-card">
            <h2 className="menu-item-name">{item.name}</h2>
            <p className="menu-item-price">₹{item.price}</p>
            <p className="menu-item-desc">{item.description || "Delicious and freshly prepared for you."}</p>
            <button className="order-btn" onClick={() => placeOrder(item)}>Order</button>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default TableMenuPage;
