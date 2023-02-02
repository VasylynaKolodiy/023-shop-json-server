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
            <img src={data?.images[0]} alt={data?.title}/>
          </div>

          <div className='productPage__content'>
            <h1 className='productPage__title'>{data?.title}</h1>

            <p className='productPage__description'>
              {data?.description}
            </p>

            <p
              className='productPage__text'
              dangerouslySetInnerHTML={{__html: data?.text as string}}
            />

          </div>
          <Link className='productPage__link' to='/'>Back to homepage</Link>
        </>
      }
    </main>
  );
};

export default ProductPage;