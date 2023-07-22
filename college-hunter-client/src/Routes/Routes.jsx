import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../Layout/ClientLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CollegeDetails from "../Pages/Details/CollegeDetails";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import MyCollege from "../Pages/MyCollege/MyCollege";
import Profile from "../Pages/Profile/Profile";


const router = createBrowserRouter([
    {
        path: '/',
        element: <ClientLayout></ClientLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: 'collegeDetails/:id',
                element: <CollegeDetails></CollegeDetails>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/college/${params.id}`)
            },
           {
            path: '/college',
            element: <Colleges></Colleges>,
            loader: () => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges`)
           },
           {
            path: '/admission',
            element: <Admission></Admission>,
            loader: () => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges`)
           },
           {
            path: '/myCollege',
            element: <MyCollege></MyCollege>
           },
           {
            path: '/profile',
            element: <Profile></Profile>
           }
        ],
    }
])

export default router;