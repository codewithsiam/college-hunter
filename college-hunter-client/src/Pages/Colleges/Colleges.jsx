import { useLoaderData } from "react-router-dom";


const Colleges = () => {
    const colleges = useLoaderData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-11/12 mx-auto">
      {colleges.map(( { collegeImage, collegeName, collegeRating, admissionDates,  }, index) => (
         <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
         <figure>
           <img src={collegeImage} alt={collegeName} />
         </figure>
         <div className="card-body">
           <h2 className="card-title">{collegeName}</h2>
           <p>Rating: {collegeRating}</p>
           <p>Admission Dates: {admissionDates.join(' - ')}</p>
           <p>Number of Research: {}</p>
           <div className="card-actions justify-end">
             <button className="btn btn-primary">Details</button>
           </div>
         </div>
       </div>

      ))}
    </div>
  );
};

export default Colleges;