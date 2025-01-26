import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PracticeServices from "../../../services/practiceServices"; // Ensure this is correctly imported

const EditDPP = () => {
  const { id } = useParams(); 
  const [dppData, setDppData] = useState({ title: '', url: '', subject: '', topic: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch DPP data on component mount
  useEffect(() => {
    const fetchDPP = async () => {
      try {
        const result = await PracticeServices.getDPPById(id);
        setDppData(result);  // Ensure 'result' returns the correct DPP object
      } catch (error) {
        setError('Failed to load DPP');
      }
    };
    fetchDPP();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setDppData({ ...dppData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PracticeServices.updateDPP(id, dppData); // Corrected service name
      navigate('/practice/alldpp'); // Navigate to DPP list after update
    } catch (error) {
      setError('Failed to update DPP');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Daily Practice Problem</h1>
  
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update DPP
        </button>
      </form>
    </div>
  );
};

export default EditDPP;
