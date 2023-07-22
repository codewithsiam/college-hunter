import React from 'react';
import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  const { collegeName, _id, collegeImage, sportsCategories, researchHistory, events, admissionDates } = college || "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img className='h-60 object-cover w-full' src={collegeImage} alt="collegeImage" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {collegeName}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p><span className='font-semibold'>Admission Date:</span> {admissionDates}</p>
        <div className='flex justify-between'>
          <div><span className='font-semibold'>Events:</span> <ul className='list-disc'>
            {events?.map((collegeEvent, index) => <li key={index}>{collegeEvent?.eventName}</li>)}
          </ul> </div>

          <div><span className='font-semibold '>Sports:</span> <ul className='list-disc'>
            {sportsCategories?.map((sport, index) => <li key={index}>{sport?.sportName}</li>)}
          </ul> </div>
        </div>
        <p className='mt-2'><span className='font-semibold'>Research History:</span> {researchHistory} </p>
        <div className="card-actions justify-end">
          <Link to={`/collegeDetails/${_id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
          {/* <div className="badge badge-outline">Fashion</div> 
            <div className="badge badge-outline">Products</div> */}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;