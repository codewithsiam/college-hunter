import React, { useContext, useState } from 'react';
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmissions from '../../Hooks/useAdmissions';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Admission = () => {
  const colleges = useLoaderData();
  const { user } = useContext(AuthContext);
  const [selectedCollege, setSelectdCollege] = useState(null);
  const { handleSubmit, register, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const [admission] = useAdmissions();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAdmission = (college) => {
    // validation
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setSelectdCollege(college);
    window.customModal.showModal();
  };

  const onSubmit = (data) => {
    // ... (same as before)

    // Clear the selected college and close the modal after submission
    setSelectdCollege(null);
    window.customModal.close();
  };

  // ... (same as before)

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mt-5 mb-16">Admission</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colleges.map((college, index) => (
          <div key={index} className="bg-white rounded p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{college?.collegeName}</h2>
            <button
              disabled={admission.find((adm) => adm?.collegeId === college?.collegeId)}
              className="btn btn-primary w-full mb-1"
              onClick={() => handleAdmission(college)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="customModal" className="modal">
        {/* ... (same as before) */}
      </dialog>
    </div>
  );
};

export default Admission;
