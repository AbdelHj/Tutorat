import React, { Fragment, useContext, useEffect, useState } from 'react';
import { H3, LI, P, UL } from '../../../../AbstractElements';
import { Brand, Availability, AddToCart, BuyNow } from '../../../../Constant';
import ProductContext from '../../../../_helper/Ecommerce/Product';
import WishtListContext from '../../../../_helper/Ecommerce/Wishlist';
import SocialIcons from './SocialIcons';
import StarRatings from './StarRating';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link, json, useNavigate } from 'react-router-dom';
import CartContext from '../../../../_helper/Ecommerce/Cart';
import CustomizerContext from '../../../../_helper/Customizer';

import axios from 'axios';

const ProductDetails = ({ productItem }) => {

  
  const navigate = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  //const { productItem, symbol } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [productss, setProductss] = useState('');
  const [courseName, setCourseName] = useState('');
  const [course, setCourse] = useState('');
  const path = window.location.pathname.split('/').pop();

  useEffect(() => {
    productItem.map((item) => {
      setCourseName(item.name);
      setCourse(item);
      console.log(courseName);
      if (item.id === path) {
        setProductss(item);
      }
      return null;
    });
  });

  const quantity = 1;
  const history = useNavigate();
  const { addToWishList } = useContext(WishtListContext);

  const singleItem = productItem;
  const addWishList = (product) => {
    
  };

  const AddToCarts = (item, quantity) => {
    axios
      .post('http://127.0.0.1:8000/api/courseUser', {
        id_course: course.id,
        id_student: JSON.parse(localStorage.getItem('user')).id,
        progress: 0
      })
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
          navigate('/dashboard');
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  };

  const buyProduct = (item, quantity) => {
    addToCart(item, quantity);
  };

  return (
    <Fragment>
      <Col xxl='5' className='box-col-6 order-xxl-0 order-1'>
      <Card>
          <CardBody>
            <div className='product-page-details'>
              <H3>{courseName}</H3>
            </div>
            <UL attrUL={{ className: 'product-color flex-row' }}>
              <LI attrLI={{ className: 'bg-primary' }}></LI>
              <LI attrLI={{ className: 'bg-secondary' }}></LI>
              <LI attrLI={{ className: 'bg-success' }}></LI>
              <LI attrLI={{ className: 'bg-info' }}></LI>
              <LI attrLI={{ className: 'bg-warning' }}></LI>
            </UL>
            <hr />
            <P>{'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that.'}</P>
            <hr />
            <div>
              <table className='product-page-width'>
                <tbody>
                  <tr>
                    <td>
                      <b>{courseName} &nbsp;&nbsp;&nbsp;:</b>
                    </td>
                    <td>{'Amine Adli'}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>{Availability} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                    </td>
                    <td className='txt-success'>{'Available'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <Row>
              <SocialIcons />
            </Row>
            <hr />
            <Row>
              <Col md='4'>
                <h6 className='product-title'>{'Rate Now'}</h6>
              </Col>
              <Col md='8'>
                <StarRatings />
              </Col>
            </Row>
            <hr />
            <div>
              <Button color='primary' className='m-r-10 m-t-10' onClick={() => AddToCarts(productss, quantity)}>
                <i className='fa fa-shopping-basket me-1'></i>
                {AddToCart}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};
export default ProductDetails;
