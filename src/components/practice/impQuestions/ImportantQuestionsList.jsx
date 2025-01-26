import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImportantQuestionsService from '../../../services/practiceServices';

const ImportantQuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await ImportantQuestionsService.getAllImpQuestions();
        setQuestions(result.documents); // assuming documents contains the questions
      } catch (err) {
        setError(err.message);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      await ImportantQuestionsService.deleteImpQuestion(questionId);
      setQuestions(questions.filter((question) => question.$id !== questionId));
    } catch (error) {
      setError('Failed to delete Important Question');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Important Questions List</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <ul className="space-y-4">
        {questions.map((question) => (
          <li
            key={question.$id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{question.title}</h2>
              <p className="text-gray-500">
                {question.subject} - {question.topic}
              </p>
              <Link
                to={question.url}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Download 
              </Link>
            </div>

            <div className="flex space-x-4">
             
              <Link
                to={`/practice/importantquestions/edit/${question.$id}`}
                className="text-green-500 hover:text-green-700 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(question.$id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          to="/practice/importantquestions/add"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Important Question
        </Link>
      </div>
    </div>
  );
};

export default ImportantQuestionsList;
