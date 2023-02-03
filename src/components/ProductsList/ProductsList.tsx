import React from 'react';
import {IProducts} from '../../models/Interfaces';
import ProductCard from "../ProductCard/ProductCard";
import './ProductsList.scss'

interface IProductsList {
  productsState: IProducts[],
  setCatName: (name: string) => void
}

const ProductsList: React.FC<IProductsList>  = ({productsState, setCatName}) => {
  return (
    <section className='productsList'>
      {productsState?.map((product: IProducts) =>
        <ProductCard
          product={product}
          setCatName={setCatName}
          key={product.id}
        />
      )}
    </section>
  );
};

export default ProductsList;