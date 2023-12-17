import React, { Fragment, useContext, useState, useEffect } from 'react';
import { H6, UL } from '../../../../AbstractElements';
import { MAX, MIN, Price, STEP } from '../../../../Constant';
import { getBrands, getColors, getGender } from '../../../../Services/Ecommerce.service';
import FilterContext from '../../../../_helper/Ecommerce/Filter';
import ProductContext from '../../../../_helper/Ecommerce/Product';
import { Input, Label } from 'reactstrap';
import { Range, getTrackBackground } from "react-range";

import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const { productItem } = useContext(ProductContext);
    const { filter, filterColor, filterCategory, filterBrand, filterPrice } = useContext(FilterContext);
    const colors = getColors(productItem);
    const step = STEP;
    const min = MIN;
    const max = MAX;
    const [values, setValues] = useState([150, 650]);

    const colorHandle = (event, color) => {
        var elems = document.querySelectorAll('.color-selector ul li');
        [].forEach.call(elems, function (el) {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        filterColor(color);
    };
    const brands = getBrands(productItem);
    const gender = getGender(productItem);
    const clickBrandHendle = (event, brands) => {
        /* var index = brands.indexOf(event.target.value);
        if (event.target.checked === true)
            brands.push(event.target.value);
        else
            brands.splice(index, 1); */
        console.log("brands: ");
        console.log(brands);
        filterBrand(brands);
    };

    const ClickCategory = (result, event) => {
        var elems = document.querySelectorAll('div.checkbox-animated');
        [].forEach.call(elems, function (el) {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        filterCategory(result);
    };

    const priceHandle = (value) => {
        setValues(value);
        filterPrice(value)
    }

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);
      
    
    let getSubjects = () => {
        axios.get('http://127.0.0.1:8000/api/subject')
        .then((res) => {
          if(res.status == 200){
            setSubjects(res.data);
          }
        });
    };


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

    return (
        <Fragment>
            <div className="product-filter">
                <H6 className="f-w-600">Subjects</H6>
                <div className="checkbox-animated mt-0" >
                    {subjects.map((item, i) => {
                        return (
                            <Label className="d-block" key={i}>
                                <Input className="radio_animated" type="radio" name="name" value={item.id} onClick={(e) => ClickCategory(item, e)} />{item.name}
                            </Label>
                        );
                    })}
                </div>
            </div>
            <div className="product-filter">
                <H6 attrH6={{ className: 'f-w-600' }}>Tutors</H6>
                <div className="checkbox-animated mt-0">
                    {tutors.map((brand, index) => {
                        return (
                            <Label className="d-block" key={index}>
                                {<Input className="checkbox_animated" onClick={(e) => clickBrandHendle(e, brand)}
                                    value={brand.id} id={brand.id} type="checkbox" data-original-title="" title="" />}
                                {brand.firstName + " " + brand.lastName}
                            </Label>
                        );
                    })}
                </div>
            </div>
            
        </Fragment >
    );
};

export default Category;