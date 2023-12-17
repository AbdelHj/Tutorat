import Context from './index';
import React, { useEffect, useState } from 'react';

import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FilterProvider = (props) => {



    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        getTutors();
    }, []);
      
    
    let getTutors = () => {
        axios.get('http://127.0.0.1:8000/api/users/type/T')
        .then((res) => {
          if(res.status == 200){
            setTutors(res.data);
            console.log(res.data);
          }
        });
    };



    const [brand, setBrand] = useState(tutors);
    const [value, setValue] = useState({ min: 100, max: 950 });
    const [sortBy, setSortBy] = useState('');
    const [category, setCategory] = useState('');
    const [searchBy, setSearchBy] = useState('');
    const [colors, setColor] = useState('');
    const [filterContext, setFilterContext] = useState(false);
    const [filter, setFilter] = useState({
        brand: tutors,
        color: colors,
        value: value,
        sortBy: sortBy,
        searchBy: searchBy,
        category: category,
    });


    


    useEffect(() => {
    }, [setBrand, setValue, setSortBy, setCategory, setColor, setFilter, setSearchBy]);



    const filterCategory = (category) => {
        setCategory(category);
        console.log("Category: ");
        console.log(category);
        setFilter((prev) => ({ ...prev, category: category }));
        
    };

    const filterBrand = (brand) => {
        setBrand(brand);
        setFilter((prev) => ({ ...prev, brand: brand }));
    };

    const filterColor = (color) => {
        setColor(color);
        setFilter((prev) => ({ ...prev, color: color }));
    };

    const filterPrice = (val) => {
        setValue({ min: val[0], max: val[1] });
        setFilter((prev) => ({ ...prev, value: value }));
    };

    const filterSortBy = (sort_bys) => {
        setSortBy(sort_bys);
        setFilter((prev) => ({ ...prev, sortBy: sortBy }));
    };

    const filterSearchBy = (search) => {
        setSearchBy(search);
        setFilter((prev) => ({ ...prev, searchBy: search }));
    };

    console.log("filter: ");
    console.log(filter);
    console.log(tutors);

    return (
        <Context.Provider
            value={{
                ...props,
                tutors,
                colors,
                sortBy,
                searchBy,
                value,
                filter,
                filterContext,
                setFilterContext: setFilterContext,
                filterCategory: filterCategory,
                filterBrand: filterBrand,
                filterColor: filterColor,
                filterPrice: filterPrice,
                filterSearchBy: filterSearchBy,
                filterSortBy: filterSortBy,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default FilterProvider;
