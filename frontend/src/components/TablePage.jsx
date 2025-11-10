import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/TablePage.css"

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      const res = await axios.get("https://tablebyorderfood-2.onrender.com/api/tables");
      setTables(res.data);
    };
    fetchTables();
  }, []);

  const addTable = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://tablebyorderfood-2.onrender.com/api/tables", {
        tableNumber,
        capacity,
      });
      setTables([...tables, res.data]);
      setTableNumber("");
      setCapacity("");
      alert(`Table Number ${tableNumber} Added Successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to add table");
    }
  };

  const deleteTable = async (id) => {
    await axios.delete(`https://tablebyorderfood-2.onrender.com/api/tables/${id}`);
    setTables(tables.filter((t) => t._id !== id));
  };

  const openTableMenu = (tableNumber) => {
    navigate(`/table/${tableNumber}`);
  };

  return (
    <div className="table-page">
      <h1>🍽️ Restaurant Tables</h1>

      {/* <form className="table-form" onSubmit={addTable}>
        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
        <button type="submit">Add Table</button>
      </form> */}

      <div className="table-list">
        {tables.map((table) => (
          <div key={table._id} className="table-card">
            <h2>Table {table.tableNumber}</h2>
            <p>Capacity: {table.capacity} people</p>
            <button
              className="view-btn"
              onClick={() => openTableMenu(table.tableNumber)}
            >
              View Menu
            </button>
            {/* <button
              className="delete-btn"
              onClick={() => deleteTable(table._id)}
            >
              Delete
            </button> */}
          </div>
        ))}
      </div>
       <div className="bottom-links">
  <Link to="/menu" className="bottom-btn">MenuCard</Link>
  <Link to="/admin" className="bottom-btn">Admin</Link>
</div>

    </div>
    
  );
};

export default TablePage;
