import React, { useState, useEffect } from 'react';
import { databases, ID } from '../services/appwrite';

const TeacherDashboard = ({ userId }) => {
    const [courses, setCourses] = useState([]);
    const [newLiveClass, setNewLiveClass] = useState({ title: '', startTime: '' });

    useEffect(() => {
        // Fetch Teacher's Courses
        const fetchCourses = async () => {
            const response = await databases.listDocuments('[YOUR_DATABASE_ID]', 'courses', [`teacherId=${userId}`]);
            setCourses(response.documents);
        };

        fetchCourses();
    }, [userId]);

    const scheduleLiveClass = async () => {
        await databases.createDocument('[YOUR_DATABASE_ID]', 'live_classes', ID.unique(), {
            ...newLiveClass,
            teacherId: userId,
            meet_link: await scheduleGoogleMeet(), // Call the function that triggers Google Meet API
        });
        setNewLiveClass({ title: '', startTime: '' });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <div className="my-4">
                <h2 className="text-xl">Your Courses</h2>
                <div className="grid grid-cols-3 gap-4">
                    {courses.map(course => (
                        <div key={course.$id} className="card">
                            <h3 className="text-lg">{course.name}</h3>
                            <p>{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-xl">Schedule New Live Class</h2>
                <input
                    type="text"
                    value={newLiveClass.title}
                    onChange={(e) => setNewLiveClass({ ...newLiveClass, title: e.target.value })}
                    placeholder="Class Title"
                />
                <input
                    type="datetime-local"
                    value={newLiveClass.startTime}
                    onChange={(e) => setNewLiveClass({ ...newLiveClass, startTime: e.target.value })}
                />
                <button onClick={scheduleLiveClass} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Schedule Live Class
                </button>
            </div>
        </div>
    );
};

export default TeacherDashboard;
