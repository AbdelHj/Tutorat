import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Target, Info, CheckCircle, PlusCircle } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { Done, All, Doing, CreateNewProject } from '../../../../Constant';
import { Breadcrumbs } from '../../../../AbstractElements';
import ProjectContext from '../../../../_helper/Project';
import CusClass from './CusClass';
import CustomizerContext from '../../../../_helper/Customizer';

import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

const Mycourses = () => {
  const { layoutURL } = useContext(CustomizerContext);
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState([]);
  const { allData } = useContext(ProjectContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/courses/instructor/'+JSON.parse(localStorage.getItem('user')).id)
      .then((res) => {
        console.log(res.status)
        console.log("YYYYYYYYYYYYYY");
        if(res.status == 200){
            console.log("HYYYY");
          setData(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }, []);
  console.log(data);
  return (
    <Fragment>
      <Breadcrumbs parent="Project" title="Courses List" mainTitle="Courses List" />
      <Container fluid={true}>
        <Row className="project-card">
          <Col md="12" className="project-list">
            <Card>
              <Row>
                <Col md="6">
                  <Nav tabs className="border-tab">
                    <NavItem><NavLink className='active' ><Target />{All}</NavLink></NavItem>
                  </Nav>
                </Col>
                <Col md="6">
                  <div className="text-end">
                    <Link className="btn btn-primary" style={{ color: 'white' }} to={`${process.env.PUBLIC_URL}/app/project/new-project/${layoutURL}`}> <PlusCircle />{CreateNewProject}</Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                        
                      {data.map((item, i) =>
                        <CusClass item={item} key={i} />
                      )}
                    </Row>
                  </TabPane>
                  
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Mycourses;