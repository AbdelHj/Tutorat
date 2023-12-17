import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Target, Info, CheckCircle, PlusCircle } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { Done, All, Doing, CreateNewProject } from '../../../../Constant';
import { Breadcrumbs } from '../../../../AbstractElements';
import ProjectContext from '../../../../_helper/Project';
import CusClass from '../Common/CusClass';
import CustomizerContext from '../../../../_helper/Customizer';

import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

const Project = () => {
  const { layoutURL } = useContext(CustomizerContext);
  let { num } = useParams();
  const [activeTab, setActiveTab] = useState(num);
  const [data, setData] = useState([]);
  const { allData } = useContext(ProjectContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/courseUser/student/'+JSON.parse(localStorage.getItem('user')).id)
      .then((res) => {
        console.log(res.status)
        if(res.status == 200){
          setData(res.data);
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
                    <NavItem><NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}><Target />{All}</NavLink></NavItem>
                    <NavItem><NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}><Info />{Doing}</NavLink></NavItem>
                    <NavItem><NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}><CheckCircle />{Done}</NavLink></NavItem>
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
                  <TabPane tabId="2">
                    <Row>
                      {data.map((item, i) =>
                      (item.progress < 100 ?
                        <CusClass item={item} key={i} />
                        : '')
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      {data.map((item, i) =>
                      (item.progress === 100 ?
                        <CusClass item={item} key={i} />
                        : '')
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

export default Project;