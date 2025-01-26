import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseService from '../../services/courseService';

const LectureList = () => {
  const { courseId } = useParams();
 
  const [lectures, setLectures] = useState([]);
  
  useEffect(() => {
    console.log('courseId from URL params:', courseId); // Debugging line

    const fetchLectures = async () => {
      try {
        const response = await CourseService.getLecturesByCourseId(courseId);
        setLectures(response);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };
    fetchLectures();
  }, [courseId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lectures</h2>
      {lectures.length === 0 ? (
        <p>No lectures available for this course.</p>
      ) : (
        <ul>
          {lectures.map((lecture) => (
            <li key={lecture.$id} className="mb-2">
              <h3 className="font-bold">{lecture.title}</h3>
              <p>{lecture.topic}</p>
              <a href={lecture.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Watch Lecture
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LectureList;
