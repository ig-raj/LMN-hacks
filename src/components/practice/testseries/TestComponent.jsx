import React, { useEffect, useState } from 'react';
import QuestionsService from '../services/QuestionsService';
import TestResponseService from '../services/TestResponseService';

const TestComponent = ({ testId, userId }) => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await QuestionsService.getQuestionsByTestId(testId);
                setQuestions(response.documents);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuestions();
    }, [testId]);

    const handleOptionChange = (questionId, selectedOption) => {
        setResponses({
            ...responses,
            [questionId]: selectedOption
        });
    };

    const handleSubmit = async () => {
        try {
            for (const question of questions) {
                const isCorrect = question.CorrectOption === responses[question.$id];
                await TestResponseService.addResponse({
                    UserID: userId,
                    TestID: testId,
                    QuestionID: question.$id,
                    SelectedOption: responses[question.$id],
                    IsCorrect: isCorrect
                });
            }
            alert("Test submitted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to submit test!");
        }
    };

    return (
        <div>
            <h2>Test</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.$id}>
                        <p>{question.QuestionText}</p>
                        {question.Options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name={`question-${question.$id}`}
                                    value={option}
                                    onChange={() => handleOptionChange(question.$id, option)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Test</button>
            </form>
        </div>
    );
};

export default TestComponent;
