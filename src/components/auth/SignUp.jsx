import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { useDispatch } from 'react-redux';
import {  login } from '../../store/AuthSlice'
import Cookies from 'js-cookie';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const { user, profile } = await AuthService.createUser(
        data.name,
        data.email,
        data.password,
        data.role
      );
       if (user) {
      Cookies.set('userId', user.$id, { expires: 7 });
      dispatch(login({ user, profile }));
      navigate('/');
    }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input 
            id="name" 
            {...register('name', { required: 'Name is required' })} 
            className="mt-2 p-2 w-full border rounded" 
            placeholder="Enter your name" 
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>

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

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">Role</label>
          <select 
            id="role" 
            {...register('role', { required: 'Role is required' })}
            className="mt-2 p-2 w-full border rounded"
          >
            <option value="">Select a role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <span className="text-red-600">{errors.role.message}</span>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
