import React from 'react';
import {IProducts} from '../../models/Interfaces';
import ProductCard from "../ProductCard/ProductCard";
import './ProductsList.scss'

interface IProductsList {
  productsState: IProducts[]
}

const ProductsList: React.FC<IProductsList>  = ({productsState}) => {
  return (
    <section className='productsList'>
      {productsState?.map((product: IProducts) =>
        <ProductCard
          product={product}
          key={product.id}
        />
      )}
    </section>
  );
};

export default ProductsList;