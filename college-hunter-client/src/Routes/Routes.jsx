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
import Dashboard from "../Layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../Pages/AdminPanel/ManageUsers";
import ResetPassword from "../Pages/Login/ResetPassword";
import AddCollege from "../Pages/AdminPanel/AddCollege";


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
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'reset',
                element: <ResetPassword></ResetPassword>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'collegeDetails/:id',
                element: <PrivateRoute><CollegeDetails></CollegeDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/college/${params.id}`)
            },
            {
                path: 'college',
                element: <Colleges></Colleges>,
                loader: () => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges`)
            },
            {
                path: 'admission',
                element: <Admission></Admission>,
                loader: () => fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges`)
            },
            {
                path: 'myCollege',
                element: <PrivateRoute><MyCollege></MyCollege></PrivateRoute>
            },
            {
                path: 'admin',
                element: <Dashboard></Dashboard>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ],
    },
    {
        path: 'admin',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'addCollege',
                element: <AddCollege></AddCollege>,
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
        ]
    }
])

export default router;