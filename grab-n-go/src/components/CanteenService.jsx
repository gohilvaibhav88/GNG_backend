import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CanteenService = () => {
  const [canteen, setCanteen] = useState(null);
  const [formData, setFormData] = useState({
    canteenName: '',
    canteenAddress: '',
    collegeName: '',
    licenseImage: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPhoto: '',
    canteenPhoto: '',
    aadharCardNumber: ''
  });

  const navigate = useNavigate();
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
      setFormData(res.data);
    } catch (error) {
      console.log('No canteen found:', error.response?.data || error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/canteens', formData, config);
      alert('Canteen created successfully');
      setCanteen(res.data);
      navigate(`/owner/canteen/${res.data._id}`);
    } catch (error) {
      alert('Error creating canteen');
      console.error(error.response?.data || error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/canteens/${canteen._id}`, formData, config);
      alert('Canteen updated');
      setCanteen(res.data);
      navigate(`/owner/canteen/${canteen._id}`);
    } catch (error) {
      alert('Error updating canteen');
      console.error(error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/canteens/${canteen._id}`, config);
      alert('Canteen deleted');
      setCanteen(null);
      setFormData({
        canteenName: '',
        canteenAddress: '',
        collegeName: '',
        licenseImage: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPhoto: '',
        canteenPhoto: '',
        aadharCardNumber: ''
      });
    } catch (error) {
      alert('Error deleting canteen');
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchMyCanteen();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        {canteen ? 'Update Your Canteen' : 'Create Your Canteen'}
      </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          canteen ? handleUpdate() : handleCreate();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          'canteenName',
          'canteenAddress',
          'collegeName',
          'licenseImage',
          'ownerName',
          'ownerEmail',
          'ownerPhone',
          'ownerPhoto',
          'canteenPhoto',
          'aadharCardNumber'
        ].map(field => (
          <div key={field}>
            <label className="block font-semibold text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}:
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== 'ownerPhoto' && field !== 'canteenPhoto' && field !== 'licenseImage'}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            {canteen ? 'Update' : 'Create'}
          </button>

          {canteen && (
            <button
              type="button"
              onClick={handleDelete}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </form>

      {canteen && (
        <div className="mt-10 bg-gray-100 p-4 rounded-md shadow-inner">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">My Canteen Details</h3>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap break-words">{JSON.stringify(canteen, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CanteenService;
