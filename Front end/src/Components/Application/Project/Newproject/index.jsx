import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Breadcrumbs, Btn } from '../../../../AbstractElements';
import ProjectContext from '../../../../_helper/Project';
import { Add, Cancel } from '../../../../Constant';
import ProjectTitleClass from './ProjectTitle';
import ClientNameClass from './ClientName';
import ProjectRateClass from './ProjectRate';
import IssueClass from './IssueClass';
import EnterSomeDetailsClass from './EnterSomeDetails';
import UploadProjectFileClass from './UploadProjectFile';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, CardBody, Form, Label, FormGroup, Input, InputGroupText, InputGroup } from 'reactstrap';
import CustomizerContext from '../../../../_helper/Customizer';

import axios from 'axios';
import {Routes, Route} from 'react-router-dom';

const Newproject = () => {
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const project = useContext(ProjectContext);
  const {
    register,
    //handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProject = (data) => {
    if (data !== '') {
      project.addNewProject(data);
      history(`${process.env.PUBLIC_URL}/app/project/project-list/1`);
    } else {
      errors.showMessages();
    }
  };

  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(1);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/subject')
      .then((res) => {
        console.log(res.status)
        if(res.status == 200){
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
          setSubject(res.data);
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }, []);

  

  const subjects = subject?.map((sub, i) => (
    <>
      <option value={sub.id}>{sub.name}</option>
    </>
  
  ));


  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
    console.log(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.title.value);
    axios
      .post('http://127.0.0.1:8000/api/courses', {
         name: event.target.elements.title.value,
         idSubject: selectedSubject,
         startDate: event.target.elements.startDate.value,
         endDate: event.target.elements.endDate.value,
         description: event.target.elements.description.value,
         availability: 'NA',
         idInstructor: JSON.parse(localStorage.getItem('user')).id,
         image: event.target.elements.image.value
      })
      .then((res) => {
        console.log(res.status)
        if(res.status == 201){
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
          history('/dashboard');
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }

  return (
    <Fragment>
      <Breadcrumbs parent='Project' title='Create a new course' mainTitle='Create a new course' />
      <Container fluid={true}>
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <Form className='theme-form' onSubmit={handleSubmit}>
                  <ProjectTitleClass register={register} errors={errors} />
                  {/* <ClientNameClass register={register} errors={errors} /> */}
                  {/* <ProjectRateClass register={register} errors={errors} /> */}
                  <Row>
                    <Col>
                    <FormGroup>
                        <Label>Subject</Label>
                        <Input value={selectedSubject} 
        onChange={handleChange} type="select" name="issues" placeholder="Select Issues" className="form-control digits" required>
                            {subjects}
                        </Input>
                    </FormGroup>
                    </Col>
                  </Row>
                  <EnterSomeDetailsClass register={register} errors={errors} />
                  {/* <UploadProjectFileClass register={register} errors={errors} /> */}
                  <FormGroup className="row">
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Start Date</Label>
                          <Input name='startDate' className="form-control digits" type="date" defaultValue="2022-01-01" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="row">
                    <Row>
                      <Col>
                          <Label>End Date</Label>
                          <Input name='endDate' className="form-control digits" type="date" defaultValue="2022-01-01" />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="row">
                    <Row>
                        <Col>
                          <Label>Image</Label>
                              {/* <Input name='image' className="form-control" type="file" /> */}
                              <InputGroup>
                                        <InputGroupText><i className="icofont icofont-download"></i></InputGroupText>
                                        <Input name ='image' className="form-control input-group-air" type="text" placeholder="https://www.example.com" />
                              </InputGroup>
                        </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col>
                      <div className='text-end'>
                        <Btn attrBtn={{ color: 'success', className: 'me-3' }}>{Add}</Btn>
                        <Link to={`${process.env.PUBLIC_URL}/app/project/project-list/1`}>
                          <Btn attrBtn={{ color: 'danger' }}>{Cancel}</Btn>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Newproject;
