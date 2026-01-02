import React, { useContext } from 'react';
import Hero from '../components/Hero/Hero';
import TopScholarships from '../components/TopScholarships/TopScholarships';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import FAQ from '../components/FAQ/FAQ';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
 const { user } = useContext(AuthContext);  
    return (
        <div>
            <div>
                <ToastContainer></ToastContainer>
                <Hero></Hero>
                <TopScholarships></TopScholarships>
                <SuccessStories></SuccessStories>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default HomePage;