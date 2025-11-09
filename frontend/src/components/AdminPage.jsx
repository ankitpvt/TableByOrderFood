import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { io } from "socket.io-client";
import "../style/AdminPage.css";

// const socket = io("https://tablebyorderfood.onrender.com");

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://tablebyorderfood-1-backend.onrender.com/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

    // socket.on("newOrder", (newOrder) => {
    //   setOrders((prevOrders) => [...prevOrders, newOrder]);
    //   toast.info(`New order received from ${newOrder.customerName}!`);
    // });

    // return () => socket.off("newOrder");
  }, []);

  // Delete entire customer
  const deleteCustomer = (customerName) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.customerName !== customerName)
    );
    toast.warning(`Deleted all orders for ${customerName}`);
  };

  // Delete single item from customer
  const deleteItem = (customerName, itemName, itemPrice) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) => {
          if (order.customerName === customerName) {
            const index = order.items.findIndex(
              (i) => i.name === itemName && i.price === itemPrice
            );
            if (index > -1) {
              order.items.splice(index, 1);
            }
          }
          return order;
        })
        .filter((order) => order.items.length > 0)
    );
    toast.warning(`Deleted 1 ${itemName} for ${customerName}`);
  };

  // Calculate total of items
  const calculateTotal = (items) => items.reduce((t, i) => t + (i.price || 0), 0);

  // Combine duplicate items
  const combineDuplicateItems = (items) => {
    const combined = {};
    items.forEach((item) => {
      const key = `${item.name}_${item.price}`;
      if (combined[key]) {
        combined[key].quantity += 1;
        combined[key].totalPrice += item.price;
      } else {
        combined[key] = { ...item, quantity: 1, totalPrice: item.price };
      }
    });
    return Object.values(combined);
  };

  // Group orders by customer
  const groupedOrders = orders.reduce((acc, order) => {
    const totalAmount = calculateTotal(order.items || []);
    if (acc[order.customerName]) {
      acc[order.customerName].total += totalAmount;
      acc[order.customerName].orders.push(order);
    } else {
      acc[order.customerName] = {
        total: totalAmount,
        orders: [order],
      };
    }
    return acc;
  }, {});

  // Download receipt
  const downloadReceipt = (customerName, customerData) => {
    const allItems = customerData.orders.flatMap((order) => order.items);
    const mergedItems = combineDuplicateItems(allItems);

    const content = `
🍽️ Ankit’s Delight
----------------------------------------
Customer: ${customerName}
Total Amount: ₹${customerData.total}

Items:
${mergedItems
  .map((i) => `${i.name} × ${i.quantity} - ₹${i.price} each (₹${i.totalPrice} total)`)
  .join("\n")}
----------------------------------------
Thank you for dining with us! 😊
Date: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${customerName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print receipt
//   const printReceipt = (customerName, customerData) => {
//     const allItems = customerData.orders.flatMap((order) => order.items);
//     const mergedItems = combineDuplicateItems(allItems);

//     const html = `
//       <html>
//         <head>
//           <title>Customer Receipt - ${customerName}</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; background: #fff; color: #000; }
//             .receipt { border: 1px solid #ccc; padding: 20px; border-radius: 10px; }
//             h2 { text-align: center; color: #333; }
//             ul { list-style: none; padding: 0; }
//             li { margin-bottom: 8px; }
//           </style>
//         </head>
//         <body>
//           <div class="receipt">
//             <h2>🍽️ Ankit’s Delight</h2>
//             <p><strong>Customer:</strong> ${customerName}</p>
//             <p><strong>Total Amount:</strong> ₹${customerData.total}</p>
//             <h3>Items:</h3>
//             <ul>
//               ${mergedItems
//                 .map(
//                   (i) =>
//                     `<li>${i.name} × ${i.quantity} - ₹${i.price} each (₹${i.totalPrice} total)</li>`
//                 )
//                 .join("")}
//             </ul>
//             <p><em>Thank you for dining with us!</em></p>
//             <p><small>Date: ${new Date().toLocaleString()}</small></p>
//           </div>
//         </body>
//       </html>
//     `;
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(html);
//     printWindow.document.close();
//     printWindow.print();
//   };

  // ---------- RENDER ----------
  
  
  const printReceipt = (customerName, customerData) => {
  const allItems = customerData.orders.flatMap((order) => order.items);
  const mergedItems = combineDuplicateItems(allItems);

  const html = `
    <html>
      <head>
        <title>Receipt - ${customerName}</title>
        <style>
          body { font-family: 'Courier New', monospace; margin: 0; padding: 0; background: #fff; }
          .receipt { width: 300px; margin: auto; padding: 10px; border: 1px solid #000; }
          h2 { text-align: center; margin: 10px 0; }
          .center { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { text-align: left; padding: 4px; font-size: 14px; }
          .total-row td { font-weight: bold; border-top: 1px solid #000; }
          .footer { text-align: center; font-size: 12px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>🍽️ Ankit's Delight</h2>
          <p><strong>Customer:</strong> ${customerName}</p>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${mergedItems
                .map(
                  (i) => `
                  <tr>
                    <td>${i.name}</td>
                    <td>${i.quantity}</td>
                    <td>₹${i.price}</td>
                    <td>₹${i.totalPrice}</td>
                  </tr>`
                )
                .join("")}
              <tr class="total-row">
                <td colspan="3">TOTAL</td>
                <td>₹${customerData.total}</td>
              </tr>
            </tbody>
          </table>

          <p class="footer">Thank you for dining with us! 😊</p>
          <p class="footer">${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};

  
  return (
    <div className="admin-container" style={{ background: "#1a1a1a", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <h2>👨‍🍳 Admin Page</h2>
      <h3>All Customer Orders</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.keys(groupedOrders).length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          Object.entries(groupedOrders).map(([customerName, customerData]) => {
            const allItems = customerData.orders.flatMap((order) => order.items);
            const mergedItems = combineDuplicateItems(allItems);

            return (
              <li key={customerName} className="customer-card" style={{ background: "#333", marginBottom: "20px", padding: "15px", borderRadius: "10px" }}>
                <h4 className="customer-name">👤 {customerName}</h4>
                <p className="total-amount">Total Amount: ₹{customerData.total}</p>

                <ul>
                  {mergedItems.map((item) => (
                    <li key={item.name} style={{ marginBottom: "5px" }}>
                      {item.name} × {item.quantity} - ₹{item.price} each
                      <button
                        style={{ marginLeft: "10px", padding: "2px 6px", cursor: "pointer" }}
                        onClick={() => deleteItem(customerName, item.name, item.price)}
                      >
                        🗑️ Delete 1
                      </button>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "10px" }}>
                  <button
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => printReceipt(customerName, customerData)}
                  >
                    🖨️ Print
                  </button>
                  <button
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => downloadReceipt(customerName, customerData)}
                  >
                    💾 Download
                  </button>
                  <button
                    style={{ cursor: "pointer", background: "red", color: "#fff" }}
                    onClick={() => deleteCustomer(customerName)}
                  >
                    ❌ Delete Customer
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>

      <div className="nav-links" style={{ marginTop: "20px" }}>
        <Link to="/setting" style={{ marginRight: "10px", color: "#0af" }}>Setting</Link>
        <Link to="/" style={{ color: "#0af" }}>Back to Home</Link>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AdminPage;
