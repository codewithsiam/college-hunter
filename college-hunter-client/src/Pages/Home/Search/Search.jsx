import React, { useEffect, useState } from 'react';

const Search = () => {
    const [allColleges, setAllColleges] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loader, setLoader] = useState(true);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                // for auto search with typing 
                if(searchText){
                    setSearch(true);
                }

                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/allColleges?limit=1&collegeName=${searchText}`);
                const data = await response.json();
                setAllColleges(data);
                setLoader(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchColleges();
    }, [searchText]);

   
    const handleSearch = () => {
        setSearchText(searchText)
        setSearch(true);
    };

    // console.log('sdf',allColleges);

    return (
        <div>
            <div className="w-10/12 md:w-3/12 md:ml-auto mx-auto mt-4">

                <div className="input-group">
                    <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search a college" name="search" className="input input-bordered" />
                    <button onClick={handleSearch} type="submit" className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                {/* <label className="label">
                    Search a college
                </label> */}

            </div>
            <div className={`${search || searchText !== '' ? "block" : "hidden"} w-11/12 md:w-9/12 mx-auto my-2`}>

                {
                    allColleges?.map(({ collegeName, collegeId, collegeImage, sportsCategories, researchHistory, events, admissionDates }) =>

                        <div key={collegeId} className="card lg:card-side bg-base-100 shadow-xl">
                            <figure><img src={collegeImage} alt="collegeImage" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{collegeName}</h2>
                                <p>Admission Date: {admissionDates}</p>
                                <div>
                                    
                                <div>Events: <ul>
                                    {events?.map((collegeEvent, index) => <li key={index}>{collegeEvent?.eventName}</li>)}
                                    </ul> </div>
                                    
                                <div>Sports: <ul>
                                    {sportsCategories?.map((sport, index) => <li key={index}>{sport?.sportName}</li>)}
                                    </ul> </div>
                                </div>
                                <p>Research History: {researchHistory} </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Details</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Search;