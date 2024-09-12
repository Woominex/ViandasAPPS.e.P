import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm.js'; // Agrega la extensión .js
import './Menu.css';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtener los menús del backend
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:5000/menus');
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleOrderCreated = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-header">Menú Principal</h1>

      <OrderForm menus={menus} onOrderCreated={handleOrderCreated} />

      <h2>Pedidos Realizados</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            {order.menu} - Cantidad: {order.quantity} - Fecha: {order.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
