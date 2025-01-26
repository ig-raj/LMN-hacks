import React, { useState } from 'react';
import { askDoubtService } from '../../services/askDoubtService';

const AddAnswer = ({ questionId, onAnswerAdded }) => {
    const [newAnswer, setNewAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);



    const handleAddAnswer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const answersData = {
            questionId,
            newAnswer, 
            answeredBy :  'student 1',
            mentorAnswer:false , 
         
        };
       

        try {
            await askDoubtService.AddAnswer(answersData);
            setSubmitSuccess(true);
            setNewAnswer(''); // Clear input field
            setIsSubmitting(false);

            // Notify parent component that a new answer was added
            if (onAnswerAdded) {
                onAnswerAdded();
            }
        } catch (error) {
            console.error('Error adding answer:', error);
            setSubmitSuccess(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Add Your Answer</h3>
            <form onSubmit={handleAddAnswer}>
                <textarea
                    className="w-full border p-2 mt-2 rounded-md"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={4}
                    required
                />
                <button
                    type="submit"
                    className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </form>

            {submitSuccess && (
                <p className="mt-2 text-green-600">Answer submitted successfully!</p>
            )}
        </div>
    );
};

export default AddAnswer;
