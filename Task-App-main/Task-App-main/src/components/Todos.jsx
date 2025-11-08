import React, { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from "../features/todo/todoSlice";

import EditTodo from "./editTodo";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion";
import './styles.css'

import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';



const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3
};

export default function Todos() {
  const todos = useSelector(state => state.todos.todos);  
  const dispatch = useDispatch();
  const [editTodoId, setEditTodoId] = useState(null);

  const sortedTodos = todos.slice().sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const handleEditClick = (todoId) => {
    setEditTodoId(todoId);
  };

  const handleCloseEdit = () => {
    setEditTodoId(null);
  };

  return (
    <div className="displayContainer px-3 pt-3 gap-4 w-100 h-100 d-flex flex-wrap justify-content-around align-items-center">
      {sortedTodos.map((todo) => (
        <motion.div className="cards card"
            initial={{ opacity: 1 }}
            animate={editTodoId ? { opacity: 0.1} : { opacity: 1}}
        key={todo.id}>
          <div className="card-body">
            <h4 className="card-title py-3">Topic: {todo.topic}</h4>
            <div className="card-subtitle">Due Date: {todo.dueDate}</div>
            <div className="card-subtitle">Priority: {todo.priority}</div>
            <div className="card-subtitle pb-3">Status: {todo.status ? 'Completed' : 'Not Completed'}</div>
            <div className="card-text">Description: {todo.description}</div>
            
            <div className="cardButtons card-footer d-flex justify-content-end align-items-center gap-1">
              <button className="buttons btn btn-danger" onClick={() => dispatch(removeTodo(todo.id))}><FontAwesomeIcon icon={faTrashCan} className="icons" /></button>
              <button className="buttons btn btn-success" onClick={() => handleEditClick(todo.id)}><FontAwesomeIcon icon={faPenToSquare} className="icons" /></button>
            </div>
          </div>
        </motion.div>
        
        
        
      ))}
{editTodoId && (
    <div className="editContainer">

            <EditTodo
              todo={todos.find(todo => todo.id === editTodoId)}
              onClose={handleCloseEdit}
            />
    </div>

          )}

      
    </div>
  );
}
