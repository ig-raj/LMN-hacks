import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PracticeServices from '../../../services/practiceServices';

const AddImportantQuestion = () => {
  const [questionData, setQuestionData] = useState({
    title: '',
    url: '',
    subject: '',
    topic: ''
  });
  console.log(questionData)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PracticeServices.addImpQuestion(questionData);
      navigate('/practice/importantquestions/all'); // Correcting the path here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add Important Question</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={questionData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">URL:</label>
          <input
            type="text"
            name="url"
            value={questionData.url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Subject:</label>
          <input
            type="text"
            name="subject"
            value={questionData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Topic:</label>
          <input
            type="text"
            name="topic"
            value={questionData.topic}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Important Question
        </button>
      </form>
    </div>
  );
};

export default AddImportantQuestion;
