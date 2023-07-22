import { Link, useLoaderData } from "react-router-dom";


const Colleges = () => {
    const colleges = useLoaderData();
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-5 mb-16 ">All Colleges</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-11/12 mx-auto">
                {colleges.map(({_id, collegeImage, collegeName, collegeRating, admissionDates, researchWorks }, index) => (
                    <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure>
                            <img className='h-60 object-cover w-full' src={collegeImage} alt={collegeName} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{collegeName}</h2>
                            <p>Rating: {collegeRating}</p>
                            <p>Admission Dates: {admissionDates.join(' - ')}</p>
                            <p>Number of Research: {researchWorks?.length}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/collegeDetails/${_id}`}>

                                    <button className="btn btn-primary">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Colleges;
