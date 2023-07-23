import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = '/login'

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please provide your email for the password reset link.',
          });
      return;
    }

    try {
      await resetPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Please check your email for the password reset link.',
      });
      navigate(from, { relative: true });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-semibold mb-4">Password Reset</h2>
      <div className="w-64">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          ref={emailRef}
          type="email"
          className="form-input w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={handleResetPassword}
      >
        Send Reset Link
      </button>
    </div>
  );
};

export default ResetPassword;
