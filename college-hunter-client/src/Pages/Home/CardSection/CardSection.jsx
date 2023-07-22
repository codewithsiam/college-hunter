import React, { useEffect, useState } from 'react';
import CollegeCard from './CollegeCard';

const CardSection = () => {
    const [allColleges, setAllColleges] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges?limit=3`);
                const data = await response.json();
                setAllColleges(data);
                setLoader(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchColleges();
    }, []);

    return (
        <div className='w-11/12 mx-auto flex flex-col md:flex-row gap-4 my-4'>
            {
                allColleges?.map((college) =>
                <CollegeCard college={college} key={college?.collegeId}></CollegeCard>
                )
            }
        </div>
    );
};

export default CardSection;