import React from 'react';

const CollegeCard = ({college}) => {
  const {collegeName, collegeId, collegeImage, sportsCategories, researchHistory, events, admissionDates} = college || "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img className='h-60 object-cover w-full' src={collegeImage} alt="collegeImage" /></figure>
      <div className="card-body">
        <h2 className="card-title">
        {collegeName}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p><span className='font-semibold'>Admission Date:</span> {admissionDates}</p>
        <p><span className='font-semibold'>Events:</span> {events}</p>
        <p><span className='font-semibold'>Research History:</span> {researchHistory}</p>
        <p><span className='font-semibold'>Sports:</span> {sportsCategories}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Details</button>
          {/* <div className="badge badge-outline">Fashion</div> 
            <div className="badge badge-outline">Products</div> */}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;