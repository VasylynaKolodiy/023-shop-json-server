import React from 'react';
import './UserHistoryItem.scss'
import {IProductInfo} from "../../models/Interfaces";
import {Link} from "react-router-dom"

interface IHistoryItemProps {
  product: IProductInfo
}

const UserHistoryItem : React.FC<IHistoryItemProps> = ({product}) => {

  return (
    <section className='historyItem'>

      <div className='historyItem__image'>
        <img src={product.img} alt={product.title}/>
      </div>

      <div className='historyItem__info'>
        <div className='historyItem__content'>
          <Link className='historyItem__link' to={`/${product.id}`}>{product.title}</Link>
          <p>{product.price.toLocaleString('en')}$</p>
        </div>

        <div className='historyItem__content'>
          <p>Count: {product.col}</p>
          <p>Total Price: {(product.col * product.price).toLocaleString('en')}$</p>
        </div>
      </div>
    </section>
  );
};

export default UserHistoryItem;