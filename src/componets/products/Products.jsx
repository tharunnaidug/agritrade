import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Products = () => {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(products);
  return (
    <div>products</div>
  )
}

export default Products