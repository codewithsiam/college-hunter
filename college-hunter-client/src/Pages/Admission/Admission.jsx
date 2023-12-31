
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAllCollege from '../../Hooks/useAllCollege';
import useAdmissions from '../../Hooks/useAdmissions';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Admission = () => {
  const [admission] = useAdmissions();
const [colleges, refetch] = useAllCollege();
  const { user } = useContext(AuthContext);
  const [selectedCollege, setSelectdCollege] = useState(null);
  const { handleSubmit, register, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleAdmission = (college) => {
    setSelectdCollege(college);
    window.customModal.showModal();
  };

  const onSubmit = (data) => {
    // console.log(data.image);
    const formData = new FormData();
    formData.append('image', data.image[0]);

    fetch(img_hosting_url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const collegeData = {
            candidateName: data.candidateName,
            subject: data.subject,
            candidateEmail: user?.email,
            candidatePhoneNumber: data.candidatePhoneNumber,
            address: data.address,
            dateOfBirth: data.dateOfBirth,
            image: imgURL,
            collegeName: selectedCollege?.collegeName ,
            collegeId: selectedCollege?.collegeId,
          };
          handleSwalFireWithUpdate(collegeData);
        }
      })
      .catch((err) => {
        Swal.fire('Something went wrong!', err.message, 'error');
      });


    setSelectdCollege(null);
    refetch();
    window.customModal.close();
  };




const handleSwalFireWithUpdate = (collegeData) => {
  axios
    .post(`${import.meta.env.VITE_SERVER_BASE_URL}/admissions`, collegeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const data = response.data;
      if (data.insertedId) {
        reset();
        refetch();
        Swal.fire(
          'Admission Submitted!',
          `Your application for ${selectedCollege?.collegeName} has been submitted successfully!`,
          'success'
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-5 mb-16">Admission</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 w-11/12 mx-auto">
      {colleges.map((college, index) => (
          <div key={index} className="bg-white rounded p-4 shadow-md">
            <h2 className="text-md md:text-xl   font-semibold mb-4">{college?.collegeName}</h2>
            <button
              disabled={admission?.find((adm) => adm?.collegeId === college?.collegeId)}
              className="btn btn-primary w-full mb-1"
              onClick={() => handleAdmission(college)}
            >
              Apply Now
            </button>
          </div>
        ))}

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
                  Candidate Name
                </label>
                <input
                  {...register('candidateName', { required: true })}
                  type="text"
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject
                </label>
                <input
                  {...register('subject', { required: true })}
                  type="text"
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Candidate Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Candidate Phone Number
                </label>
                <input
                  {...register('candidatePhoneNumber', { required: true })}
                  type="tel"
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  {...register('address', { required: true })}
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth
                </label>
                <input
                  {...register('dateOfBirth', { required: true })}
                  type="date"
                  className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  {...register('image', { required: true })}
                  type="file"
                  className="file-input bg-indigo-100 h-11 file-input-bordered w-full"
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
    </div>
  );
};

export default Admission;
