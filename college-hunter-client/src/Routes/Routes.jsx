import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../Layout/ClientLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CollegeDetails from "../Pages/Details/CollegeDetails";


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
                loader: ({params}) => fetch(`http://localhost:5000/college/${params.id}`)
            },
           
        ],
    }
])

export default router;