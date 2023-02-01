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

      <div className='productCard__image'>
        <img src={product.images[0]} alt={product.title}/>
      </div>

      <div className='productCard__inner'>

        <div className='productCard__info'>
          <h3 className='productCard__title'>{product.title}</h3>
          <p className='productCard__price'>{product.price}$</p>
          <p className='productCard__description'>{product.description}</p>
          <p className='productCard__category'>{product.category}</p>
        </div>

        <Link className='productCard__link' to={`/${product.id}`}>Read more</Link>

      </div>

      <Link className='productCard__link-overflow' to={`/${product.id}`}/>

    </div>
  );
};

export default ProductCard;