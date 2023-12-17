import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Btn, H4, P } from '../../../AbstractElements';
import { EmailAddress, ForgotPassword, LoginWithJWT, Password, RememberPassword, SignIn } from '../../../Constant';

import { Navigate, useNavigate } from 'react-router-dom';
import { Jwt_token } from '../../../Config/Config';
import man from '../../../assets/images/dashboard/profile.png';
import { handleResponse } from '../../../Services/fack.backend';

import CustomizerContext from '../../../_helper/Customizer';
import OtherWay from './OtherWay';

import axios from 'axios';
import {Routes, Route} from 'react-router-dom';

const LoginTab = ({ selected }) => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('test123');
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const [value, setValue] = useState(localStorage.getItem('profileURL' || man));
  const [name, setName] = useState(localStorage.getItem('Name'));

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('profileURL', man);
    localStorage.setItem('Name', name);
  }, [value, name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
    axios
      .post('http://127.0.0.1:8000/api/users/login', {
         email: event.target.elements.email.value,
         password: event.target.elements.password.value,
      })
      .then((res) => {
        console.log(res.data);
        if(res.data.length >= 1){
          let str1 = res.data[0]['firstName'];
          let str2 = res.data[0]['lastName'];
          setName(str1.concat(" ", str2));
          localStorage.setItem('login', JSON.stringify(true));
          localStorage.setItem('user', JSON.stringify(res.data[0]));
          navigate('/dashboard');
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
    console.log(event.target.elements.email.value);
    console.log(event.target.elements.password.value);
  }

  const loginAuth = async (e) => {
    e.preventDefault();
    setValue(man);
    setName('Ahmed Ali');
    if (email !== '' && password !== '') {
      localStorage.setItem('login', JSON.stringify(true));
      history(`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`);
    }
  };

  const loginWithJwt = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
    };

    return fetch('/users/authenticate', requestOptions)
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setValue(man);
        setName('Ahmed Ali');
        localStorage.setItem('token', Jwt_token);
        window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`;
        return user;
      });
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit} className='theme-form'>
        <H4>{selected === 'simpleLogin' ? 'Sign In With Simple Login' : 'Sign In With Jwt'}</H4>
        <P>{'Enter your email & password to login'}</P>
        <FormGroup>
          <Label className='col-form-label'>{EmailAddress}</Label>
          <Input name='email' className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </FormGroup>
        <FormGroup className='position-relative'>
          <Label className='col-form-label'>{Password}</Label>
          <div className='position-relative'>
            <Input name='password' className='form-control' type={togglePassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
              <span className={togglePassword ? '' : 'show'}></span>
            </div>
          </div>
        </FormGroup>
        <div className='position-relative form-group mb-0'>
          <div className='checkbox'>
            <Input id='checkbox1' type='checkbox' />
            <Label className='text-muted' for='checkbox1'>
              {RememberPassword}
            </Label>
          </div>
          <a className='link' href='#javascript'>
            {ForgotPassword}
          </a>
          {selected === 'simpleLogin' ? (
            <Btn attrBtn={{ color: 'primary', className: 'd-block w-100 mt-2' }}>{SignIn}</Btn>
          ) : (
            <Btn attrBtn={{ color: 'primary', className: 'd-block w-100 mt-2', onClick: (e) => loginWithJwt(e) }}>{LoginWithJWT}</Btn>
          )}
        </div>
        <OtherWay />
      </Form>
    </Fragment>
  );
};

export default LoginTab;
