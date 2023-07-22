import React from 'react';
import Search from './Search/Search';
import CardSection from './CardSection/CardSection';
import PhotoGallery from './PhotoGallery/PhotoGallery';


const Home = () => {
    return (
        <div>
            <Search></Search>
            <CardSection></CardSection>
            <h1 className='text-center font-bold text-4xl mt-28 mb-10'>Graduate's Group Pictures</h1>
            <PhotoGallery></PhotoGallery>
        </div>
    );
};

export default Home;