import React, { useEffect, useState } from 'react';
import { appwriteDB } from '../utills/appwriteConfig'; // Your Appwrite Config

const ImportantQuestionsPage = () => {
  const [impQuestions, setImpQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Important Questions from Appwrite
    const fetchImportantQuestions = async () => {
      try {
        setLoading(true);
        const response = await appwriteDB.listDocuments(
          'databaseID', // Replace with your Appwrite Database ID
          'ImpQuestionsCollectionID' // Replace with your ImpQuestions Collection ID
        );
        setImpQuestions(response.documents);
      } catch (err) {
        setError('Failed to load Important Questions');
      } finally {
        setLoading(false);
      }
    };

    fetchImportantQuestions();
  }, []);

  if (loading) return <p>Loading important questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Important Questions</h2>
      <ul className="space-y-4">
        {impQuestions.map((question) => (
          <li key={question.$id} className="border p-3 rounded-md bg-white shadow-md">
            <h3 className="text-lg font-semibold">{question.Title}</h3>
            <a
              href={question.Url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantQuestionsPage;
