import React from 'react';
import './HistoryItem.scss'
import {IHistoryProduct} from "../../models/Interfaces";
import {Link} from "react-router-dom"

interface IHistoryItemProps {
  product: IHistoryProduct
}

const HistoryItem : React.FC<IHistoryItemProps> = ({product}) => {
  return (
    <section className='historyItem'>
      <Link className='historyItem__link' to={`/${product.id}`}/>

      <div className='historyItem__image'>
        <img src={product.img} alt={product.title}/>
      </div>

      <div className='historyItem__info'>
        <div className='historyItem__content'>
          <p>{product.title}</p>
          <p>{product.price}$</p>
        </div>

        <div className='historyItem__content'>
          <p>Count: {product.col}</p>
          <p>Total Price: {product.col * product.price}$</p>
        </div>
      </div>
    </section>
  );
};

export default HistoryItem;