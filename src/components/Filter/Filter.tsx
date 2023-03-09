import React, {useEffect} from 'react';
import './Filter.scss'

interface IFilter {
    search: string,
    setSearch: (title: string) => void,
    debounced: string
    filteredProductsLength: number,
    setPageNumber: (pageNumber: number) => void,
}

const Filter: React.FC<IFilter> = (
    {
        search,
        setSearch,
        debounced,
        filteredProductsLength,
        setPageNumber,
    }) => {

    useEffect(() => {
        setPageNumber(1)
    }, [debounced]) //eslint-disable-line


    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <section className='filter'>
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
