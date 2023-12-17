import ProductContext from '../../../../_helper/Ecommerce/Product';
import CartContext from '../../../../_helper/Ecommerce/Cart';
import { H5 ,H4, LI, P, Image, UL } from '../../../../AbstractElements';
import FilterContext from '../../../../_helper/Ecommerce/Filter';
import { getVisibleproducts } from '../../../../Services/Ecommerce.service';
import ProductModal from './ProductModal';
import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Row, Card, Button } from 'reactstrap';
import CustomizerContext from '../../../../_helper/Customizer';

const ProductGrid = () => {
  const { addToCart } = useContext(CartContext);
  const { productItem, symbol } = useContext(ProductContext);
  console.log(productItem);
  const layoutColumns = 3;
  const { layoutURL } = useContext(CustomizerContext);

  const quantity = 1;
  const [dataid, setDataid] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const history = useNavigate();

  const AddToCarts = (item, quantity) => {
    addToCart(item, quantity);
    history(`${process.env.PUBLIC_URL}/app/ecommerce/cart/${layoutURL}`);
  };

  const onOpenModal = (productId) => {
    setOpenModal(true);
    setDataid(productId);
  };

  const addWishList = () => {
    history(`${process.env.PUBLIC_URL}/app/ecommerce/wishlist/${layoutURL}`);
  };
  var images = require.context('../../../../assets/images', true);
  const dynamicImage = (image) => {
    return images(`${image}`);
  };
  const context = useContext(FilterContext);
  console.log("context: ");
  console.log(context);
  const products = getVisibleproducts(productItem, context.tutors, context.filter);
  return (
    <Fragment>
      <div className='product-wrapper-grid' id='product-wrapper-grid'>
        <Row className='gridRow' id='gridRow'>
          
          {products &&
            products.map((item) => {
              console.log(item);
              return (
                <div id='gridId' className={`${layoutColumns === 3 ? 'col-xl-3 col-lg-6 col-sm-6 xl-4 box-col-4' : 'col-xl-' + layoutColumns}`} key={item.id}>
                  <Card>
                    <div className='product-box'>
                      <div className='product-img'> 
                        <Image attrImage={{ className: 'img-fluid', src: `${item.image}`, alt: '' }} />
                        <div className='product-hover'>
                          <UL attrUL={{ className: 'simple-list d-flex flex-row' }}>
                            <LI attrLI={{ className: 'border-0' }}>
                              <Button color='default' data-toggle='modal' onClick={() => onOpenModal(item.id)}>
                                <i className='icon-eye'></i>
                              </Button>
                            </LI>
                          </UL>
                        </div>
                      </div>
                      <div className='product-details'>
                        <div className='rating'>
                          <i className='fa fa-star font-warning'></i>
                          <i className='fa fa-star font-warning'></i>
                          <i className='fa fa-star font-warning'></i>
                          <i className='fa fa-star font-warning'></i>
                          <i className='fa fa-star font-warning'></i>
                        </div>
                        <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/product-page/${item.id}`}>
                          <H4>{item.name}</H4>
                        </Link>

                        {<P>{item.description}</P>}
                        <div className='mt-sm-4 mt-2 user-details'>
                      {/* <div className='customers'>
                            <UL>
                              {[1, 6, 7, 3, 8, 5].map((item, i, arr) => (
                                <Fragment key={i}>
                                  {i !== arr.length - 1 && (
                                    <LI attrLI={{ className: 'd-inline-block' }}>
                                      <Image attrImage={{ className: 'm-0 img-40 rounded-circle', src: require(`../../../../assets/images/dashboard/user/${item}.jpg`), alt: 'user' }} />
                                    </LI>
                                  )}
                                  {i === arr.length - 1 && (
                                    <LI attrLI={{ className: 'd-inline-block' }}>
                                      <div className='light-card'>
                                        <span className='f-w-500'>+{item}</span>
                                      </div>
                                    </LI>
                                  )}
                                </Fragment>
                              ))}
                            </UL>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          {openModal && <ProductModal value={openModal} setOpenModal={setOpenModal} dataid={dataid} />}
        </Row>
      </div>
    </Fragment>
  );
};
export default ProductGrid;
