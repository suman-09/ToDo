import React, { useState } from 'react';
import "./App.css";

const App = () => {
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState([]);
const [editID, setEditID] = useState(0);

const handleSubmit = (e) => {
  e.preventDefault();

  if (editID) {
    const editTodo = todos.find((i) => i.id === editID);
    const updatedTodos = todos.map((t) => t.id === editTodo.id ? (t = {id: t.id, todo}) : {id: t.id, todo: t.todo}); // at first we will check the id is matching or not once it gets matched then we will provide it with the id and todo of the currently operating edit if there's a change in edit then it's goint to update it if not then it will keep the same
    setTodos(updatedTodos);
    setEditID(0);
    setTodo("");
    return;
  }

  if (todo !== ''){
    setTodos([{id:`${todo}-${Date.now()}` ,todo}, ...todos]) // ... three dots are spread operator it stores the previous data
  }
  setTodo("");

}

const handleDelete = (id) => {
  const dltTodo = todos.filter((to) => to.id !== id); // its going to search that id if that's present then it's goint to be deleted otherwise its not going to be deleted
  // now we need to update the state
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
        <form className='todoForm' onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/> {/*changing the value through on change and getting the value through value*/}
          <button type='submit'> {editID ? "Edit" : "Go"}</button>
        </form>
        <ul className='allTodos'>
          {
            todos.map((t) => (
              <li className='singleTodo'>
                <span className='Todotext' key={t.id} > {t.todo}</span>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))
          }
          
        </ul>
      </div>
    </div>
  );
};

export default App;