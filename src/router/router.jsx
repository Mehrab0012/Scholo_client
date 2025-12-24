import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import Students from "../components/Students/Students.jsx";

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

            }
        ]
    }
]);
export default router;