import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MenuCard from "./components/MenuCard";
import AddMenu from "./components/AddMenu";
import AdminPage from "./components/AdminPage";
import TablePage from "./components/TablePage";
import TableMenuPage from "./components/TableMenu";
import Login from "./components/Login";
import Setting from "./components/setting";
import AddTables from "./components/AddTables";
const App = () => {

  return (
    <Routes>
        <Route path="/" element={<TablePage />} />
      <Route path="/menu" element={<MenuCard  />} />
      <Route path="/add" element={<AddMenu />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<AdminPage/>} />
    <Route path="/table/:tableNumber" element={<TableMenuPage />} />
    <Route path="/setting" element={<Setting />} />
    <Route path="/AddTables" element={<AddTables/>} />
    </Routes>
  );
};

export default App;
