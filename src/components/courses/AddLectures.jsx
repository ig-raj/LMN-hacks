import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseService from '../../services/courseService';

const AddLectures = () => {
  const { courseId } = useParams(); // Extract courseId from URL
  const [lectureData, setLectureData] = useState({
    title: '',
    topic: '',
    subject: '',
    url: '',
    courseId: '', // Initialize empty, update in useEffect
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Set courseId in lectureData state after component mounts
    if (courseId) {
      setLectureData((prevData) => ({ ...prevData, courseId }));
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CourseService.addLecture(lectureData);
      setMessage('Lecture added successfully!');
      setIsSuccess(true);
      setLectureData({ title: '', topic: '', subject: '', url: '', courseId });
    } catch (error) {
      setMessage('Failed to add lecture.');
      setIsSuccess(false);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Course Lectures</h2>
      {message && (
        <p className={`mb-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
      <div className="text-center mb-4">
        <button
          onClick={toggleFormVisibility}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          {isFormVisible ? 'Close Form' : 'Add New Lecture'}
        </button>
      </div>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={lectureData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={lectureData.topic}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={lectureData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="url"
            placeholder="Video URL"
            value={lectureData.url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            >
              Add Lecture
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddLectures;
