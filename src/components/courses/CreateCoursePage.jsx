import React, { useState } from 'react';
import CourseService from '../../services/courseService';

const CreateCoursePage = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    image: '',
    teacher: '',
    subject: '',
    class: '',
    duration: '',
    url: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CourseService.addCourse(courseData);
      setSuccess('Course added successfully!');
      setCourseData({
        title: '',
        image: '',
        teacher: '',
        subject: '',
        class: '',
        duration: '',
        url: ''
      });
    } catch (error) {
      setError('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={courseData.title} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="image" placeholder="Image URL" value={courseData.image} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="teacher" placeholder="Teacher" value={courseData.teacher} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="subject" placeholder="Subject" value={courseData.subject} onChange={handleChange} required className="w-full p-2 border" />

        {/* Dropdown for selecting class */}
        <select name="class" value={courseData.class} onChange={handleChange} required className="w-full p-2 border">
          <option value="" disabled>Select Class</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
          
          {/* Add more class options as needed */}
        </select>

        <input type="text" name="duration" placeholder="Duration" value={courseData.duration} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="url" placeholder="Video URL" value={courseData.url} onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
