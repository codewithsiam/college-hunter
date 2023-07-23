import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useProfile from '../../Hooks/useProfile';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, setValue, reset } = useForm();

    const [loader, setLoader] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [dbUser, refetch] = useProfile();

    useEffect(() => {
        if (dbUser && dbUser.length > 0) {
            const { name, email, university, address } = dbUser[0];
            setValue('name', name);
            setValue('email', email);
            setValue('university', university);
            setValue('address', address);
        }
    }, [dbUser, setValue]);


    console.log("sdf", user)

    const onSubmit = (data) => {
        console.log('Form data:', data);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Update Profile',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#50C878',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update Profile!',
        }).then((result) => {
            if (result.isConfirmed) {
                const userData = {
                    name: data.name,
                    university: data.university,
                    address: data.address,
                };

                axios
                    .put(`${import.meta.env.VITE_SERVER_BASE_URL}/users/profile?email=${user?.email}`, { userData }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.success) {
                            reset(); 
                            refetch();
                            setEditMode(false); 
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Profile has been updated!`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    };





    if (!dbUser) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-2/3 mx-auto">
            <div className={`${editMode ? "hidden" : "block"} flex flex-col md:flex-row gap-10 justify-center mt-20 items-center space-x-4 mb-4`}>
                <div className='flex flex-col gap-4'>
                    <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden">
                        {/* Show user profile photo here */}
                        {/* Replace the below img src with the URL of the user's profile photo */}
                        <img src={dbUser[0]?.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button
                        className="btn btn-primary mx-auto w-20"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p>Full Name:</p>
                        <h1 className="text-xl font-semibold">{dbUser[0]?.name}</h1>
                    </div>
                    <div>
                        <p>Email:</p>
                        <h1 className="text-xl font-semibold">{user?.email}</h1>
                    </div>
                    <div>
                        <p>University:</p>
                        <h1 className="text-xl font-semibold">{dbUser[0]?.university}</h1>
                    </div>
                    <div>
                        <p>Address:</p>
                        <h1 className="text-xl font-semibold">{dbUser[0]?.address}</h1>
                    </div>
                    
                </div>

            </div>

            <div className={`${editMode ? 'block' : 'hidden'} flex items-center justify-center gap-4`}>
                <h1 className='text-3xl text-center font-bold my-8'>Edit Profile</h1>
                <button onClick={() => setEditMode(false)} className="btn w-20 btn-error">
                    Cancle
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={editMode ? 'block' : 'hidden'}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        defaultValue={dbUser[0]?.name}
                        className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        readOnly
                        defaultValue={dbUser[0]?.email}
                        className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">University</label>
                    <input
                        {...register('university')}
                        type="text"
                        defaultValue={dbUser[0]?.university}
                        className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <textarea
                        {...register('address')}
                        defaultValue={dbUser[0]?.address}
                        className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-4">

                    <button type="submit" className="btn btn-primary w-40">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
