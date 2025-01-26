import Header from '../components/common/Header'
import Courses from '../components/courses/Courses'
import { useSelector,  } from 'react-redux';

function CoursesPage() {
    const user = useSelector((state) => state.auth.user);
console.log(user)
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
console.log(isLoggedIn)
    return ( 
        <>
         <Header/>
         <Courses/>        
        </>
     );
}

export default CoursesPage;