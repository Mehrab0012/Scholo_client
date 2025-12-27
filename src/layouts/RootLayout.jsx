import React from 'react';
import {Outlet} from "react-router";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <div>
                <ToastContainer></ToastContainer>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;