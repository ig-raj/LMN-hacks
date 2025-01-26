import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseService from '../../services/courseService'

const UpdateCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    image: '',
    teacher: '',
    subject: '',
    category: '',
    duration: '',
    url: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await CourseService.getCourseById(id);
        setCourseData(course);
      } catch (error) {
        setError('Failed to load course data.');
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await FreecourseService.updateCourse(id, courseData);
      setSuccess('Course updated successfully!');
      navigate('/courses'); // Redirect back to the courses page
    } catch (error) {
      setError('Failed to update course. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Course</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={courseData.title} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="image" placeholder="Image URL" value={courseData.image} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="teacher" placeholder="Teacher" value={courseData.teacher} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="subject" placeholder="Subject" value={courseData.subject} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="category" placeholder="Category" value={courseData.category} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="duration" placeholder="Duration" value={courseData.duration} onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="url" placeholder="Video URL" value={courseData.url} onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCoursePage;
