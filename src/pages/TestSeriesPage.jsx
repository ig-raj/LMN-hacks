import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TestSeriesList from '../components/practice/testseries/TestSeriesList';
import TestSeriesForm from '../components/practice/testseries/TestSeriesForm';

const TestSeriesPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TestSeriesList />} />
        <Route path="/create" element={<TestSeriesForm />} />
        <Route path="/edit/:id" element={<TestSeriesForm />} />
      </Routes>
    </div>
  );
};

export default TestSeriesPage;
