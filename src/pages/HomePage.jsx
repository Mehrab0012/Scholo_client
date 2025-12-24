import React from 'react';
import Hero from '../components/Hero/Hero';
import TopScholarships from '../components/TopScholarships/TopScholarships';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import FAQ from '../components/FAQ/FAQ';

const HomePage = () => {
    return (
        <div>
            <div>
                <Hero></Hero>
                <TopScholarships></TopScholarships>
                <SuccessStories></SuccessStories>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default HomePage;