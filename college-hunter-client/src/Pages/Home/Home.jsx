import React from 'react';
import Search from './Search/Search';
import CardSection from './CardSection/CardSection';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import Reviews from './Reviews/Reviews';
import ResearchPapers from './ResearchPapers/ResearchPapers';


const Home = () => {
    return (
        <div>
            <Search></Search>
            <CardSection></CardSection>
            <h1 className='text-center font-bold text-4xl mt-28 mb-10'>Graduate's Group Pictures</h1>
            <PhotoGallery></PhotoGallery>
            <ResearchPapers></ResearchPapers>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;