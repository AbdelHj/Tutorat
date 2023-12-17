import React, { Fragment, useState } from 'react';
import { Facebook, Linkedin, Twitter } from 'react-feather';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Btn, H4, P, H6, Image } from '../../../AbstractElements';
import { Link } from 'react-router-dom';
import logoWhite from '../../../assets/images/logo/logo.png';
import logoDark from '../../../assets/images/logo/logo_dark.png';
import { Media, Card } from 'reactstrap';
import { COD, Fast, Free, VerticalStyle, Local, XYZSeller, ABCSeller, Standard, DeliveryOption, BuyingOption } from '../../../Constant';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

const RegisterFrom = ({ logoClassMain }) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
    axios
      .post('http://127.0.0.1:8000/api/users', {
         firstName: event.target.elements.firstName.value,
         lastName: event.target.elements.lastName.value,
         address: event.target.elements.address.value,
         city: event.target.elements.city.value,
         zip: event.target.elements.zip.value,
         country: 'Morocco',
         bio: 'hi',
         type: radio,
         email: event.target.elements.email.value,
         password: event.target.elements.password.value,
      })
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
          navigate('/login');
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
    console.log(event.target.elements.firstName.value);
    console.log(event.target.elements.lastName.value);
    console.log(event.target.elements.email.value);
    console.log(event.target.elements.password.value);
    console.log(event.target.elements.address.value);
    console.log(event.target.elements.city.value);
    console.log(event.target.elements.zip.value);
  }

  const [radio, setRadio] = useState(0);
  const onOptionChange = e => {
    setRadio(e.target.value)
    console.log(e.target.value);
  }



  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <div className='login-card'>
        <div>
          <div>
            <Link className={`logo ${logoClassMain ? logoClassMain : ''}`} to={process.env.PUBLIC_URL}>
              <Image attrImage={{ className: 'img-fluid for-light', src: logoWhite, alt: 'looginpage' }} />
              <Image attrImage={{ className: 'img-fluid for-dark', src: logoDark, alt: 'looginpage' }} />
            </Link>
          </div>
          <div className='login-main'>
            <Form onSubmit={handleSubmit} className='theme-form login-form'>
              <H4>Create your account</H4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Your Name</Label>
                <Row className='g-2'>
                  <Col xs='6'>
                    <Input name='firstName' className='form-control' type='text' required='' placeholder='Fist Name' />
                  </Col>
                  <Col xs='6'>
                    <Input name='lastName' className='form-control' type='text' required='' placeholder='Last Name' />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Address</Label>
                <Input name='address' className='form-control' type='text' required='' placeholder='Address' />
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>City</Label>
                <Input name='city' className='form-control' type='text' required='' placeholder='City' />
              </FormGroup>
              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Zip</Label>
                <Input name='zip' className='form-control' type='text' required='' placeholder='Zip' />
              </FormGroup>

              <FormGroup>
                <Label className='col-form-label m-0 pt-0'>Email Address</Label>
                <Input name='email' className='form-control' type='email' required='' placeholder='Test@gmail.com' />
              </FormGroup>
              <FormGroup className='position-relative'>
                <Label className='col-form-label m-0 pt-0'>Password</Label>
                <div className='position-relative'>
                  <Input name='password' className='form-control' type={togglePassword ? 'text' : 'password'} required placeholder='*********' />
                  <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                    <span className={togglePassword ? '' : 'show'}></span>
                  </div>
                </div>
              </FormGroup>

              <FormGroup className="mega-vertical">
                <Row>
                    <Col sm="12">
                        <P attrPara={{ className: 'mega-title m-b-5' }} >Choose an option</P>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <Media className="p-20">
                                <div className="radio radio-primary me-3">
                                    <Input id="radio23" type="radio" name="radio1" value="S" onChange={onOptionChange} />
                                    <Label for="radio23"></Label>
                                </div>
                                <Media body>
                                    <H6 attrH6={{ className: 'mt-2' }} >Student<span className="badge badge-primary pull-right digits"></span></H6>
                                    
                                </Media>
                            </Media>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <Media className="p-20">
                                <div className="radio radio-warning me-3">
                                    <Input id="radio26" type="radio" name="radio1" value="T" onChange={onOptionChange} />
                                    <Label for="radio26"></Label>
                                </div>
                                <Media body>
                                    <H6 attrH6={{ className: 'mt-2' }} >Tutor<span className="badge badge-warning pull-right digits"></span></H6>
                                </Media>
                            </Media>
                        </Card>
                    </Col>
                </Row>
              </FormGroup>

              <FormGroup className='m-0'>
                <div className='checkbox'>
                  <Input id='checkbox1' type='checkbox' />
                  <Label className='text-muted' for='checkbox1'>
                    Agree with <span>Privacy Policy</span>
                  </Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn attrBtn={{ className: 'd-block w-100', color: 'primary', type: 'submit' }}>Create Account</Btn>
              </FormGroup>
              <div className='login-social-title'>
                <H6 attrH6={{ className: 'text-muted or mt-4' }}>Or Sign up with</H6>
              </div>
              <div className='social my-4 '>
                <div className='btn-showcase'>
                  <a className='btn btn-light' href='https://www.linkedin.com/login' rel='noreferrer' target='_blank'>
                    <Linkedin className='txt-linkedin' /> LinkedIn
                  </a>
                  <a className='btn btn-light' href='https://twitter.com/login?lang=en' rel='noreferrer' target='_blank'>
                    <Twitter className='txt-twitter' />
                    twitter
                  </a>
                  <a className='btn btn-light' href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
                    <Facebook className='txt-fb' />
                    facebook
                  </a>
                </div>
              </div>
              <P attrPara={{ className: 'mb-0 text-start' }}>
                Already have an account?
                <Link className='ms-2' to={`${process.env.PUBLIC_URL}/pages/authentication/login-simple`}>
                  Sign in
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterFrom;
