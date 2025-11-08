import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { editTodo } from '../features/todo/todoSlice';
import './styles.css';

export default function EditTodo({ todo, onClose }) {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    dueDate: '',
    priority: '',  
    status: false
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setFormData({
        topic: todo.topic,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        status: todo.status
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const editTodoHandler = (e) => {
    e.preventDefault();
    dispatch(editTodo({
      id: todo.id,
      updates: formData
    }));
    onClose(); 
  };

  return (
    <div>
      <div className="editCard bg-light p-4">
        <form onSubmit={editTodoHandler}>
          <div className="form-floating mb-3">
            <input 
              className="form-control" 
              type="text" 
              id="topic" 
              name="topic" 
              placeholder="Topic" 
              value={formData.topic} 
              onChange={handleChange}
            />
            <label className="text-dark" htmlFor="topic">Topic</label>
          </div>

          <div className="form-floating mb-3">
            <input 
              className="form-control" 
              type="date" 
              id="dueDate" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange}
            />
            <label htmlFor="dueDate">Due Date</label>
          </div>

          <div className="form-floating mb-3">
            <select 
              className="form-select" 
              id="priority" 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label htmlFor="priority">Priority</label>
          </div>

          <div className="form-floating mb-3">
            <textarea 
              className="desc form-control h-50" 
              id="description" 
              name="description" 
              placeholder="Description" 
              value={formData.description} 
              onChange={handleChange}
            />
            <label className="text-dark" htmlFor="description">Description</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            <label className="form-check-label text-dark" htmlFor="status">
              Completed
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
