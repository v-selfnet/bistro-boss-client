import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Calender from "../Pages/Dashboard/Calender/Calender";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/menu',
                element: <Menu></Menu>
            },
            {
                path:'/order/:category',
                // element: <PrivateRoute><Order></Order></PrivateRoute>
                element: <Order></Order>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path:'/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        // element: <MyCart></MyCart>,
        children: [
            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path: 'calender',
                element: <Calender></Calender>
            },
            {
                path: 'payment',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            },
        ]
    }
])

