import React, { useState } from 'react';
import { askDoubtService } from '../../services/askDoubtService';

const AskQuestion = ({ userId }) => {
    // State for form inputs
    const [questionText, setQuestionText] = useState('');
    const [subject, setSubject] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validate required fields
        if (!questionText.trim()) {
            setErrorMessage('Question text cannot be empty');
            return;
        }
        if (!subject.trim()) {
            setErrorMessage('Subject cannot be empty');
            return;
        }

        // Prepare question data
        const questionData = {
            questionText,
            subject,
            postedBy: userId, // Assuming `userId` is passed in as a prop
        };

        try {
            // Call service to create a new question
            await askDoubtService.createQuestion(questionData);
            setSuccessMessage('Question added successfully!');
            setQuestionText(''); // Clear the form
            setSubject('');
        } catch (error) {
            setErrorMessage('Error adding question. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-2xl font-semibold mb-4">Ask a New Question</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Question Text */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Question Text</label>
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Type your question here..."
                    />
                </div>

              

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Algebra, Physics, World War II"
                    />
                </div>

                {/* Error and Success Messages */}
                {errorMessage && (
                    <div className="text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="text-green-500 text-sm">
                        {successMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit Question
                </button>
            </form>
        </div>
    );
};

export default AskQuestion;
