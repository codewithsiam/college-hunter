import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const MyCollege = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (user?.email) {
                    const response = await fetch(
                        `${import.meta.env.VITE_SERVER_BASE_URL}/admissions?email=${user?.email}`
                    );
                    const data = await response.json();
                    setApplications(data);
                }
                setLoader(false); 
            } catch (error) {
                console.error(error);
                setLoader(false); 
            }
        };

    
        if (user) {
            fetchApplications();
        }
    }, [user]); 

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-5 mb-16 ">My Colleges</h1>
            {!loader && user && applications.length > 0 ? (
                <div className='w-11/12 mx-auto'>
                    {applications.map((app, index) => (
                        <div key={app?._id}>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>
                                              Sl. Number
                                            </th>
                                            <th>College Name & Subject</th>
                                            <th>Candidate Name</th>
                                            <th>Candidate Contact</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{app?.collegeName}</div>
                                                        <div className="text-sm opacity-50">{app?.subject}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{app?.candidateName}</td>
                                            <td>
                                               {app?.candidateEmail}
                                                <br />
                                                <span className="badge badge-ghost badge-sm">{app?.candidatePhoneNumber}</span>
                                            </td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs">Review & Rating</button>
                                            </th>
                                        </tr>

                                    </tbody>


                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : loader ? (
                <p>Loading...</p>
            ) : (
                <p>No applications found.</p>
            )}
        </div>
    );
};

export default MyCollege;
