import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/AuthSlice';
import Cookies from 'js-cookie';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          dispatch(authLogin({ user }));
          navigate('/');
        }
      } catch (error) {
        console.log("No active session found.");
      }
    };

    checkSession();
  }, [dispatch, navigate]);

  const onSubmit = async (data) => {
    try {
      const { session, user } = await AuthService.login(data.email, data.password);
      if (session) {
        dispatch(authLogin({ session, user }));
        Cookies.set('userId', user.$id, { expires: 7 });
        navigate('/');
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            id="email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className="mt-2 p-2 w-full border rounded" 
            placeholder="Enter your email" 
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input 
            id="password" 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
            className="mt-2 p-2 w-full border rounded" 
            placeholder="Enter your password" 
          />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
