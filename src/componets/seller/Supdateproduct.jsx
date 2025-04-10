import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { toast, Bounce } from 'react-toastify';

const Supdateproduct = () => {
  const { sellerProduct, updateProduct, deleteProduct } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    qty: '',
  });
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await sellerProduct(id);
      setProduct(res?.product);
      setReviews(res?.reviews || []);
      setAvgRating(res?.avgRating || null);
      setFormData({
        title: res?.product?.title,
        description: res?.product?.description,
        category: res?.product?.category,
        price: res?.product?.price,
        qty: res?.product?.qty,
      });
      setImages(res?.product?.imgSrc || []);
    } catch (error) {
      toast.error('Failed to fetch product!', { position: 'bottom-left', autoClose: 5000, theme: 'dark', transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                await deleteProduct(id);
                toast.success('Product deleted successfully!', { autoClose: 3000 });
                closeToast();
                navigate('/seller/allproducts');
              }}
            > Yes </button>
            <button className="btn btn-secondary btn-sm" onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      { autoClose: false, position: 'bottom-left', theme: 'light' }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleFileUpload = async (file) => {
    const formDataImg = new FormData();
    formDataImg.append('image', file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=9abdfc8259278993fe03e52c22e5bada`, { method: 'POST', body: formDataImg });
    const data = await response.json();
    return data.data.url;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of newImages) {
        const url = await handleFileUpload(file);
        uploadedUrls.push(url);
      }

      const finalImageArray = [...images, ...uploadedUrls];
      const updatedData = { ...formData, imgSrc: finalImageArray };

      await updateProduct(updatedData, id);
      toast.success('Product updated successfully!', { position: 'bottom-left', autoClose: 3000, theme: 'dark', transition: Bounce });
      setIsEditing(false);
      setNewImages([]);
      fetchProduct();
    } catch (error) {
      toast.error('Failed to update product!', { position: 'bottom-left', autoClose: 3000, theme: 'dark', transition: Bounce });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (!product) return <p className="text-center text-danger mt-4">Product not found!</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <h5>Product Images</h5>
            <div className="d-flex flex-wrap gap-3">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="position-relative" style={{ width: '100px', height: '100px' }}>
                    <img src={img} alt="Product" className="img-fluid rounded object-fit-cover" style={{ width: '100%', height: '100%' }} />
                    {isEditing && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
                        onClick={() => handleRemoveImage(index)}
                      >  ✕</button>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-light text-muted d-flex align-items-center justify-content-center rounded" style={{ width: '100px', height: '100px' }}>
                  No Image
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-3">
                <label className="form-label">Add New Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="form-control"
                  onChange={handleAddNewImages}
                />
              </div>
            )}
          </div>

          <div className="col-md-6">
            {isEditing ? (
              <form onSubmit={handleUpdate}>
                {['title', 'description', 'category', 'price', 'qty'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    {field === 'description' ? (
                      <textarea
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        rows="3"
                        required
                      />
                    ) : (
                      <input
                        type={field === 'price' || field === 'qty' ? 'number' : 'text'}
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                ))}
                <div className="d-flex gap-3">
                  <button type="submit" className="btn btn-success" disabled={uploading}>
                    {uploading ? 'Updating...' : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3>{product.title}</h3>
                <p className="text-muted">{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.qty} available</p>
                {avgRating && <p><strong>Avg Rating:</strong> ⭐ {avgRating}</p>}
                <div className="d-flex gap-3">
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {!isEditing && (
        <div className="card shadow-sm p-4 mt-4">
          <h5 className="mb-3">Customer Reviews ({reviews.length})</h5>
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{rev.user.name}</strong>
                  <span className="badge bg-warning text-dark">⭐ {rev.rating}</span>
                </div>
                <p className="mb-1">{rev.comment}</p>
                <small className="text-muted">{new Date(rev.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Supdateproduct;
