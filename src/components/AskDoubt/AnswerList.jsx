import React, { useEffect, useState } from 'react';
import { askDoubtService } from '../../services/askDoubtService';
import AddAnswer from './AddAnswer'; 

const AnswerList = ({ questionId }) => {
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const result = await askDoubtService.getAnswersForQuestion(questionId); 
                setAnswers(result.documents);
            } catch (error) {
                console.error('Error fetching answers:', error);
                setAnswers([]);
            }
        };

        fetchAnswers();
    }, [questionId ]);
    const handleAnswerAdded = async () => {
        try {
            const result = await askDoubtService.getAnswersForQuestion(questionId);
            setAnswers(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Answers</h3>
            {answers.length === 0 ? (
                <p>No answers yet. Be the first to answer below!</p>
            ) : (
                <ul className="space-y-4">
                    {answers.map((answer) => (
                        <li key={answer.$id} className="border-b pb-2">
                            <p>{answer.AnswerText}</p>
                            <small>Answered by: {answer.AnsweredBy}</small>
                            <br />
                            <small>Rating: {answer.Rating || 'Not Rated'}</small>
                        </li>
                    ))}
                </ul>
            )}

            <AddAnswer questionId={questionId} onAnswerAdded={handleAnswerAdded} />
        </div>
    );
};

export default AnswerList;
