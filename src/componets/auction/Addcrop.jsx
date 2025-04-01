import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCrop = () => {
  const { addAuction } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: '',
    description: '',
    baseBidPrice: '',
    auctionDateTime: '',
    additionalInfo: '',
    images: [],
    state: '',
    paymentMode: '',
    quantity: '',
    unit: 'Kg' // Default unit is 'Kg'
  });

  const [errors, setErrors] = useState({});

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
    "Delhi", "Puducherry"
  ];

  const units = ["Kg", "Liter", "Pcs", "Bag", "Ton", "Meter", "Dozen"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleFileUpload = async (file) => {
    if (!file.type.startsWith('image/')) return;
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=9abdfc8259278993fe03e52c22e5bada`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.data.url;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = await Promise.all(files.map(file => handleFileUpload(file)));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls.filter(url => url)] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product) newErrors.product = 'Product Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.baseBidPrice) newErrors.baseBidPrice = 'Base Bid Price is required';
    if (!formData.auctionDateTime) newErrors.auctionDateTime = 'Auction Date & Time is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (isNaN(formData.quantity) || formData.quantity <= 0) newErrors.quantity = 'Please enter a valid quantity';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await addAuction(formData);
      toast.success('Success! It Will Be Reviewed By Our Team');
      navigate("/auction");
    } catch (error) {
      console.error('Error adding auction:', error);
      toast.error('Failed to add auction. Please try again.');
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded text-white" style={{ maxWidth: '500px' }}>
      <h2>Add Your Crop To Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Product Name</label>
          <input type="text" placeholder='Enter Product Name' className={`form-control ${errors.product ? 'is-invalid' : ''}`} id="product" value={formData.product} onChange={handleInputChange} />
          {errors.product && <div className="invalid-feedback">{errors.product}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea placeholder='Enter Product Details' className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" value={formData.description} onChange={handleInputChange}></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="baseBidPrice" className="form-label">Base Bid Price</label>
          <input type="text" placeholder='Enter Minimum Price' className={`form-control ${errors.baseBidPrice ? 'is-invalid' : ''}`} id="baseBidPrice" value={formData.baseBidPrice} onChange={handleInputChange} />
          {errors.baseBidPrice && <div className="invalid-feedback">{errors.baseBidPrice}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="auctionDateTime" className="form-label">Auction Date & Time</label>
          <input type="datetime-local" className={`form-control ${errors.auctionDateTime ? 'is-invalid' : ''}`} id="auctionDateTime" value={formData.auctionDateTime} onChange={handleInputChange} />
          {errors.auctionDateTime && <div className="invalid-feedback">{errors.auctionDateTime}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">Select State</label>
          <select className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" value={formData.state} onChange={handleInputChange}>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
          <select
            className={`form-control ${errors.paymentMode ? 'is-invalid' : ''}`}
            id="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Online (Agritrade)">Online (Agritrade)</option>
          </select>
          {errors.paymentMode && <div className="invalid-feedback">{errors.paymentMode}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} id="quantity" value={formData.quantity} onChange={handleInputChange} />
          {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="unit" className="form-label">Unit</label>
          <select
            className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
            id="unit"
            value={formData.unit}
            onChange={handleInputChange}
          >
            {units.map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">Upload Images</label>
          <input type="file" multiple className="form-control" id="images" onChange={handleImageUpload} accept="image/*" />
          {errors.images && <div className="invalid-feedback d-block">{errors.images}</div>}
        </div>

        <div className="mb-3 d-flex flex-wrap">
          {formData.images.map((image, index) => (
            <img key={index} src={image} alt={`Preview ${index}`} className="img-thumbnail m-1" style={{ width: '100px', height: '100px' }} />
          ))}
        </div>

        <div className="mb-3">
          <label htmlFor="additionalInfo" className="form-label">Additional Info</label>
          <textarea placeholder='Any Additional Info or Comments' className="form-control" id="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange}></textarea>
        </div>

        <button type="submit" className="btn btn-warning mt-3">Submit</button>
      </form>
    </div>
  );
};

export default AddCrop;