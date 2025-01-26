import conf from "../conf/conf";
import { appwriteDB } from "../utills/appwriteConfig";
import { Query } from "appwrite";

const CourseService = {
  // Fetch all free courses
  getAllCourses: async () => {
    try {
      const response = await appwriteDB.listDocuments(
         conf.appwriteDatabaseId,
         conf.appwriteFreeCoursesCollectionId
        );
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Fetch a single course by ID
  getCourseById: async (id) => {
    try {
      const response = await appwriteDB.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFreeCoursesCollectionId,
         id
        );
      return response;
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      throw error;
    }
  },

  // Add a new course
  addCourse: async (courseData) => {
    try {
      const response = await appwriteDB.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFreeCoursesCollectionId ,
        'unique()', 
        {
            title: courseData.title,
            image: courseData.image,
            teacher: courseData.teacher,
            subject: courseData.subject,
            category:courseData.class,
            duretion:courseData.duration,
            url:[
              courseData.url
            ],
        }
      );
      return response;
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  },

  // Update an existing course
  updateCourse: async (id, updatedData) => {
    try {
      const response = await appwriteDB.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFreeCoursesCollectionId,
         id,
         updatedData
        );
      return response;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete a course
  deleteCourse: async (id) => {
    try {
      await appwriteDB.deleteDocument(conf.appwriteDatabaseId, conf.appwriteFreeLecturesCollectionId, id);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  addLecture: async (lectureData) => {
    console.log(lectureData.courseId);
    try {
      const response = await appwriteDB.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFreeLecturesCollectionId ,
        'unique()', 
        {
          couresId: lectureData.courseId,
          title: lectureData.title,
          topic: lectureData.topic,
          subject: lectureData.subject,
          url:lectureData.url , 
        }
      );
      return response;
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  },
  

   getLecturesByCourseId: async (courseId) => {
    try {
      if (!courseId) {
        console.error('courseId is not defined or empty');
        throw new Error('courseId is required');
      }
      const response = await appwriteDB.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFreeLecturesCollectionId,
        [Query.equal('couresId',courseId)] // Ensure attribute name matches exactly
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching lectures by courseId:', error);
      throw error;
    }
  },
  
  

  updateCourse: async (id, updatedData) => {
    try {
      const response = await appwriteDB.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFreeLecturesCollectionId,
         id,
         updatedData
        );
      return response;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      await appwriteDB.deleteDocument(conf.appwriteDatabaseId, conf.appwriteFreeLecturesCollectionId, id);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

 
  
  createNote: async (newNote) => {
    console.log(newNote);
    try {
      const response = await appwriteDB.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotesCollectionId ,
        'unique()', 
        {
          courseId: newNote.CourseID,
          title: newNote.title,
          topic: newNote.topic,
          subject: newNote.subject,
          url:newNote.url , 
          class: newNote.class , 
        }
      );
      return response;
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  },
  






  // Get notes by course ID
   getNotesByCourseId :async (courseId) => {
    try {
      const response = await appwriteDB.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteNotesCollectionId,
        [Query.equal('courseId', courseId)]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching notes by course ID:', error);
      throw error;
    }
  },
  
  // Update an existing note by ID
   updateNote : async (noteId, updatedData) => {
    try {
      const response = await appwriteDB.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotesCollectionId,
        noteId,
        updatedData
      );
      return response;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },
  
  // Delete a note by ID
   deleteNote : async (noteId) => {
    try {
      const response = await appwriteDB.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNotesCollectionId,
        noteId
      );
      return response;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
  

};




export default CourseService;
