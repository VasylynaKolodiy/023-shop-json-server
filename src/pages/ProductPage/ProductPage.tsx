import React from 'react';
import {Link, useParams} from "react-router-dom";
import './ProductPage.scss'
import {useGetDetailProductQuery} from "../../store/products/products.api";

const ProductPage = () => {
  const {id} = useParams();
  const {isLoading, data} = useGetDetailProductQuery(String(id));

  return (
    <main className='productPage'>
      {isLoading
        ? <h2>Loading...</h2>
        : <>
          <div className='productPage__image'>
            <img src={data?.images[0]} alt='Product theme'/>
          </div>

          <div className='productPage__content'>
            <h1 className='productPage__title'>{data?.title}</h1>

            <p className='productPage__description'>
              {data?.description}
            </p>
          </div>
          <Link className='productPage__link' to='/'>Back to homepage</Link>
        </>
      }
    </main>
  );
};

export default ProductPage;