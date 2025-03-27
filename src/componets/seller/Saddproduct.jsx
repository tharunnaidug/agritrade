import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const SaddProduct = () => {
  const { addProduct } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    qty: '',
    imgScr: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    'All', 'Herbicide', 'Pesticide', 'Fungicide',
    'Cereal & Grain Seeds', 'Vegetable Seeds', 'Fruit Seeds', 'Flower & Medicinal Plants',
    'Organic Fertilizer', 'Chemical Fertilizer', 'Soil Conditioner',
    'Hand Tools', 'Irrigation Equipment', 'Machinery',
    'Animal Husbandry & Dairy Farming', 'Greenhouse', 'Smart Farming', 'Packaging & Storage'
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleFileUpload = async (file) => {
    const formDataImg = new FormData();
    formDataImg.append('image', file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=9abdfc8259278993fe03e52c22e5bada`, {
      method: 'POST',
      body: formDataImg,
    });
    const data = await response.json();
    return data.data.url;
  };

  const handleMultipleFiles = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setLoading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await handleFileUpload(file);
        uploadedUrls.push(url);
      }
      setFormData((prev) => ({ ...prev, imgScr: uploadedUrls }));
    } catch (error) {
      console.error('Image upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Product Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid Price is required';
    if (!formData.qty || isNaN(formData.qty)) newErrors.qty = 'Valid Quantity is required';
    if (formData.imgScr.length === 0) newErrors.imgScr = 'At least one image is required';
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
      setLoading(true);
      const data = await addProduct(formData);
      if (data?.message) {
        navigate('/seller/allproducts');
      } else {
        console.error('Failed to add product', data?.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2 bg-success p-3 rounded text-white" style={{ maxWidth: '500px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Product Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter product title"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">Product Images (Multiple At Once)</label>
          <input
            type="file"
            className={`form-control ${errors.imgScr ? 'is-invalid' : ''}`}
            id="images"
            multiple
            onChange={handleMultipleFiles}
          />
          {errors.imgScr && <div className="invalid-feedback">{errors.imgScr}</div>}
        </div>

        {formData.imgScr.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Image Preview:</label>
            <div className="d-flex gap-2 flex-wrap">
              {formData.imgScr.map((img, idx) => (
                <img key={idx} src={img} alt="product" width="70" height="70" className="rounded" />
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-warning mt-3" disabled={loading}>
          {loading ? 'Please wait...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default SaddProduct;