import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';

// const AdmissionForm = ({ collegeName }) => {
const AdmissionForm = () => {
const collegeName = 'dhaka college';

  const { user } = useContext(AuthContext); 
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      candidateName: user?.displayName || '',
      candidateEmail: user?.email || '',
    },
  });

  // Watch for changes in the candidateEmail field to prevent changes
  const candidateEmail = watch('candidateEmail');

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Perform form submission logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900">Admission Form for {collegeName}</h2>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Candidate Name</label>
          <Controller
            name="candidateName"
            control={control}
            render={({ field }) => <input {...field} type="text" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => <input {...field} type="text" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Candidate Email</label>
          <input
            type="email"
            value={candidateEmail}
            readOnly
            className="form-input bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Candidate Phone Number</label>
          <Controller
            name="candidatePhoneNumber"
            control={control}
            render={({ field }) => <input {...field} type="tel" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <textarea {...field} className="form-textarea" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => <input {...field} type="date" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => <input {...field} type="file" className="form-input" />}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
