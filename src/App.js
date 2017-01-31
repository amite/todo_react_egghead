import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId} from './lib/todoHelpers'

class App extends Component {

  // es6 property initializer syntax
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an awesome app', isComplete: false},
      {id: 3, name: 'Ship It', isComplete: false}
    ],
    currentTodo: '',
    errorMessage: ''
  }
  
  handleInputChange = (evt) => {
    this.setState({ currentTodo: evt.target.value, errorMessage: ''})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newTodo = {id: generateId(), name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </header>
        <section className="Todo-App">
          <TodoForm handleInputChange={this.handleInputChange} 
          currentTodo={this.state.currentTodo}
          errorMessage={this.state.errorMessage}
          handleSubmit={submitHandler}/>
          <TodoList todos={this.state.todos} />
        </section>
      </div>
    );
  }
}

export default App;
