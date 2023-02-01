import React, {useEffect, useState} from 'react';
import './Filter.scss'
import {IProducts} from "../../models/Interfaces";
import {useDebounce} from "../../hooks/debounce";

interface IFilter {
  products: IProducts[],
  filteredProductsLength: number,
  setFilteredProducts: (products: IProducts[]) => void,
  setPageNumber: (pageNumber: number) => void,
}

const Filter: React.FC<IFilter> = (
  {
    products,
    filteredProductsLength,
    setFilteredProducts,
    setPageNumber,
  }) => {

  const [search, setSearch] = useState<string>('')
  const debounced = useDebounce(search)

  useEffect(() => {
    debounced
      ? setFilteredProducts(filterProducts()?.filter((product) => product.priority)
        .sort((a, b) => b.priority - a.priority))
      : setFilteredProducts(products)
    setPageNumber(1)
  }, [debounced, products]) //eslint-disable-line

  const filterProducts = () => {
    const debounceArr = debounced.split(' ').map((elem) => elem.toLowerCase());
    return products?.map((product) => {
      let priority = 0;

      const resTitle = product.title.split(' ')?.map((word) => {
        if (debounceArr.includes(word.toLowerCase())) priority += 2;
        return debounceArr.includes(word.toLowerCase()) ? `<span>${word}</span>` : word;
      }).join(' ')

      const resSummary = product.title.split(' ')?.map((word) => {
        if (debounceArr.includes(word.toLowerCase())) priority += 1;
        return debounceArr.includes(word.toLowerCase()) ? `<span>${word}</span>` : word;
      }).join(' ')

      return ({...product, title: resTitle, summary: resSummary, priority: priority})
    })
  }

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  return (
    <section className='filter'>
      <p className='filter__title'>Filter by keywords</p>

      <input
        className='filter__input'
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => onChangeSearch(e)}
      />

      {debounced && <p className='filter__results'>Results: {filteredProductsLength}</p>}

    </section>
  );
};

export default Filter;
