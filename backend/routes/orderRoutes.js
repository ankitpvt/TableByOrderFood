const express = require('express');
const Order = require('../model/order');

const router = express.Router();

// Place an order
router.post("/", async (req, res) => {
  const { customerName,tableNumber, items } = req.body;
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const newOrder = new Order({ customerName,tableNumber, items, total });
  await newOrder.save();
  req.io.emit('newOrder', newOrder);

  res.json(newOrder);
});



// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Delete an order by ID
router.delete("/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params; // Get orderId from the URL
      console.log(`Received orderId: ${orderId}`); // Debugging line
      const order = await Order.findByIdAndDelete(orderId); // Delete order by ID
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete the order" });
    }
  });
module.exports = router;


