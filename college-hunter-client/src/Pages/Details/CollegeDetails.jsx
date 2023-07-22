import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CollegeDetails = () => {
    const college = useLoaderData();
    const { collegeName, collegeImage, admissionProcess, admissionDates } = college || "";
    console.log('skfjk', college)
    return (
        <div>
            <div className="relative overflow-hidden">
                <img
                    style={{ height: "500px" }}
                    className="w-full object-cover"
                    src={collegeImage}
                    alt="Image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-black opacity-50"></div>
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
        </div>
    );
};

export default CollegeDetails;