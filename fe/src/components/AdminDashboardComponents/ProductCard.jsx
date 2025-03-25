import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/ProductCard.css';

const ProductCard = ({ product, onDelete, isDeleting }) => {
  const handleDeleteClick = () => {
    onDelete(product._id);
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.media[0].url} alt={product.name} />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-brand">{product.brand_name}</p>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/admindashboard/products/edit/${product.id}`} className="editbutton">Edit</Link>
          <button className="button" onClick={handleDeleteClick} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
