import { React, useState, useEffect } from 'react';
import { Col, Row, Progress } from 'reactstrap';
import { H3, Image, LI, P, UL } from '../../../../AbstractElements';
import { Link } from 'react-router-dom';
import { Issues, Resolved, Comment, Done } from '../../../../Constant';

import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

const CusClass = ({ item }) => {
  console.log("*******************************");
  console.log(item);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/courses/'+item.id)
      .then((res) => {
        console.log(res.status)
        if(res.status == 200){
          setCourse(res.data);
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }, []);
  

  return (
    <Col className='col-xxl-4' md='6'>
      
      <div className='project-box'>
        <Link to={`${process.env.PUBLIC_URL}/courses/${course.id}/activities`}>
          {/* <span className={`badge ${item.progress === 100 ? 'badge-success' : 'badge-primary'}`}>{item.progress === 100 ? 'Done' : 'Doing'}</span> */}
          <H3>{course.name}</H3>
          <div className='media'>

          </div>
        </Link>
        <P>{course.description}</P>
        <Row className='details'>
          <Col xs='6'>
            <span>{Issues} </span>
          </Col>
          <Col xs='6' className={item.badge === 'Done' ? 'font-success' : 'font-primary'}>
            {/* {item.issue} */}
            34
          </Col>
          <Col xs='6'>
            {' '}
            <span>{Resolved}</span>
          </Col>
          <Col xs='6' className={item.badge === 'Done' ? 'font-success' : 'font-primary'}>
            {/* {item.resolved} */}
            7
          </Col>
        </Row>
        <div className='project-status mt-4'>
          <div className='media mb-0'>
            <P>{item.progress}% </P>
            <div className='media-body text-end'>
              <span>{Done}</span>
            </div>
          </div>
          {item.progress === 100 ? <Progress className='sm-progress-bar' color='success' value={item.progress} style={{ height: '5px' }} /> : <Progress className='sm-progress-bar' striped color='primary' value={item.progress} style={{ height: '5px' }} />}
        </div>
      </div>
    </Col>
  );
};

export default CusClass;
