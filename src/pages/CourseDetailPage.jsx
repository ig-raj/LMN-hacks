import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseService from '../services/courseService';
import LectureList from '../components/courses/LectureList';
import NotesList from '../components/courses/NotesList';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await CourseService.getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Course Details</h3>
            <p className="text-gray-700">{course.description}</p>
            <p><strong>Teacher:</strong> {course.teacher}</p>
            <p><strong>Subject:</strong> {course.subject}</p>
            <p><strong>Category:</strong> {course.category}</p>
          </div>
        );
      case 'lectures':
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Lectures</h3>
            <Link 
              to={`/courses/${course.$id}/addlecture`} 
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center mt-4 py-2 rounded-lg transition duration-200"
            >
              Add Lecture
            </Link>
            <LectureList />
          </div>
        );
      case 'notes':
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Notes</h3>
            <NotesList courseId={courseId} />
          </div>
        );
      case 'dpp':
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">DPP (Daily Practice Problems)</h3>
            <p>Daily practice problems related to this course.</p>
            {/* Add list or link to DPP PDFs here */}
          </div>
        );
      case 'ask-doubt':
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Ask a Doubt</h3>
            <p>Post your questions and interact with mentors or fellow students.</p>
            {/* Form or interface for asking doubts */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-800">{course.title}</h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-6 mb-6 border-b-2 pb-2">
        {['details', 'lectures', 'notes', 'dpp', 'ask-doubt'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-t-lg font-medium ${
              activeTab === tab 
                ? 'text-blue-700 border-b-4 border-blue-700'
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Render Content Based on Active Tab */}
      <div className="p-6 bg-white shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:shadow-xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default CourseDetailPage;
