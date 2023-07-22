import React, { useEffect, useState } from 'react';

const Search = () => {
    const [allToys, setAllToys] = useState([]);
    const [limit, setLimit] = useState(20);
    const [searchText, setSearchText] = useState("");
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchToys = async () => {
            try {
                const response = await fetch(`https://toy-trove-server.vercel.app/allToys?limit=${limit}&toyName=${searchText}`);
                const data = await response.json();
                setAllToys(data);
                setLoader(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchToys();
    }, [limit, searchText]);

    const handleLimit = () => {
        setLimit(0);
    };

    const handleSearch = () => {
        setSearchText(searchText)
    };
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
        </div>
    );
};

export default Search;