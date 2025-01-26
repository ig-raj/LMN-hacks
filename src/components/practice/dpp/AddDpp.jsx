import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeServices from "../../../services/practiceServices";

const AddDPP = () => {
  const [dppData, setDppData] = useState({
    title: '',
    url: '',
    subject: '',
    topic: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDppData({
      ...dppData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PracticeServices.addDPP(dppData);
      navigate('/practice/alldpp'); // Redirect to DPP list after adding
    } catch (error) {
      setError('Failed to add DPP');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Daily Practice Problem (DPP)</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={dppData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter DPP Title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">URL</label>
          <input
            type="text"
            name="url"
            value={dppData.url}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter DPP URL"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={dppData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Subject"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Topic</label>
          <input
            type="text"
            name="topic"
            value={dppData.topic}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Topic"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add DPP
        </button>
      </form>
    </div>
  );
};

export default AddDPP;
