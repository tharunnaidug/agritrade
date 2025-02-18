import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData(e.target);
    formDataObject.append("access_key", "39a4e0db-fd3b-45d4-8296-195799ab7878");
    
    const object = Object.fromEntries(formDataObject);
    const json = JSON.stringify(object);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await res.json();
      if (result.success) {
        setResponseMessage("Success! Your message has been sent.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage("Error! Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error! Something went wrong.");
    }
  };

  return (
    <div className='container mt-5 p-2 rounded' style={{backgroundColor:"rgb(130, 249, 86)"}}>
      <h2 className='text-center mx-4'>Contact Us</h2>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form method='POST' id='form' onSubmit={handleSubmit}>
            <div id='result'>{responseMessage && <p className='alert alert-info'>{responseMessage}</p>}</div>
            <div className='mb-3'>
              <label className='form-label'>Name:</label>
              <input type='text' name='name' className='form-control' placeholder='Enter your name' value={formData.name} onChange={handleChange} required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email:</label>
              <input type='email' name='email' className='form-control' placeholder='Enter your email' value={formData.email} onChange={handleChange} required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Message:</label>
              <textarea name='message' className='form-control' rows='4' placeholder='Enter your message' value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type='submit' className='btn btn-primary w-50'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;