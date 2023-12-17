import BrandShipping from './BrandShipping';
import ImageSlider from './ImageSilder';
import ProductDetails from './ProductDetails';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Fragment, useState, useEffect } from 'react';
import React from 'react';
import Tablet from './Tabsets';
import { Breadcrumbs } from '../../../../AbstractElements';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPageContain = () => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  let str = 'http://127.0.0.1:8000/api/courses/'+id;
  console.log(str);
  useEffect(() => {
    axios.get(str)
      .then((res) => {
        if(res.status == 200){
          setData([res.data]);
          console.log(data);
        }
      }).catch((err) => {
        console.log(err.response.data);
    });
  },[]);
  
  
  return (
    <Fragment>
      <Breadcrumbs parent='Catalogue' title='Course Page' mainTitle='Course Page' />
      <Container fluid={true}>
        <div>
        <Row className='product-page-main p-0'>
            <Col xxl='4' md='6' className='box-col-12'>
              <Card>
                <CardBody>
                  {/* <Row> */}
                  <ImageSlider productItem={data} />
                  {/* </Row> */}
                </CardBody>
              </Card>
            </Col>
            {<ProductDetails productItem={data} />}
            <Col xxl="3" md="6" className='box-col-6'>
              {<BrandShipping productItem={data} />}
            </Col>
          </Row>
        </div>
        <Tablet productItem={data} />
      </Container>
    </Fragment>
  );
};
export default ProductPageContain;
