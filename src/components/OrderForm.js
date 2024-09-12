import React from 'react';
import useForm from '../hooks/useForm.js';
import './OrderForm.css';

const OrderForm = ({ menus, onOrderCreated }) => {
  const [formValues, handleInputChange, resetForm] = useForm({
    menu: '',
    quantity: 1,
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.menu || !formValues.date) {
      alert('Por favor, selecciona un menú y una fecha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const newOrder = await response.json();
        onOrderCreated(newOrder); // Llama a la función pasada como prop
        resetForm();
        alert('Pedido creado con éxito');
      } else {
        alert('Error al crear el pedido');
      }
    } catch (error) {
      alert('Error al enviar el pedido');
    }
  };

  return (
    <div className="order-form-container">
      <h2>Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="menu">Selecciona el menú</label>
          <select
            id="menu"
            name="menu"
            value={formValues.menu}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Selecciona un menú --</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.nombre}>
                {menu.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formValues.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha de entrega</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn">Crear Pedido</button>
      </form>
    </div>
  );
};

export default OrderForm;

