import React, { useState, Fragment, useContext, useEffect, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Container, Row , Form, FormGroup, Label, Input } from 'reactstrap';


import TodoContext from '../../../_helper/Todo';
import { H4, H5, LI, UL, H6, Btn, H2 } from '../../../AbstractElements';

import { AnimatedRadioButtons, Option } from "../../../Constant";


import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuestionList = () => {

  const { allTodos, removeItems, selectedItem } = useContext(TodoContext);

  const [status, setStatus] = useState('pending');

  const navigate = useNavigate();

  const handleRemoveTodo = (todoId) => {
    removeItems(todoId);
    toast.success('Deleted Task !');
  };
  const handleMarkedTodo = (itemId, itemStatus) => {
    if (itemStatus === 'completed') {
      setStatus('pending');
      selectedItem(itemId, status);
      toast.success('Task Completed !');
    } else if (itemStatus === 'pending') {
      setStatus('completed');
      selectedItem(itemId, status);
      toast.error(' Task In-completed !');
    }
  };

  let { num } = useParams();
  const [data, setData] = useState([]);
  const [str2, setStr2] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [userType, setUserType] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [radio, setRadio] = useState(0);
  const [questionsByCourseAndStudent, setquestionsByCourseAndStudent] = useState(0);
  let str1 = 'http://127.0.0.1:8000/api/activity/'+num;
  useEffect(() => {
    axios.get(str1)
      .then((res) => {
        if(res.status == 200){
          console.log('http://127.0.0.1:8000/api/activity/13');
          setData(res.data);
          console.log("res.data.idCourse: " + res.data.idCourse);
          return axios.get('http://127.0.0.1:8000/api/courses/'+res.data.idCourse);
        }
      }).then((res) => {
        if(res.status == 200){
          console.log("'http://127.0.0.1:8000/api/courses/'+res.data.idCourse");
          setCourseData(res.data);
          console.log("res.data.idInstructor: " + res.data.idInstructor);
          return axios.get('http://127.0.0.1:8000/api/users/'+res.data.idInstructor);
        }
      }).then((res) => {
        if(res.status == 200){
          console.log("'http://127.0.0.1:8000/api/users/'+res.data.idInstructor");
          setUserType(res.data.type);
          setInstructorId(res.data.id);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
    });

    
  },[]);
  
  useEffect(() => {
    console.log('activ '+ data.id);
    getQuestions();
  }, [data]);
  

  let getQuestions = () => {
    axios.get('http://127.0.0.1:8000/api/question/activity/'+data.id)
    .then((res) => {
      if(res.status == 200){
        console.log("ppppppppppppppppppppp");
        setQuestionData(res.data);
        localStorage.setItem('qst', JSON.stringify(res.data[0]));
        console.log(res.data);
        return res.data;
      }
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements.question.value);
    axios
      .post('http://127.0.0.1:8000/api/question', {
         idActivity: data.id,
         question: event.target.elements.question.value,
         opt1: event.target.elements.opt1.value,
         opt2: event.target.elements.opt2.value,
         opt3: event.target.elements.opt3.value,
         opt4: event.target.elements.opt4.value,
         correctAnswer: parseInt(event.target.elements.answer.value)
      })
      .then((res) => {
        
        if(res.status === 201){
          console.log('/courses/'+courseData.id+'/activities');
          navigate('/courses/'+courseData.id+'/activities');
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }


  const studentHandleSubmit = (event) => {
    event.preventDefault();
    let isCorrect = 'NO';

    axios.get('http://127.0.0.1:8000/api/question/activity/'+data.id)
    .then((res) => {
      if(res.status == 200){
        console.log("ppppppppppppppppppppp");
        setQuestionData(res.data);
        console.log(res.data[0].correctAnswer);
        console.log(radio);
        if(parseInt(radio) === parseInt(res.data[0].correctAnswer)){
          console.log("WEEEEEEEEEE");
          isCorrect = 'YES';
        }
        return axios.post('http://127.0.0.1:8000/api/answer', {
          idQuestion: res.data[0].id,
          idStudent: JSON.parse(localStorage.getItem('user')).id,
          idCourse: courseData.id,
          isCorrect: isCorrect
       });
      }
    }).then((res) => {
        
        if(res.status === 201){
          console.log('SUCCESS!!!');
          return axios.get('http://127.0.0.1:8000/api/activity/course/'+courseData.id);
        }
      }).then((res) => {
        
        if(res.status === 200){
          console.log(res.data);
          return axios.get('http://127.0.0.1:8000/api/answer/question/'+courseData.id+'/'+JSON.parse(localStorage.getItem('user')).id);
        }
      }).then((res) => {
        
        if(res.status === 200){
          setquestionsByCourseAndStudent(res.data);
          let result = res.data;
          axios.get('http://127.0.0.1:8000/api/activity/course/'+courseData.id)
          .then((res) => {
        
            if(res.status === 200){
              console.log(result);
              let len = result.filter(value => value.isCorrect === 'YES').length;
              console.log(len);
              console.log(res.data);
              let v = (len / res.data.length)*100;
              console.log(parseInt(v + ""));

              axios.post('http://127.0.0.1:8000/api/courseUser/update/'+courseData.id+'/'+JSON.parse(localStorage.getItem('user')).id, {
                progress: v
              })
              .then((res) => {
                console.log(res);
                if(res.status === 200){
                  navigate('/courses/'+courseData.id+'/activities');
                }
              });




            }
          });
        }
      })
      .catch((err) => {
         console.log(err.response.data);
      });
  }

  // navigate('/courses/'+courseData.id+'/activities');
  const onOptionChange = e => {
    setRadio(e.target.value)
    console.log(e.target.value);
  }

  var indents = [];
  for (var i = 0; i < data.numOfQst; i++) {
    indents.push(
    <>
    <FormGroup>
      <Label htmlFor="exampleFormControlSelect9">Question {i + 1}</Label>
      <textarea name="question" className="form-control" rows="2" cols="5" placeholder='Question'></textarea>
    </FormGroup>
    <FormGroup>
      <Row>
        <Col sm='2'>
        <Input name="opt1" className="form-control form-control" type="text" placeholder='Option 1'></Input>
        </Col>
        <Col sm='2'>
        <Input name="opt2" className="form-control" type="text" placeholder='Option 2'></Input>
        </Col>
        <Col sm='2'>
        <Input name="opt3" className="form-control" type="text" placeholder='Option 3'></Input>
        </Col>
        <Col sm='2'>
        <Input name="opt4" className="form-control" type="text" placeholder='Option 4'></Input>
        </Col>
        <Col sm='4'>
        <Input name="answer" className="form-control" type="text" placeholder='Answer [1 ... 4]'></Input>
        </Col>
      </Row>
    </FormGroup>
    </>
    );
  }


  const questions = questionData?.map((qst, i) => (
    <>
    <FormGroup>
      <Label htmlFor="exampleFormControlSelect9">Question {i + 1}</Label>
      <textarea name="question" disabled className="form-control" rows="2" cols="5" defaultValue={qst.question}></textarea>
    
      </FormGroup>
      <FormGroup>
    <Row>
    <Col>
        <Label className="d-block" for="edo-ani">
            <Input className="radio_animated" id="opt1" type="radio" name="opt" value={1} onChange={onOptionChange} />{qst.opt1}
        </Label>
        <Label className="d-block" for="edo-ani1">
            <Input className="radio_animated" id="opt2" type="radio" name="opt" value={2} onChange={onOptionChange} />{qst.opt2}
        </Label>
        <Label className="d-block" for="edo-ani2">
            <Input className="radio_animated" id="opt3" type="radio" name="opt" value={3} onChange={onOptionChange} />{qst.opt3}
        </Label>
        <Label className="d-block" for="edo-ani13">
            <Input className="radio_animated" id="opt4" type="radio" name="opt" value={4} onChange={onOptionChange} />{qst.opt4}
        </Label>
    </Col>
  </Row>
  </FormGroup>
  </>
  
  ));

  let fin = 
  <>
    <Form onSubmit={handleSubmit}>{indents}
      <UL attrUL={{ className: 'simple-list flex-row layout-grid unlimited-color-layout' }}>
        <Btn type="submit" attrBtn={{ color: 'success', className: 'color-apply-btn color-apply-btn'}}> Save </Btn>
      </UL>
    </Form>
  </>

  let student = 
  <>
    <Form onSubmit={studentHandleSubmit}>{questions}
      <UL attrUL={{ className: 'simple-list flex-row layout-grid unlimited-color-layout' }}>
        <Btn type="submit" attrBtn={{ color: 'success', className: 'color-apply-btn color-apply-btn'}}> Send </Btn>
      </UL>
    </Form>
  </>

    console.log(userType);
    console.log(userType);
  return (
    <Fragment>
      {
        instructorId === JSON.parse(localStorage.getItem('user')).id ? 
          
          fin
        
        : 
          
          student

      }
      {/* <UL attrUL={{ className: 'simple-list flex-row layout-grid unlimited-color-layout' }}>
        <Btn attrBtn={{ color: 'success', onclick:e => handleSubmit(e), className: 'color-apply-btn color-apply-btn'}}> Save </Btn>
      </UL> */}
    </Fragment>
  );
};
export default QuestionList;
