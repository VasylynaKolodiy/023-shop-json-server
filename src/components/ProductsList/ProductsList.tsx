import React from 'react';
import {IProducts} from '../../models/Interfaces';
import ProductCard from "../ProductCard/ProductCard";
import './ProductsList.scss'

interface IProductsList {
  productsState: IProducts[],
  setCatName: (name: string) => void,
  setPageNumber: (page: number) => void,
}

const ProductsList: React.FC<IProductsList>  = ({productsState, setCatName, setPageNumber}) => {
  return (
    <section className='productsList'>
      {productsState.length > 0
        ? productsState?.map((product: IProducts) =>
        <ProductCard
          product={product}
          setCatName={setCatName}
          setPageNumber={setPageNumber}
          key={product.id}
        />
      )
        : <div className='productCard'><h4>There are no products</h4></div>
      }
    </section>
  );
};

export default ProductsList;