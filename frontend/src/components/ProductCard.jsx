import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';

const ProductCard = ({ product }) => {
  const [message, setMessage] = useState('');

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card product-card h-100">
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <img 
            src={product.imageUrl || '/api/placeholder/300/200'} 
            className="card-img-top product-image" 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/api/placeholder/300/200';
            }}
          />
        </Link>
        
        <div className="card-body d-flex flex-column">
          <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
            <h5 className="card-title text-truncate" title={product.name}>
              {product.name}
            </h5>
          </Link>
          
          <p className="card-text text-muted small flex-grow-1">
            {product.description && product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description
            }
          </p>
          
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 text-primary mb-0">
              {formatPrice(product.price)}
            </span>
            <small className="text-muted">
              库存: {product.stockQuantity}
            </small>
          </div>
          
          {product.category && (
            <div className="mb-2">
              <span className="badge bg-secondary">{product.category}</span>
            </div>
          )}
          
          <div className="mt-auto">
            {message && (
              <div className={`alert ${message.includes('成功') || message.includes('已添加') ? 'alert-success' : 'alert-warning'} alert-sm py-1 mb-2`}>
                <small>{message}</small>
              </div>
            )}
            
            {product.stockQuantity > 0 ? (
              <div className="d-grid gap-2">
                
                <Link 
                  to={`/products/${product.id}`} 
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="fas fa-eye me-1"></i>
                  查看详情
                </Link>
              </div>
            ) : (
              <div className="d-grid gap-2">
                <button className="btn btn-secondary btn-sm" disabled>
                  <i className="fas fa-times me-1"></i>
                  暂时缺货
                </button>
                
                <Link 
                  to={`/products/${product.id}`} 
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="fas fa-eye me-1"></i>
                  查看详情
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;