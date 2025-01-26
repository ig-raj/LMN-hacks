import React, { useState, useEffect } from 'react';
import { databases } from '../services/appwrite';
import { Link } from 'react-router-dom';

const StudentDashboard = ({ userId }) => {
    const [courses, setCourses] = useState([]);
    const [liveClasses, setLiveClasses] = useState([]);

    useEffect(() => {
        // Fetch Enrolled Courses
        const fetchCourses = async () => {
            const response = await databases.listDocuments('[YOUR_DATABASE_ID]', 'enrollments', [`userId=${userId}`]);
            setCourses(response.documents);
        };

        // Fetch Upcoming Live Classes
        const fetchLiveClasses = async () => {
            const response = await databases.listDocuments('[YOUR_DATABASE_ID]', 'live_classes', [`userId=${userId}`]);
            setLiveClasses(response.documents);
        };

        fetchCourses();
        fetchLiveClasses();
    }, [userId]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <div className="my-4">
                <h2 className="text-xl">Enrolled Courses</h2>
                <div className="grid grid-cols-3 gap-4">
                    {courses.map(course => (
                        <div key={course.$id} className="card">
                            <h3 className="text-lg">{course.name}</h3>
                            <p>{course.description}</p>
                            <Link to={`/course/${course.$id}`} className="text-blue-500 hover:text-blue-700">Go to course</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-xl">Upcoming Live Classes</h2>
                <ul>
                    {liveClasses.map(cls => (
                        <li key={cls.$id}>
                            {cls.title} - <span>{new Date(cls.start_time).toLocaleString()}</span>
                            <a href={cls.meet_link} target="_blank" rel="noreferrer" className="text-blue-500">Join</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentDashboard;
