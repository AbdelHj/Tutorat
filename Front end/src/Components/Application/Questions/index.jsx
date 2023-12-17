import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Plus } from 'react-feather';
import { Card, CardBody, CardHeader, Col, Container, Row , Form, FormGroup, Label, Input} from 'reactstrap';
import { Breadcrumbs, H5, Btn } from '../../../AbstractElements';
import { AddNewTask, AddTask, Close, ToDo } from '../../../Constant';
import TodoContext from '../../../_helper/Todo';
import QuestionList from './QuestionList';

import axios from 'axios';
import {Routes, Route, useNavigate, useParams } from 'react-router-dom';

const ListOfQuestions = () => {
  const { addNewTodo } = useContext(TodoContext);

  let { num } = useParams();

  const [addTask, setAddTask] = useState('');
  const [task, setTask] = useState('');
  const border_danger = useState('');
  const openTaskWrapper = () => {
    setAddTask(' visible');
    // document.getElementById('addTaskBtn').classList.add('hide');
  };
  const closeTaskWrapper = () => {
    setAddTask('');
    // document.getElementById('addTaskBtn').classList.remove('hide');
  };
  const onTaskChanged = (e) => {
    setTask({
      task: e.currentTarget.value,
    });
  };

  const [fields, setFields] = useState('Select')
  const [data, setData] = useState([])

  function handleChange(event) {
      setFields(event.target.value)
      console.log(fields)
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle='Todo' parent='Apps' title='Todo' />
      <Container fluid={true} className='email-wrap bookmark-wrap todo-wrap'>

        <Row>
          {/* <TodoSideBar /> */}
          <Col xl='12' className='courseActivities'>
            <Card>
              <CardHeader className='d-flex align-items-center justify-content-between'>
                <H5>Questions</H5>
                <div className='d-flex align-items-center gap-3'>
                  <div className='todo'>
                    <div className='todo-list-wrapper'>
                      {/* <TodoCheckbox /> */}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className='todo'>
                  <div className='todo-list-wrapper'>
                    <div className='todo-list-container todo-list-footer'>
                      <div className={'new-task-wrapper mb-4' + addTask}>
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect9">Activity type</Label>
                          <Input type="select" name="select" className="form-control digits" onChange={handleChange} value={fields}>
                              <option>{'Select'}</option>
                              <option>{'QCM'}</option>
                          </Input>
                        </FormGroup>
                        { fields === 'QCM' ?
                        <>
                          <FormGroup>
                          <Label htmlFor="exampleFormControlSelect9">Number of questions</Label>
                          <Input type="text" name="numberOfQuestions" className="form-control digits"/>
                          </FormGroup>
                   
                       
                   </>
                   : null
               }
                

                        <FormGroup>
                        <Label htmlFor="exampleFormControlSelect9">Short Description</Label>
                        <textarea name='description' className={'ng-untouched ng-pristine' + border_danger} id='newtask' placeholder='Enter new task here. . .' defaultValue={task} onChange={onTaskChanged}></textarea>
                        </FormGroup>
                        <Btn attrBtn={{ color: 'danger', className: 'cancel-btn', id: 'close-task-panel', onClick: closeTaskWrapper }}>{Close}</Btn>
                        <Btn attrBtn={{ color: 'success', className: 'ms-3 add-new-task-btn', id: 'add-task', type: 'submit' }}>{AddTask}</Btn>
                      </div>
                      <QuestionList />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </Fragment>
  );
};
export default ListOfQuestions;
