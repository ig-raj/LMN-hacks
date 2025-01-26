import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Practices from "./pages/PracticePages/Practices";

import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/LoginInPage';

import AskDoubtPage from './pages/AskDoubtPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursesPage from './pages/CoursesPage';
import CreateCoursePage from './components/courses/CreateCoursePage';
import UpdateCoursePage from './components/courses/UpdateCoursePage';
import { useSelector } from 'react-redux';
import AddLectures from './components/courses/AddLectures';
import LearningPath from './pages/LearningPath';
import SkillTest from './pages/SkillTest';
import AutoMail from './pages/AutoMail';






function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    
    <Router>
      <Routes>
        {
          isLoggedIn ?    <Route path="/" element={<CoursesPage/>} />
           :  ( <Route path="/" element={<Home />} />)
        }
       
        {/* About Page */}
        <Route path="/about" element={<About />} />
        <Route path="/learning" element={<LearningPath/>} />
        <Route path="/skilltest" element={<SkillTest/>} />
        <Route path="/automail" element={<AutoMail/>} />
     

        {/* Auth Pages */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Practice Pages */}
        <Route path="/practice" element={<Practices />} />
       <Route path="/askdoubt" element={<AskDoubtPage/>} />
       
        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/courses/add" element={<CreateCoursePage/>} />
        <Route path="/courses/edit/:courseId" element={<UpdateCoursePage/>} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/addlecture" element={<AddLectures />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
