import conf from '../conf/conf';
import { Query } from "appwrite";
import { appwriteDB } from '../utills/appwriteConfig';
import { ID , Permission, Role, } from 'appwrite';


const  PracticeServices = {
    getDPPBySubjectAndTopic: async (subject, topic) => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDailyPracticeProblemCollectionId,
                [Query.equal('Subject', subject), Query.equal('Topic', topic)]
            );
        } catch (error) {
            console.error("DPPService :: getDPPBySubjectAndTopic :: error", error);
            throw new Error(`Failed to fetch DPP by subject and topic: ${error.message}`);
        }
    },

    // Fetch all DPPs by Subject
    getDPPBySubject: async (subject) => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDailyPracticeProblemCollectionId,
                [Query.equal('Subject', subject)]
            );
        } catch (error) {
            console.error("DPPService :: getDPPBySubject :: error", error);
            throw new Error(`Failed to fetch DPPs by subject: ${error.message}`);
        }
    },

    addDPP: async (dppData) => {
        try {
            return await appwriteDB.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDailyPracticeProblemCollectionId,
                'unique()', // Generate unique ID
                {
                    title: dppData.title,
                    url: dppData.url,
                    subject: dppData.subject,
                    topic: dppData.topic,
                },
                [
                    Permission.read(Role.any()), 
                    Permission.write(Role.any()), 
                  ]
            );
        } catch (error) {
            console.error("DPPService :: addDPP :: error", error);
            throw new Error(`Failed to add DPP: ${error.message}`);
        }
    },

    // Delete a DPP by its ID
    deleteDPP: async (dppId) => {
        try {
            await appwriteDB.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDailyPracticeProblemCollectionId,
                dppId
            );
            return true;
        } catch (error) {
            console.error("DPPService :: deleteDPP :: error", error);
            throw new Error(`Failed to delete DPP: ${error.message}`);
        }
    },


    updateDPP: async (dppId, dppData) => {
        try {
            return await appwriteDB.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDailyPracticeProblemCollectionId,
                dppId,
                {
                    title: dppData.title,
                    url: dppData.url,
                    subject: dppData.subject,
                    topic: dppData.topic,
                }
            );
        } catch (error) {
            console.error("DPPService :: updateDPP :: error", error);
            throw new Error(`Failed to update DPP:`);
        }
    },

  
    getAllDPPs: async () => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId , 
                conf.appwriteDailyPracticeProblemCollectionId ,
                
            );
        } catch (error) {
            console.error("DPPService :: getAllDPPs :: error", error);
            throw new Error(`Failed to fetch all DPPs: ${error.message}`);
        }
    },


    getImpQuestionsBySubjectAndTopic: async (subject, topic) => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteImpQuestionsCollectionId, 
                [Query.equal('Subject', subject), Query.equal('Topic', topic)]
            );
        } catch (error) {
            console.error("ImportantQuestionsService :: getImpQuestionsBySubjectAndTopic :: error", error);
            throw new Error(`Failed to fetch Important Questions by subject and topic: ${error.message}`);
        }
    },

    // Fetch all Important Questions by Subject
    getImpQuestionsBySubject: async (subject) => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteImpQuestionsCollectionId,
                [Query.equal('Subject', subject)]
            );
        } catch (error) {
            console.error("ImportantQuestionsService :: getImpQuestionsBySubject :: error", error);
            throw new Error(`Failed to fetch Important Questions by subject: ${error.message}`);
        }
    },

    // Add a new Important Question
    addImpQuestion: async (questionData) => {
        try {
            return await appwriteDB.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteImpQuestionsCollectionId, 
                'unique()',
                {
                    Title: questionData.title,
                    Url: questionData.url,
                    Subject: questionData.subject,
                    Topic: questionData.topic,
                },
                [
                    Permission.read(Role.any()), 
                    Permission.write(Role.any())
                ]
            );
        } catch (error) {
            console.error("ImportantQuestionsService :: addImpQuestion :: error", error);
            throw new Error(`Failed to add Important Question: ${error.message}`);
        }
    },

    // Delete an Important Question by ID
    deleteImpQuestion: async (questionId) => {
        try {
            await appwriteDB.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteImpQuestionsCollectionId,
                questionId
            );
            return true;
        } catch (error) {
            console.error("ImportantQuestionsService :: deleteImpQuestion :: error", error);
            throw new Error(`Failed to delete Important Question: ${error.message}`);
        }
    },

    // Update an Important Question by ID
    updateImpQuestion: async (questionId, questionData) => {
        try {
            return await appwriteDB.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteImpQuestionsCollectionId,
                questionId,
                {
                    Title: questionData.title,
                    Url: questionData.url,
                    Subject: questionData.subject,
                    Topic: questionData.topic,
                }
            );
        } catch (error) {
            console.error("ImportantQuestionsService :: updateImpQuestion :: error", error);
            throw new Error(`Failed to update Important Question: ${error.message}`);
        }
    },

    // Fetch all Important Questions
    getAllImpQuestions: async () => {
        try {
            return await appwriteDB.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteImpQuestionsCollectionId,
            );
        } catch (error) {
            console.error("ImportantQuestionsService :: getAllImpQuestions :: error", error);
            throw new Error(`Failed to fetch all Important Questions: ${error.message}`);
        }
    },

    getActiveTestSeries: async () => {
        try {
            return await appwriteDB.listDocuments('YOUR_DATABASE_ID', 'YOUR_TESTSERIES_COLLECTION_ID', [
                Query.equal('Status', 'Active')
            ]);
        } catch (error) {
            console.error("TestSeriesService :: getActiveTestSeries :: error", error);
            throw new Error(`Failed to fetch active test series: ${error.message}`);
        }
    },

    // Fetch test series by ID
    getTestSeriesById: async (testId) => {
        try {
            return await appwriteDB.getDocument('YOUR_DATABASE_ID', 'YOUR_TESTSERIES_COLLECTION_ID', testId);
        } catch (error) {
            console.error("TestSeriesService :: getTestSeriesById :: error", error);
            throw new Error(`Failed to fetch test series: ${error.message}`);
        }
    },

    // Add a new test series
    addTestSeries: async (testSeriesData) => {
        try {
            return await appwriteDB.createDocument(
                'YOUR_DATABASE_ID',
                'YOUR_TESTSERIES_COLLECTION_ID',
                'unique()',
                {
                    Title: testSeriesData.Title,
                    Duration: testSeriesData.Duration,
                    TotalMarks: testSeriesData.TotalMarks,
                    Status: 'Active',
                    CreatedBy: testSeriesData.CreatedBy,
                    CreatedAt: new Date().toISOString()
                },
                [Permission.read(Role.any()), Permission.write(Role.user(testSeriesData.CreatedBy))]
            );
        } catch (error) {
            console.error("TestSeriesService :: addTestSeries :: error", error);
            throw new Error(`Failed to add test series: ${error.message}`);
        }
    },

    getQuestionsByTestId: async (testId) => {
        try {
            return await appwriteDB.listDocuments('YOUR_DATABASE_ID', 'YOUR_QUESTIONS_COLLECTION_ID', [
                Query.equal('TestID', testId)
            ]);
        } catch (error) {
            console.error("QuestionsService :: getQuestionsByTestId :: error", error);
            throw new Error(`Failed to fetch questions: ${error.message}`);
        }
    },

    // Add a new question
    addQuestion: async (questionData) => {
        try {
            return await appwriteDB.createDocument(
                'YOUR_DATABASE_ID',
                'YOUR_QUESTIONS_COLLECTION_ID',
                'unique()',
                {
                    TestID: questionData.TestID,
                    QuestionText: questionData.QuestionText,
                    Options: questionData.Options,
                    CorrectOption: questionData.CorrectOption,
                    Marks: questionData.Marks,
                    Type: "MCQ"
                },
                [Permission.read(Role.any()), Permission.write(Role.user(questionData.CreatedBy))]
            );
        } catch (error) {
            console.error("QuestionsService :: addQuestion :: error", error);
            throw new Error(`Failed to add question: ${error.message}`);
        }
    },

    addResponse: async (responseData) => {
        try {
            return await appwriteDB.createDocument(
                'YOUR_DATABASE_ID',
                'YOUR_TESTRESPONSE_COLLECTION_ID',
                'unique()',
                {
                    UserID: responseData.UserID,
                    TestID: responseData.TestID,
                    QuestionID: responseData.QuestionID,
                    SelectedOption: responseData.SelectedOption,
                    IsCorrect: responseData.IsCorrect,
                    SubmittedAt: new Date().toISOString()
                },
                [Permission.read(Role.user(responseData.UserID))]
            );
        } catch (error) {
            console.error("TestResponseService :: addResponse :: error", error);
            throw new Error(`Failed to add response: ${error.message}`);
        }
    },

    // Fetch responses by TestID and UserID
    getResponsesByTestIdAndUserId: async (testId, userId) => {
        try {
            return await appwriteDB.listDocuments('YOUR_DATABASE_ID', 'YOUR_TESTRESPONSE_COLLECTION_ID', [
                Query.equal('TestID', testId),
                Query.equal('UserID', userId)
            ]);
        } catch (error) {
            console.error("TestResponseService :: getResponsesByTestIdAndUserId :: error", error);
            throw new Error(`Failed to fetch responses: ${error.message}`);
        }
    }
}

export default PracticeServices;