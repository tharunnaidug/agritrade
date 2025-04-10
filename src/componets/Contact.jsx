import React, { useState } from 'react';
import { Mail, User, MessageCircle } from 'lucide-react';

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
        setResponseMessage("✅ Success! Your message has been sent.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage("❌ Error! Please try again.");
      }
    } catch (error) {
      setResponseMessage("⚠️ Error! Something went wrong.");
    }
  };

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='card shadow rounded'>
            <div className='card-body p-4' style={{ backgroundColor: 'rgb(213 255 184)' }}>
              <h2 className='text-center mb-4 text-success'> Contact Us</h2>
              
              {responseMessage && (
                <div className='alert alert-info text-center'>{responseMessage}</div>
              )}

              <form method='POST' id='form' onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label d-flex align-items-center gap-2'>
                    <User size={18} /> Name:
                  </label>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label d-flex align-items-center gap-2'>
                    <Mail size={18} /> Email:
                  </label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label d-flex align-items-center gap-2'>
                    <MessageCircle size={18} /> Message:
                  </label>
                  <textarea
                    name='message'
                    className='form-control'
                    rows='4'
                    placeholder='Enter your message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className='text-center'>
                  <button type='submit' className='btn btn-success w-50'>Send Message</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;