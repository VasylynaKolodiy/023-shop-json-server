import React, {useEffect, useState} from 'react';
import Pagination from "@mui/material/Pagination";
import {
  useFilterProductsByCategoryQuery,
  useGetCategoriesQuery,
} from '../../store/products/products.api'
import ProductsList from "../../components/ProductsList/ProductsList";
import './HomePage.scss'
import {LIMIT} from "../../constants";
import SidebarCategories from "../../components/SidebarCategories/SidebarCategories";

const HomePage = () => {
  let [pageNumber, setPageNumber] = useState<number>(1);
  const [catName, setCatName] = useState('')
  const {isFetching, data: products} = useFilterProductsByCategoryQuery({catName: catName, pageNumber: pageNumber});
  const filteredProducts = products?.data || [];
  const TOTAL_COUNT = products?.totalCount || 0;
  let countOfPages = TOTAL_COUNT && Math.ceil(Number(TOTAL_COUNT) / LIMIT);
  const {data: categories = []} = useGetCategoriesQuery(null, {refetchOnMountOrArgChange: true});

  return (

    <main className='homePage'>
      {/*<Filter*/}
      {/*  products={filteredProducts}*/}
      {/*  filteredProductsLength={filteredProducts.length}*/}
      {/*  setFilteredProducts={()=> {}}*/}
      {/*  setPageNumber={setPageNumber}*/}
      {/*/>*/}

      <div className='homePage__inner'>
        <SidebarCategories
          categories={categories}
          catName={catName}
          setCatName={setCatName}
          setPageNumber={setPageNumber}
        />

        {isFetching
          ? <h2>Loading...</h2>
          :
          <div className='homePage__list'>
            <ProductsList
              productsState={filteredProducts}
              setCatName={setCatName}
              setPageNumber={setPageNumber}
            />

            {countOfPages > 1 &&
            (<Pagination
                className='pagination'
                count={Number(countOfPages)}
                size="large"
                page={pageNumber}
                onChange={(event, value) => setPageNumber(value)}
              />
            )}
          </div>
        }
      </div>
    </main>
  );
};

export default HomePage;