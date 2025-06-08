import React, { useEffect, useState } from 'react';
import axios from 'axios';

const categories = ['breakfast', 'lunch', 'chinese', 'specialFood'];

const OwnerCanteenDashboard = () => {
  const [canteen, setCanteen] = useState(null);
  const [menu, setMenu] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'breakfast',
    image: ''
  });

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchMyCanteen = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/canteens/my', config);
      setCanteen(res.data);
      fetchMenu(res.data._id);  // ✅ fetch menu after getting canteen
    } catch (error) {
      console.error('Error fetching canteen:', error.response?.data || error.message);
    }
  };

  const fetchMenu = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/canteen-menus/${id}`, config); // ✅ fixed URL
      setMenu(res.data);
    } catch (error) {
      console.error('Error fetching menu:', error.response?.data || error.message);
    }
  };

  const handleAddItem = async () => {
    if (!canteen) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/canteen-menus/${canteen._id}/add-item`, // ✅ fixed URL
        { ...newItem },
        config
      );
      setMenu(res.data.menu); // assuming the updated menu is returned inside { message, menu }
      alert('Item added!');
      setNewItem({ name: '', price: '', description: '', category: 'breakfast', image: '' });
    } catch (error) {
      alert('Failed to add item');
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchMyCanteen();
  }, []);

  if (!canteen) return <div className="p-8 text-center">Loading canteen...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Welcome to Your Canteen Dashboard</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Canteen Info</h3>
        <p><strong>Name:</strong> {canteen.canteenName}</p>
        <p><strong>Address:</strong> {canteen.canteenAddress}</p>
        <p><strong>College:</strong> {canteen.collegeName}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Menu Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            className="border p-2 rounded"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
            className="border p-2 rounded"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </div>

      {menu && categories.map(cat => (
        <div key={cat} className="bg-gray-100 p-4 rounded mb-4">
          <h4 className="text-lg font-bold capitalize text-gray-800 mb-2">{cat} Menu</h4>
          {menu[cat]?.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {menu[cat].map((item, index) => (
                <li key={index}>
                  {item.name} - ₹{item.price} ({item.description || 'No description'})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No items in this category</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnerCanteenDashboard;
