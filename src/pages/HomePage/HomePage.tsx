import React, {useState} from 'react';
import Pagination from "@mui/material/Pagination";
import {useGetProductsQuery} from '../../store/products/products.api'
import Filter from "../../components/Filter/Filter";
import ProductsList from "../../components/ProductsList/ProductsList";
import {IProducts} from "../../models/Interfaces";
import './HomePage.scss'
import {LIMIT} from "../../constants";

const HomePage = () => {
  const {isFetching, data: products = []} = useGetProductsQuery(null, {refetchOnMountOrArgChange: true});
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>(products);

  let [pageNumber, setPageNumber] = useState<number>(1);
  const TOTAL_COUNT = filteredProducts.length;
  let countOfPages = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / LIMIT);

  return (
    <main className='homePage'>
      <Filter
        products={products}
        filteredProductsLength={filteredProducts.length}
        setFilteredProducts={setFilteredProducts}
        setPageNumber={setPageNumber}
      />

      {isFetching
        ? <h2>Loading...</h2>
        : <>
          <ProductsList
            productsState={filteredProducts?.slice(pageNumber * LIMIT - LIMIT, pageNumber * LIMIT)}
          />

          {countOfPages > 1 &&
          (<Pagination
              className='pagination'
              count={countOfPages}
              size="large"
              page={pageNumber}
              onChange={(event, value) => setPageNumber(value)}
            />
          )}
        </>
      }
    </main>
  );
};

export default HomePage;