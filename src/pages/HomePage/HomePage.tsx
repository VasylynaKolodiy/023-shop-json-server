import React, {useState} from 'react';
import Pagination from "@mui/material/Pagination";
import {
    useFilterProductsByCategoryQuery,
    useGetCategoriesQuery, useSearchTitleQuery,
} from '../../store/products/products.api'
import ProductsList from "../../components/ProductsList/ProductsList";
import './HomePage.scss'
import {LIMIT} from "../../constants";
import SidebarCategories from "../../components/SidebarCategories/SidebarCategories";
import Filter from "../../components/Filter/Filter";
import {useDebounce} from "../../hooks/debounce";


const HomePage = () => {
    let [pageNumber, setPageNumber] = useState<number>(1);
    const [catName, setCatName] = useState('')
    const {isFetching, data: products} = useFilterProductsByCategoryQuery({catName: catName, pageNumber: pageNumber});
    const filteredProducts = products?.data || [];
    const TOTAL_COUNT = products?.totalCount || 0;
    let countOfPages = TOTAL_COUNT && Math.ceil(Number(TOTAL_COUNT) / LIMIT);


    const {data: categories = []} = useGetCategoriesQuery(null, {refetchOnMountOrArgChange: true});
    const [search, setSearch] = useState<string>('')
    const debounced = useDebounce(search)
    const {data: searchProducts} = useSearchTitleQuery({title: debounced})
    let countOfPagesSearch = searchProducts?.length && Math.ceil(Number(searchProducts?.length) / LIMIT);

    console.log(searchProducts)

    return (

        <main className='homePage'>

            <div className='homePage__inner'>
                <SidebarCategories
                    categories={categories}
                    catName={debounced ? 'hj' : catName}
                    setCatName={setCatName}
                    setPageNumber={setPageNumber}
                    setSearch={setSearch}
                />

                {isFetching
                    ? <h2>Loading...</h2>
                    :
                    <div className='homePage__list'>

                        <Filter
                            search={search}
                            setSearch={setSearch}
                            debounced={debounced}
                            filteredProductsLength={searchProducts?.length}
                            setPageNumber={setPageNumber}
                        />

                        <ProductsList
                            productsState={debounced ? searchProducts : filteredProducts}
                            setCatName={setCatName}
                            setPageNumber={setPageNumber}
                        />

                        {(debounced ? Number(countOfPagesSearch) : Number(countOfPages) ) > 1 &&
                        (<Pagination
                                className='pagination'
                                count={debounced ? Number(countOfPagesSearch) : Number(countOfPages)}
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