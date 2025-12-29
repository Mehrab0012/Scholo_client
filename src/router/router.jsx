import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import Students from "../components/Students/Students.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import About from "../pages/About.jsx";
import BrowseScholarships from "../layouts/BrowseScholarships.jsx";
import Universities from "../pages/Universities.jsx";
import ScholershipDetails from "../pages/ScholershipDetails.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AddScholarship from "../pages/AddScholarship.jsx";

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
                children: [
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
                path: "/browse-scholarships",
                element: <PrivateRoute><BrowseScholarships></BrowseScholarships></PrivateRoute>,
                children: [


                ]
            },
            {
                path: "/about",
                Component: About,
            },
            {
                path: "/universities",
                Component: Universities,
            },
            {
                path: 'scholership-details/:id',
                element: <PrivateRoute>
                    <ScholershipDetails></ScholershipDetails>
                </PrivateRoute>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute>
                    <DashboardLayout></DashboardLayout>
                </PrivateRoute>
            },
            {
                path: 'add-scholarship',
                element: <PrivateRoute>
                    <AddScholarship></AddScholarship>
                </PrivateRoute>
            }

        ]
    }
]);
export default router;