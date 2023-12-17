import React, { useState, Fragment, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import TodoContext from '../../../_helper/Todo';
import { H4, H5, LI, UL } from '../../../AbstractElements';


import { Routes, Route, useParams, Link } from 'react-router-dom';
import axios from 'axios';


const TodoList = () => {
  const { allTodos, removeItems, selectedItem } = useContext(TodoContext);

  const [status, setStatus] = useState('pending');

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
  let str = 'http://127.0.0.1:8000/api/activity/course/'+num;

  useEffect(() => {
    axios.get(str)
      .then((res) => {
        if(res.status == 200){
          setData(res.data);
          console.log(data);
        }
      }).catch((err) => {
        console.log(err.response.data);
    });
  },[]);

  return (
    <Fragment>
      <div className='todo-list-body'>
        <UL attrUL={{ className: 'simple-list', id: 'todo-list' }}>
          {data.length > 0
            ? data.map((todo, index) => (
                <LI attrLI={{ className: 'task border-0 ' /* + todo.status */ }} key={index}>
                  <Link to={`/activity/${todo.id}`}>
                    <div className='task-container'>
                      <H4 attrH4={{ className: 'task-label' }}>{todo.description}</H4>
                      <div className='d-flex align-items-center gap-4'>
                        {/* <span className={`badge badge-light-${todo.statusCode}`}>{todo.status}</span> */}
                        {/* <H5 attrH5={{ className: 'assign-name m-0' }}>{todo.date}</H5> */}
                      </div>
                    </div>
                  </Link>
                </LI>
              ))
            : ''}
        </UL>
      </div>
    </Fragment>
  );
};
export default TodoList;
