import React, {useState} from 'react';
import Pagination from "@mui/material/Pagination";
import {
  useFilterProductsByCategoryQuery,
  useGetCategoriesQuery,
} from '../../store/products/products.api'
import Filter from "../../components/Filter/Filter";
import ProductsList from "../../components/ProductsList/ProductsList";
import {IProducts} from "../../models/Interfaces";
import './HomePage.scss'
import {LIMIT} from "../../constants";
import SidebarCategories from "../../components/SidebarCategories/SidebarCategories";

const HomePage = () => {
  const [catName, setCatName] = useState('')
  const {isFetching, data: products = []} = useFilterProductsByCategoryQuery(String(catName.replace('all products', '')), {refetchOnMountOrArgChange: true});
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>(products);

  let [pageNumber, setPageNumber] = useState<number>(1);
  const TOTAL_COUNT = filteredProducts.length;
  let countOfPages = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / LIMIT);

  const {data: categories = []} = useGetCategoriesQuery(null, {refetchOnMountOrArgChange: true});

  return (
    <main className='homePage'>
      <Filter
        products={products}
        filteredProductsLength={filteredProducts.length}
        setFilteredProducts={setFilteredProducts}
        setPageNumber={setPageNumber}
      />


      <div className='homePage__inner'>
        <SidebarCategories categories={categories} catName={catName} setCatName={setCatName}/>
        {isFetching
          ? <h2>Loading...</h2>
          :
          <div className='homePage__list'>
            <ProductsList
              productsState={filteredProducts?.slice(pageNumber * LIMIT - LIMIT, pageNumber * LIMIT)}
              setCatName={setCatName}
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
          </div>
        }
      </div>
    </main>
  );
};

export default HomePage;