import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {pipe, partial} from './lib/utils'

import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, updateTodo, toggleTodo, removeTodo, filterTodos} from './lib/todoHelpers'

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

  static contextTypes = {
    route: React.PropTypes.string
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
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

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({ todos: updatedTodos })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)

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
          handleSubmit={submitHandler} />
          <TodoList handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove}
                    todos={displayTodos} />
          <Footer />
        </section>
      </div>
    );
  }
}

export default App;
