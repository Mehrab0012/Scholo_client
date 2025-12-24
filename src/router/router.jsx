import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import Students from "../components/Students/Students.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import AllScholerships from "../pages/AllScholerships.jsx";
import About from "../pages/About.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "/students",
                Component: Students,
            },
            {
                path: "authentication",
                Component: AuthLayout,
                children:[
                    {
                        path: 'logIn',
                        Component: Login,
                    },
                    {
                        path: 'register',
                        Component: Register,
                    }
                ]
            },
            {
                path: "/browse",
                Component: AllScholerships,
            },
            {
                path: "/about",
                Component: About,
            }
        ]
    }
]);
export default router;