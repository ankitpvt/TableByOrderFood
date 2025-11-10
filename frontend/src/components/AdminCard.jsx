
 import React, { useState, useEffect} from "react";
 import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify
 import { Link } from "react-router-dom";
 
const MenuCard = () => {
    const [menu, setMenu] = useState([]);
  
    useEffect(() => {
      const fetchMenu = async () => {   
        const response = await axios.get("https://tablebyorderfood-2.onrender.com/api/menu");
        setMenu(response.data);
      };
      fetchMenu();
    }, []);
  
    const placeOrder = async (item) => {
      const customerName = prompt("Enter your name:");
      const order = {
        customerName,
        items: [item],
      };
      console.log("Placing order:", order); // Log order for debugging
   
  
      const response = await axios.post("https://tablebyorderfood-2.onrender.com/api/orders", order);
             // alert(`Order placed successfully! Order ID: ${response.data._id}`);
        toast.success(`Order placed successfully! Order ID: ${response.data._id}`);
    };
  
    return (
      <div>
        <h1>Ankit’s Delight</h1>
        <h3>Menu</h3>
        <ul>
          {menu.map((item) => (
            <li key={item._id}>
              {item.name} - ₹{item.price}{" "}
              <button onClick={() => placeOrder(item)}>Order</button>
            </li>
          ))}
        </ul>
        <Link to='/menu'>Go to Admin Page</Link>
        <ToastContainer />
      </div>
    );
  };
  
  export default MenuCard;
  