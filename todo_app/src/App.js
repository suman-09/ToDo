import React, { useState } from 'react';
import "./App.css";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [editID, setEditID] = useState(0);

const handleSubmit = (e) => {
  e.preventDefault();

  if (editID) {
    const editTodo = todos.find((i) => i.id === editID);
    const updatedTodos = todos.map((t) => t.id === editTodo.id ? (t = {id: t.id, todo}) : {id: t.id, todo: t.todo});
    setTodos(updatedTodos);
    setEditID(0);
    setTodo("");
    return;
  }

  if (todo !== ''){
    setTodos([{id:`${todo}-${Date.now()}` ,todo}, ...todos]) 
  }
  setTodo("");

}

const handleDelete = (id) => {
  const dltTodo = todos.filter((to) => to.id !== id); 
  setTodos([...dltTodo]);
}

const handleEdit = (id) => {
  const editTodo = todos.find((i) => i.id === id);
  setTodo(editTodo.todo);
  setEditID(id);
}

  return (
    <div className='App'>
      <div className='container'>
        <h1>Todo List App</h1>
      <TodoForm handleSubmit={handleSubmit} todo={todo} setTodo={setTodo} editID={editID} />
      <TodoList todos= {todos} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;