import React from 'react';
import AnswerList from '../components/AskDoubt/AnswerList';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { questionId } = useParams(); // Get the question ID from URL params

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Question Detail</h2>

            {/* Render the AnswerList component */}
            <AnswerList questionId={questionId} />
        </div>
    );
};

export default QuestionDetail;
