import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const categories = [
  'All', 'Herbicide', 'Pesticide', 'Fungicide',
  'Cereal & Grain Seeds', 'Vegetable Seeds', 'Fruit Seeds', 'Flower & Medicinal Plants',
  'Organic Fertilizer', 'Chemical Fertilizer', 'Soil Conditioner',
  'Hand Tools', 'Irrigation Equipment', 'Machinery',
  'Animal Husbandry & Dairy Farming', 'Greenhouse', 'Smart Farming', 'Packaging & Storage'
];

const UpdateProduct = () => {
  const { adminUpdateProduct, adminAllProducts } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', price: '', qty: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const allProductsResponse = await adminAllProducts();
      if (allProductsResponse?.data?.products) {
        const currentProduct = allProductsResponse.data.products.find((p) => p._id === id);
        if (currentProduct) {
          setProduct(currentProduct);
          setFormData({
            title: currentProduct.title,
            description: currentProduct.description,
            category: currentProduct.category,
            price: currentProduct.price,
            qty: currentProduct.qty
          });
        }
      }
    };
    fetchProduct();
  }, [id, adminAllProducts]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminUpdateProduct(id, formData);
    setIsEditing(false);
    navigate('/admin/allproducts');
  };

  if (!product) return <p className="text-center mt-4">Loading product details...</p>;

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Update Product</h1>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {!isEditing ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {product.description}</p>
            <p className="text-gray-700 mb-1"><strong>Category:</strong> {product.category}</p>
            <p className="text-gray-700 mb-1"><strong>Price:</strong> ₹ {product.price}</p>
            <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {product.qty}</p>
            <button className="btn btn-primary m-3" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="form-control">
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input type="number" name="qty" value={formData.qty} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-success m-3">Save Changes</button>
              <button type="button" className="btn btn-secondary m-3" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;