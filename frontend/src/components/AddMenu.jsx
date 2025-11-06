import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/AddMenu.css'; // Import CSS file

const AddMenu = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [menu, setMenu] = useState([]);

    // Fetch existing menu items
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('https://tablebyorderfood.onrender.com/api/menu');
                setMenu(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenu();
    }, []);

    // Add a new menu item
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenuItem = { name, price, category };
        try {
            const response = await axios.post('https://tablebyorderfood.onrender.com/api/menu', newMenuItem);
            setMenu((prevMenu) => [...prevMenu, response.data]);
            setName('');
            setPrice('');
            setCategory('');
            alert('Menu item added successfully!');
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert('Failed to add menu item. Please try again.');
        }
    };

    // Delete a menu item
    const deleteMenu = async (id) => {
        try {
            await axios.delete(`https://tablebyorderfood.onrender.com/api/menu/${id}`);
            setMenu(menu.filter((item) => item._id !== id));
            alert('Menu item deleted successfully!');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Failed to delete menu item. Please try again.');
        }
    };

    return (
        <div className="add-menu-container">
            <h1>Add Menu Item</h1>
            
            <form onSubmit={handleSubmit} className="menu-form">
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter menu item name"
                    required
                />
                <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter menu item price"
                    required
                />
                <input 
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter menu item category"
                    required
                />
                <button type="submit" className="btn-add">Add Item</button>
            </form>

            <div className="nav-home">
                <Link to="/" className="btn-home">🏠 Back to Home</Link>
            </div>

            <h2>Menu Items</h2>
            <ul className="menu-list">
                {menu.map((item) => (
                    <li key={item._id}>
                        <span><strong>{item.name}</strong> - ₹{item.price} - {item.category}</span>
                        <button 
                            className="btn-delete"
                            onClick={() => deleteMenu(item._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddMenu;
