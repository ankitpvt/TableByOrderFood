const express = require("express");
// const Menu = require("../models/Menu");
const Menu = require("../model/menuItem");

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

// Add a menu item
router.post("/", async (req, res) => {
  const newItem = new Menu(req.body);
  await newItem.save();
  res.json(newItem);
});

router.delete('/:menuItemId', async (req, res) => {
    try {
        const { menuItemId } = req.params;
        const deletedMenuItem = await Menu.findByIdAndDelete(menuItemId);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Failed to delete the menu item' });
    }
});

module.exports = router;
