import conf from '../../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteArticleBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteArticleBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteArticleBucketId,
            fileId
        )
    }

    async createUser({ name, username, email, mobile_number, password, role="Student" }) {
        try {
            // Create the user in Appwrite's authentication system first
            const userAccount = await account.create('unique()', email, password);
    
            // Store user details in the custom collection
            const userDocument = await databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId, // Your custom collection for user info
                userAccount.$id, // Use the Appwrite-generated user ID
                {
                    name,
                    username,
                    email,
                    mobile_number,
                    password, // Ideally hash the password before storing
                    role, // Assign 'Admin', 'Student', or 'Educator' here
                }
            );
            
            return userDocument;
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    async updateUser({ userId, name, username, email, mobile_number, role }) {
        try {
          const updatedUserData = {
            name,
            username,
            email,
            profilePhoto,
            mobile_number,
            role,
          };
    
          const response = await databases.updateDocument(
            appwriteConfig.databaseId,  // Database ID from config
            conf.appwriteUsersCollectionId,  // Users collection ID from config
            userId,
            updatedUserData
          );
    
          return response;
        } catch (error) {
          console.error('Appwrite Service :: updateUser :: Error:', error);
          throw error;
        }
      }

      async getUser(userId) {
        try {
          const response = await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUsersCollectionId ,
            userId // ID of the user document to fetch
          );
          return response;
        } catch (error) {
          console.error('Appwrite Service :: getUser :: Error:', error);
          throw error;
        }
      }

      async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteUserBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteUserBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteUserBucketId,
            fileId
        )
    }

      async createMessage({ message, senderId, groupId, messageType }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteGroupMessagesCollectionId,
            'unique()',  // Auto-generate document ID
            {
              message,
              senderId,  // This references a user ID
              groupId,   // This references a group ID
              messageType,
              createdAt: new Date().toISOString(),
            }
          );
        } catch (error) {
          console.error('Error creating group message:', error);
        }
      }
    
      async getMessage(messageId) {
        return await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteGroupMessagesCollectionId, messageId);
      }
    
      async updateMessage(messageId, updatedData) {
        return await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteGroupMessagesCollectionId, messageId, updatedData);
      }
    
      async deleteMessage(messageId) {
        return await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteGroupMessagesCollectionId, messageId);
      }





      async createCourse({ title, description, price, duration, courseCategories, startDate, endDate, banner }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCoursesCollectionId,
            'unique()',
            {
              title,
              description,
              price,
              duration,
              courseCategories,
              startDate,
              endDate,
              banner
            }
          );
        } catch (error) {
          console.error('Error creating course:', error);
        }
      }
    
      async getCourse(courseId) {
        return await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCoursesCollectionId, courseId);
      }
    
      async updateCourse(courseId, updatedData) {
        return await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCoursesCollectionId, courseId, updatedData);
      }
    
      async deleteCourse(courseId) {
        return await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCoursesCollectionId, courseId);
      }

      async createProblem({ title, subject, url, topic }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteDailyPracticeProblemCollectionId,
            'unique()',
            {
              title,
              subject,
              url,
              topic
            }
          );
        } catch (error) {
          console.error('Error creating practice problem:', error);
        }
      }
    
      async getProblem(problemId) {
        return await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteDailyPracticeProblemCollectionId, problemId);
      }
    
      async updateProblem(problemId, updatedData) {
        return await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteDailyPracticeProblemCollectionId, problemId, updatedData);
      }
    
      async deleteProblem(problemId) {
        return await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteDailyPracticeProblemCollectionId, problemId);
      }




      async createGroupChat({ groupName, participants, createdBy }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteGroupChatCollectionId,
            'unique()',
            {
              groupName,
              participants,  // Array of user IDs
              createdBy,     // User ID of the creator
              createdAt: new Date().toISOString()
            }
          );
        } catch (error) {
          console.error('Error creating group chat:', error);
        }
      }
    
      async getGroupChat(groupId) {
        return await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteGroupChatCollectionId, groupId);
      }
    
      async updateGroupChat(groupId, updatedData) {
        return await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteGroupChatCollectionId, groupId, updatedData);
      }
    
      async deleteGroupChat(groupId) {
        return await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteGroupChatCollectionId, groupId);
      }




      async createTestSeries({ title, duration, totalMarks, status }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTestSeriesCollectionId,
            'unique()',
            {
              title,
              duration,
              totalMarks,
              status
            }
          );
        } catch (error) {
          console.error('Error creating test series:', error);
        }
      }
    
      async getTestSeries(testSeriesId) {
        return await databases.getDocument(conf.appwriteDatabaseId, conf.appwriteTestSeriesCollectionId, testSeriesId);
      }
    
      async updateTestSeries(testSeriesId, updatedData) {
        return await databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteTestSeriesCollectionId, testSeriesId, updatedData);
      }
    
      async deleteTestSeries(testSeriesId) {
        return await databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteTestSeriesCollectionId, testSeriesId);
      }



      async createTestResponse({ userId, testId, questionId, selectedOption, isCorrect }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,  // Database ID
            conf.appwriteTestResponseCollectionId,  // TestResponse Collection ID
            'unique()',  // Generate unique document ID
            {
              userId,          // The ID of the user who took the test
              testId,          // The ID of the test
              questionId,      // The ID of the question being answered
              selectedOption,  // The option chosen by the user
              isCorrect,       // Whether the user's answer was correct or not
            }
          );
        } catch (error) {
          console.error('Error creating test response:', error);
        }
      }
    
      /**
       * Get a Test Response by ID
       * @param {string} testResponseId - ID of the test response document
       */
      async getTestResponse(testResponseId) {
        try {
          return await databases.getDocument(
            conf.appwriteDatabaseId, 
            conf.appwriteTestResponseCollectionId, 
            testResponseId
          );
        } catch (error) {
          console.error('Error getting test response:', error);
        }
      }
    
      /**
       * Update an existing Test Response document
       * @param {string} testResponseId - ID of the test response to update
       * @param {Object} updatedData - Object containing the fields to update
       */
      async updateTestResponse(testResponseId, updatedData) {
        try {
          return await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteTestResponseCollectionId,
            testResponseId,
            updatedData  // The fields to update (e.g., `selectedOption`, `isCorrect`)
          );
        } catch (error) {
          console.error('Error updating test response:', error);
        }
      }
    
      /**
       * Delete a Test Response by ID
       * @param {string} testResponseId - ID of the test response to delete
       */
      async deleteTestResponse(testResponseId) {
        try {
          return await databases.deleteDocument(
            conf.appwriteDatabaseId, 
            conf.appwriteTestResponseCollectionId, 
            testResponseId
          );
        } catch (error) {
          console.error('Error deleting test response:', error);
        }
      }
    
      /**
       * Get all Test Responses for a specific Test and User
       * @param {string} testId - ID of the test
       * @param {string} userId - ID of the user
       */
      async getResponsesByTestAndUser(testId, userId) {
        try {
          const response = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteTestResponseCollectionId,
            [
              Query.equal('testId', testId),
              Query.equal('userId', userId)
            ]
          );
          return response.documents;
        } catch (error) {
          console.error('Error getting test responses by test and user:', error);
        }
      }


     async createImpQuestion({ title, url, subject }) {
       try {
         return await databases.createDocument(
           conf.appwriteDatabaseId,  // Database ID
           conf.appwriteImpQuestionsCollectionId,  // ImpQuestions Collection ID
           'unique()',  // Generate unique document ID
           {
             title,   // Title of the important question
             url,     // URL associated with the question
             subject  // Subject related to the question
           }
         );
       } catch (error) {
         console.error('Error creating important question:', error);
       }
     }
   
     /**
      * Get an Important Question by ID
      * @param {string} impQuestionId - ID of the important question document
      */
     async getImpQuestion(impQuestionId) {
       try {
         return await databases.getDocument(
           conf.appwriteDatabaseId, 
           conf.appwriteImpQuestionsCollectionId, 
           impQuestionId
         );
       } catch (error) {
         console.error('Error getting important question:', error);
       }
     }
   
     /**
      * Update an existing Important Question document
      * @param {string} impQuestionId - ID of the important question to update
      * @param {Object} updatedData - Object containing the fields to update
      */
     async updateImpQuestion(impQuestionId, updatedData) {
       try {
         return await databases.updateDocument(
           conf.appwriteDatabaseId,
           conf.appwriteImpQuestionsCollectionId,
           impQuestionId,
           updatedData  // The fields to update (e.g., `title`, `url`, `subject`)
         );
       } catch (error) {
         console.error('Error updating important question:', error);
       }
     }
   
     /**
      * Delete an Important Question by ID
      * @param {string} impQuestionId - ID of the important question to delete
      */
     async deleteImpQuestion(impQuestionId) {
       try {
         return await databases.deleteDocument(
           conf.appwriteDatabaseId, 
           conf.appwriteImpQuestionsCollectionId, 
           impQuestionId
         );
       } catch (error) {
         console.error('Error deleting important question:', error);
       }
     }
   
     /**
      * Get all Important Questions for a specific Subject
      * @param {string} subject - Subject name
      */
     async getQuestionsBySubject(subject) {
       try {
         const response = await databases.listDocuments(
           conf.appwriteDatabaseId,
           conf.appwriteImpQuestionsCollectionId,
           [
             Query.equal('subject', subject)
           ]
         );
         return response.documents;
       } catch (error) {
         console.error('Error getting important questions by subject:', error);
       }
     }




     async createQuestion({ testId, questionText, correctOption, marks, type, options }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,  // Database ID
            conf.appwriteQuestionsCollectionId,  // Questions Collection ID
            'unique()',  // Generate unique document ID
            {
              testId,  // Test ID
              questionText,  // Question text
              correctOption,  // Correct answer option
              marks,  // Marks for the question
              type,  // Question type (MCQ, True/False, etc.)
              options  // List of possible answer options
            }
          );
        } catch (error) {
          console.error('Error creating question:', error);
        }
      }
    
      /**
       * Get a Question by ID
       * @param {string} questionId - ID of the question document
       */
      async getQuestion(questionId) {
        try {
          return await databases.getDocument(
            conf.appwriteDatabaseId, 
            conf.appwriteQuestionsCollectionId, 
            questionId
          );
        } catch (error) {
          console.error('Error getting question:', error);
        }
      }
    
      /**
       * Update an existing Question document
       * @param {string} questionId - ID of the question to update
       * @param {Object} updatedData - Object containing the fields to update
       */
      async updateQuestion(questionId, updatedData) {
        try {
          return await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteQuestionsCollectionId,
            questionId,
            updatedData  // The fields to update (e.g., `questionText`, `marks`, etc.)
          );
        } catch (error) {
          console.error('Error updating question:', error);
        }
      }
    
      /**
       * Delete a Question by ID
       * @param {string} questionId - ID of the question to delete
       */
      async deleteQuestion(questionId) {
        try {
          return await databases.deleteDocument(
            conf.appwriteDatabaseId, 
            conf.appwriteQuestionsCollectionId, 
            questionId
          );
        } catch (error) {
          console.error('Error deleting question:', error);
        }
      }
    
      /**
       * Get all Questions for a specific Test
       * @param {string} testId - ID of the test
       */
      async getQuestionsByTest(testId) {
        try {
          const response = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteQuestionsCollectionId,
            [
              Query.equal('testId', testId)
            ]
          );
          return response.documents;
        } catch (error) {
          console.error('Error getting questions by test:', error);
        }
      }




      async createLecture({ thumbnail, title, faculty, duration, subject, startTime, videoUrl, isLive }) {
        try {
          return await databases.createDocument(
            conf.appwriteDatabaseId,  // Database ID
            conf.appwriteLecturesCollectionId,  // Lectures Collection ID
            'unique()',  // Generate unique document ID
            {
              thumbnail,
              title,
              faculty,
              duration,
              subject,
              startTime,
              videoUrl,
              isLive
            }
          );
        } catch (error) {
          console.error('Error creating lecture:', error);
        }
      }
    
      /**
       * Get a Lecture by ID
       * @param {string} lectureId - ID of the lecture document
       */
      async getLecture(lectureId) {
        try {
          return await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteLecturesCollectionId,
            lectureId
          );
        } catch (error) {
          console.error('Error getting lecture:', error);
        }
      }
    
      /**
       * Update an existing Lecture document
       * @param {string} lectureId - ID of the lecture to update
       * @param {Object} updatedData - Object containing the fields to update
       */
      async updateLecture(lectureId, updatedData) {
        try {
          return await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteLecturesCollectionId,
            lectureId,
            updatedData
          );
        } catch (error) {
          console.error('Error updating lecture:', error);
        }
      }
    
      /**
       * Delete a Lecture by ID
       * @param {string} lectureId - ID of the lecture to delete
       */
      async deleteLecture(lectureId) {
        try {
          return await databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteLecturesCollectionId,
            lectureId
          );
        } catch (error) {
          console.error('Error deleting lecture:', error);
        }
      }
    
      /**
       * Get all Lectures for a specific subject
       * @param {string} subject - Subject of the lectures
       */
      async getLecturesBySubject(subject) {
        try {
          const response = await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteLecturesCollectionId,
            [
              Query.equal('subject', subject)
            ]
          );
          return response.documents;
        } catch (error) {
          console.error('Error getting lectures by subject:', error);
        }
      }

}


const service = new Service()
export default service