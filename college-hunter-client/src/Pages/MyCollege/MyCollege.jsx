import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useProfile from '../../Hooks/useProfile';
import { useForm } from 'react-hook-form';

const MyCollege = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loader, setLoader] = useState(true);
    const { handleSubmit, register, reset } = useForm();
    const [dbUser] = useProfile();
    const [selectedCollege, setSelectdCollege] = useState([])

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

    console.log('sfsdf', dbUser[0]);

    const handleFeedback = (cls) => {
        setSelectdCollege(cls);
        window.customModal.showModal();
    };


    const onSubmit = (data) => {

        const feedBackData = {
            candidateName: dbUser[0]?.name,
            candidateEmail: user?.email,
            collegeName: selectedCollege?.collegeName,
            collegeId: selectedCollege?.collegeId,
            collegeImage: selectedCollege?.image,
            review: data.review,
            rating: data.rating,
        };



        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedBackData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    reset();
                    Swal.fire(
                        'Feedback Submitted!',
                        `Your feedback had been submitted successfully!`,
                        'success'
                    );
                }
            })
            .catch((err) => console.log(err));

        // Clear the selected college and close the modal after submission
        setSelectdCollege(null);
        window.customModal.close();
    };



    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-5 mb-16 ">My Colleges</h1>
            {!loader && user && applications.length > 0 ? (
                <div className='w-11/12 mx-auto'>

                    <div>
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
                                {applications.map((app, index) => (
                                       <tr  key={app?._id}>
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
                                                <button onClick={() => handleFeedback(app)} className="btn btn-ghost btn-xs">Review & Rating</button>
                                            </th>
                                        </tr>
   ))}
                                    </tbody>


                                </table>
                        </div>
                    </div>
                 
                </div>
            ) : loader ? (
                <p>Loading...</p>
            ) : (
                <p>No applications found.</p>
            )}


            {/* Feedback Modal */}
            {/* Open the modal using ID.showModal() method */}
            <dialog id="customModal" className="modal">
                <div className="modal-box p-6 bg-white rounded-lg shadow-lg">
                    <button
                        onClick={() => window.customModal.close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600"
                    >
                        ✕
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <h3 className="font-bold text-2xl mb-6">
                            Admission for {selectedCollege?.collegeName}
                        </h3>



                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Rating
                            </label>
                            <input
                                {...register('rating', { required: true })}
                                type="number"
                                className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={5}
                                max={5}
                                min={0}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Give a feedback
                            </label>
                            <input
                                {...register('review', { required: true })}
                                type="text"
                                className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Type feedback"
                            />
                        </div>



                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ml-4"
                                onClick={() => window.customModal.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyCollege;
