import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CollegeDetails = () => {
    const college = useLoaderData();
    const { collegeName, collegeImage, admissionProcess, admissionDates, events, sportsCategories, researchWorks } = college || "";
    return (
        <div>
            <div className="relative overflow-hidden">
                <img
                    style={{ height: "480px" }}
                    className="w-full object-cover"
                    src={collegeImage}
                    alt="Image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <div className="text-center text-white">
                        <h2 className="md:text-5xl  text-2xl font-bold text-shadow mb-10">
                            {collegeName}
                        </h2>
                        <p className='text-lg font-semibold my-4'>Admission Date: {admissionDates[0]} - {admissionDates[1]}</p>
                        <p className="mx-auto md:text-lg w-4/6">
                            Admission Process:  {admissionProcess}
                        </p>

                    </div>
                </div>
            </div>
            {/* below the image  */}
            {/* events  */}
            <div className='w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold text-center my-10'>Events</h1>
                {
                    events?.map((collegeEvent, index) => <div key={index}>
                        <p> <span className='font-semibold '>{collegeEvent?.eventName}:</span> {collegeEvent?.eventDetails} </p>
                    </div>)
                }
            </div>
            {/* research works  */}
            <div className='w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold text-center my-10'>Research History</h1>
               <div className='flex flex-col md:flex-row gap-10 '>
               {
                    researchWorks?.map((research, index) => <div 
                    key={index}
                    >
                        <p> <span className='font-semibold '>Department:</span> {research?.departmentName}  </p>
                        <p> <span className='font-semibold '>Researchers:</span> {research?.researchers}  </p>
                    </div>)
                }
               </div>
            </div>
            {/* sports category  */}
            <div className='w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold text-center my-10'>Sports</h1>
                {
                    sportsCategories?.map((sport, index) => <div key={index}>
                        <p> <span className='font-semibold '>{sport?.sportName}:</span> {sport?.sportDetails} </p>
                    </div>)
                }
            </div>

        </div>
    );
};

export default CollegeDetails;