import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/contact', data);
      if (response.status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      {isSubmitted ? (
        <p>Thank you for contacting us! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
            ></textarea>
            {errors.message && <p className="error-message">{errors.message.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
