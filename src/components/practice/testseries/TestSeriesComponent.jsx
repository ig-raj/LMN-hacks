import React, { useEffect, useState } from 'react';
import TestSeriesService from '../services/TestSeriesService';

const TestSeriesComponent = () => {
    const [testSeriesList, setTestSeriesList] = useState([]);

    useEffect(() => {
        const fetchTestSeries = async () => {
            try {
                const response = await TestSeriesService.getActiveTestSeries();
                setTestSeriesList(response.documents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTestSeries();
    }, []);

    return (
        <div>
            <h2>Active Test Series</h2>
            <ul>
                {testSeriesList.map((testSeries) => (
                    <li key={testSeries.$id}>
                        <h3>{testSeries.Title}</h3>
                        <p>Duration: {testSeries.Duration} minutes</p>
                        <p>Total Marks: {testSeries.TotalMarks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestSeriesComponent;
