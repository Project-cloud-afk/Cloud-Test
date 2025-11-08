import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import './styles.css';

export default function AddTodo({ onCreate }) {
  const [formData, setFormData] = useState({
    topic: '',
    description: 'N/A',
    dueDate: '',
    priority: '',
    status: false
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(formData));
    
    setFormData({
      topic: '',
      description: '',
      dueDate: '',
      priority: '',
      status: false
    });

    onCreate();
  };

  return (
    <div>
      <div className="addCard bg-light p-4">
        <form onSubmit={addTodoHandler}>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              id="topic"
              name="topic"
              placeholder="Topic"
              value={formData.topic}
              onChange={handleChange}
              required
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
              required
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
              required
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
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              maxLength={350}
            />
            <label className="text-dark" htmlFor="description">Description</label>
          </div>

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
