import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PracticeServices from "../../../services/practiceServices";

const DppList = () => {
  const [dpps, setDpps] = useState([]);
  const [error, setError] = useState('');
  console.log(dpps)

  useEffect(() => {
    const fetchDPPs = async () => {
      try {
        const result = await PracticeServices.getAllDPPs();
      
        setDpps(result.documents);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDPPs();
  }, []);

  const handleDelete = async (dppId) => {
    try {
      await PracticeServices.deleteDPP(dppId);
      setDpps(dpps.filter((dpp) => dpp.$id !== dppId));
    } catch (error) {
      setError('Failed to delete DPP');
    }
  };

  const handleUpdate = async (dppId) => {
    try {
      await PracticeServices.updateDPP(dppId);
    } catch (error) {
      setError("Failed to update DPP");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daily Practice Problems (DPP) List</h1>

      {/* Error message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* DPP List */}
      <ul className="space-y-6">
        {dpps.length === 0 ? (
          <p className="text-gray-600">No DPPs available. Please add one!</p>
        ) : (
          dpps.map((dpp) => (
            <li key={dpp.$id} className="bg-white shadow-lg rounded-lg p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{dpp.title}</h2>
                <p className="text-gray-500">{dpp.subject} - {dpp.topic}</p>
                <Link
                  to={dpp.url}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Download 
                </Link>
                
              </div>
              
              <div className="flex space-x-4">
                {/* Edit */}
                <Link
                  to={`/practice/dpp/edit/${dpp.$id}`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(dpp.$id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DppList;
