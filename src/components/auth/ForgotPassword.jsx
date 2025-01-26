import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/authService'; // Import your auth service

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      // Call the forgot password service
      await AuthService.forgotPassword(data.email);
      setEmailSent(true); // Set success message
    } catch (err) {
      console.error('Error sending reset email:', err);
      setError('Error sending reset email. Please try again later.');
    }
  };

  return (
    <div>
      {emailSent ? (
        <p>A password reset email has been sent to your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              {...register('email', { required: 'Email is required' })} 
              placeholder="Enter your email" 
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <button type="submit">Send Reset Email</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
