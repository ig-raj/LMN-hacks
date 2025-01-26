import { Query } from "appwrite";
import { appwriteDB } from '../utills/appwriteConfig';
import { ID, Permission, Role } from 'appwrite';
import conf from "../conf/conf";

export const askDoubtService = {
    // 1. Create a new question


    createQuestion: async (questionData) => {
        try {
            return await appwriteDB.createDocument(
                conf.appwriteDatabaseId, // Replace with your correct database ID
                conf.appwriteAskQuestionsCollectionId, // Replace with your correct collection ID
                'unique()', // Generate unique ID
                {
                    QuestionText: questionData.questionText,
                    Subject: questionData.subject,
                    PostedBy: questionData.postedBy,
                    DatePosted: new Date(),
                    Status: 'Unanswered',
                    Subject: questionData.subject,
                },
                [
                    Permission.read(Role.any()),
                    Permission.write(Role.any()), 
                ]
            );
        } catch (error) {
            console.error("askDoubtService :: createQuestion :: error", error);
            throw new Error(`Failed to create question: ${error.message}`);
        }
    },

    // 2. Retrieve a question by its ID
    getQuestionById: async (questionId)=> {
        try {
            return await appwriteDB.getDocument(
                   conf.appwriteDatabaseId, // Database ID
                   conf.appwriteAskQuestionsCollectionId, // Collection ID
                questionId
            );
        } catch (error) {
            console.error("askDoubtService :: getQuestionById :: error", error);
            throw new Error(`Failed to retrieve question: ${error.message}`);
        }
    },

    // 3. List all questions or filter by subject/category with pagination support
    listQuestions: async (page = 1, limit = 10, subject = null, category = null)=> {
        try {
            let filters = [];
            if (subject) filters.push(Query.equal('Subject', subject));
            if (category) filters.push(Query.equal('Category', category));
            
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteAskQuestionsCollectionId, // Collection ID
                filters,
                page,
                limit
            );
        } catch (error) {
            console.error("askDoubtService :: listQuestions :: error", error);
            throw new Error(`Failed to list questions: ${error.message}`);
        }
    },

    // 4. Update question status (e.g., Answered)
    updateQuestionStatus: async (questionId, status) => {
        try {
            return await appwriteDB.updateDocument(
                conf.appwriteDatabaseId,  // Database ID
                conf.appwriteAskQuestionsCollectionId, // Collection ID
                questionId,
                {
                    Status: status,
                }
            );
        } catch (error) {
            console.error("askDoubtService :: updateQuestionStatus :: error", error);
            throw new Error(`Failed to update question status: ${error.message}`);
        }
    },


    
    AddAnswer: async (answersData , rating = null ) => {
                   
                   console.log(answersData.newAnswer) ; 

        try {
            return await appwriteDB.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAskAnswerCollectionId, 
                'unique()',
                {
                    QuestionID: answersData.questionId,
                    AnswerText: answersData.newAnswer,
                    
                    AnsweredBy:answersData. answeredBy,
                    DateAnswered: new Date().toISOString(),
                    MentorAnswer: answersData.mentorAnswer, 
                    Rating: rating, 
                },
                [
                    Permission.read(Role.any()),
                    Permission.write(Role.any()), 
                ]
            );
        } catch (error) {
            console.error("askDoubtService :: createQuestion :: error", error);
            throw new Error(`Failed to create question: ${error.message}`);
        }
    },

    // 6. Get all answers for a particular question
    getAnswersForQuestion: async (questionId) =>{
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId,  // Database ID
                conf.appwriteAskAnswerCollectionId, // Replace with your answers collection ID
                [Query.equal('QuestionID', questionId)]
            );
        } catch (error) {
            console.error("askDoubtService :: getAnswersForQuestion :: error", error);
            throw new Error(`Failed to retrieve answers: ${error.message}`);
        }
    },

    // 7. Create a peer collaboration session for a question
    
    createPeerCollaboration: async (questionId, studentIds) => {
        try {
            return await appwriteDB.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwritePeerCollebeCollectionId,
                'unique()', 
                {
                    QuestionID: questionId,
                    StudentIDs: studentIds,
                    CollaborationNotes: '',
                    DateStarted: new Date(),
                    Active: true,
                },
                [
                    Permission.read(Role.any()),
                    Permission.write(Role.any()), 
                ]
            );
        } catch (error) {
            throw new Error(`Failed to create peer collaboration: ${error.message}`);
        }
    },

    // Add collaboration notes
    addCollaborationNotes: async (collaborationId, notes) => {
        try {
            const collaboration = await appwriteDB.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePeerCollebeCollectionId,
                collaborationId
            );
            const updatedNotes = collaboration.CollaborationNotes 
                ? collaboration.CollaborationNotes + "\n" + notes 
                : notes;

            return await appwriteDB.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePeerCollebeCollectionId,
                collaborationId,
                { CollaborationNotes: updatedNotes }
            );
        } catch (error) {
            throw new Error(`Failed to add collaboration notes: ${error.message}`);
        }
    },

    // End a peer collaboration session
    endPeerCollaboration: async (collaborationId) => {
        try {
            return await appwriteDB.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePeerCollebeCollectionId,
                collaborationId,
                { Active: false }
            );
        } catch (error) {
            throw new Error(`Failed to end peer collaboration: ${error.message}`);
        }
    },
};
