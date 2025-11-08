import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: []
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { topic, description, dueDate, priority, status } = action.payload;
      const todo = {
        id: nanoid(),
        topic,
        description,
        dueDate,
        priority,
        status
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...updates };
      }
    }
  }
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
