import React from 'react';
import {Link} from "react-router-dom";
import './ProductCard.scss';
import {IProducts} from "../../models/Interfaces";

interface IProductCard {
  product: IProducts
}

const ProductCard: React.FC<IProductCard> = ({product}) => {
  return (
    <div className='productCard'>
      <div className='productCard__images-wrapper'>
        {product?.images.length > 1
          ? <div className='productCard__images'>
            <img className='productCard__image-first' src={product?.images[0]} alt={product?.title}/>
            <img className='productCard__image-second' src={product?.images[1]} alt={product?.title}/>
          </div>
          : <div className='productCard__images'>
            <img className='productCard__image-first' src={product?.images[0]} alt={product?.title}/>
          </div>
        }
        <Link className='productCard__link' to={`/${product.id}`}/>
      </div>

      <div className='productCard__inner'>
        <div className='productCard__info'>
          <div className='productCard__title'>{product.title}</div>
          <div className='productCard__rating'>{product.rating}</div>
        </div>

        <div className='productCard__info'>
          <div className='productCard__price'>{product.price} грн.</div>
          <Link className='productCard__category' to='/categories'>{product.category}</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;