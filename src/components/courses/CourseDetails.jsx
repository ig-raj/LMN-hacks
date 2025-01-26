import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { databases } from '../../services/appwrite';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        // Fetch course details
        const fetchCourseDetails = async () => {
            try {
                const response = await databases.getDocument('[YOUR_DATABASE_ID]', 'courses', courseId);
                setCourse(response);
            } catch (error) {
                console.error('Failed to fetch course:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const handleEnroll = async () => {
        // Logic to enroll the student in the course
        await databases.createDocument('[YOUR_DATABASE_ID]', 'enrollments', {
            courseId,
            userId: '[CURRENT_USER_ID]', // get current user ID
        });
        setIsEnrolled(true);
        alert('Successfully enrolled!');
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">{course.name}</h1>
            <p>{course.description}</p>
            <p>Price: {course.price === 0 ? 'Free' : `$${course.price}`}</p>
            {!isEnrolled && (
                <button onClick={handleEnroll} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Enroll Now
                </button>
            )}
            {isEnrolled && (
                <Link to={`/course/${courseId}/content`} className="text-blue-500 hover:text-blue-700">
                    Go to Course
                </Link>
            )}
        </div>
    );
};

export default CourseDetails;
