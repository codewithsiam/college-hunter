import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterImage from '/register-image.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';



const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { registerWithPass, updateUserProfile } = useContext(AuthContext);
  const [passMatch, setPassMatch] = useState('');

  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    // console.log(data);

    if(data?.password !== data?.confirmPassword) {
      setPassMatch("Password not matched"); 
      return;
    }else{setPassMatch('')}

    //creating a new user
    registerWithPass(data?.email, data?.password)
      .then(result => {
        const loggedUser = result.user;
        // console.log(loggedUser);

        // add additional information of user   
        updateUserProfile(data?.name, data?.photoURL)
          .then(() => {
            const saveUser = { 
              name: data.name, 
              email: data.email , 
              photoURL: data.photoURL,
              university: '', 
              address: '', 
              role: 'regularUser' };
              // console.log('saved user',saveUser);
             

            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
            },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                // console.log("after post",data)
                if (data?.insertedId) {
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate(from, {replace: true})
                }
              })
          })
      }).catch(err => {
        console.log(err.message);
        Swal.fire(
          'Something went wrong',
          `${err.message}`,
          'error'
        )
      })

  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full mt-4'>
      <div className='hidden sm:block'>
        <img className='max-w-[600px] mx-auto mt-16' src={RegisterImage} alt="" />
      </div>

      <div className='bg-white flex flex-col justify-center'>
        <form className='max-w-[450px] w-full mx-auto rounded-lg bg-gray-200 p-8 px-8 shadow-2xl' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-4xl text-gray-800 font-bold text-center'>Register</h2>
          <div className='flex flex-col text-gray-800 py-2'>
            <label>Name</label>
            <input
              className='rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none'
              type="text"
              {...register('name')}
              placeholder='Enter Your Name'
            />
          </div>
          <div className='flex flex-col text-gray-800 py-2'>
            <label>Photo URL</label>
            <input
              className='rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none'
              type="text"
              {...register('photoURL')}
              placeholder='Enter Your Photo URL'
            />
          </div>
          <div className='flex flex-col text-gray-800 py-2'>
            <label>Email</label>
            <input
              className='rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none'
              type="email"
              {...register('email', { required: true })}
              placeholder='Enter Your Email'
            />
            {errors.email?.type === 'required' && <p className="text-red-600 text-sm">Email field is required</p>}
          </div>
          <div className='flex flex-col text-gray-800 py-2'>
            <label>Password</label>
            <input
              className='rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none'
              type="password"
              {...register('password', {
                minLength: 6,
                maxLength: 32,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                required: true
              })}
              placeholder='Enter a Password'
            />
            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
          </div>
          <div className='flex flex-col text-gray-800 py-2'>
            <label>Confirm Password</label>
            <input
              className='rounded-lg text-black bg-gray-300 mt-2 p-2 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none'
              type="password"
              {...register('confirmPassword', { required: true })}
              placeholder='Confirm Password'
            />
            {errors.confirmPassword?.type === 'required' && <p className="text-red-600 text-sm">Confirm Password field is required</p>}
            {passMatch && <p className="text-red-600 text-sm">{passMatch}</p>}
          </div>

          <button className='w-full my-5 py-2 bg-primary shadow-lg shadow-indigo-500/50 hover:shadow-indigo-400/40 text-white font-semibold rounded-lg'>Register</button>
          <p className='text-gray-800 text-center'>Already have an account? Please
            <Link to="/login" className='text-primary'> Log In</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
