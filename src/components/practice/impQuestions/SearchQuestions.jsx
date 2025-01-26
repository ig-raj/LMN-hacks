import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import ImportantQuestionsService from '../../../services/practiceServices.js'

const SearchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Fetch all questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await ImportantQuestionsService.getAllImpQuestions();
        setQuestions(response.documents);
      } catch (error) {
        console.error('Failed to fetch important questions', error);
      }
    };
    fetchQuestions();
  }, []);

  // Fuse.js configuration for fuzzy search
  const fuse = new Fuse(questions, {
    keys: ['title', 'subject', 'topic'], // Fields to search in
    threshold: 0.4, // 0 = perfect match, 1 = all matches (lower threshold means stricter matching)
  });

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const searchResults = fuse.search(value);
      setResults(searchResults.map((result) => result.item)); // Extract matched items
    } else {
      setResults([]); // Reset results when query is cleared
    }
  };

  return (
    <div>
      <h2>Search Questions</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search questions by title, subject, or topic..."
      />
      <ul>
        {results.length > 0
          ? results.map((question) => (
              <li key={question.$id}>
                {question.title} - {question.subject} - {question.topic}
              </li>
            ))
          : questions.map((question) => (
              <li key={question.$id}>
                {question.title} - {question.subject} - {question.topic}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default SearchQuestions;
