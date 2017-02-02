import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {pipe, partial} from './lib/utils'

import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, updateTodo, toggleTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';

class App extends Component {

  // es6 property initializer syntax
  state = {
    todos: [],
    currentTodo: '',
    errorMessage: '',
    message: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({todos}))
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'))
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
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todos Added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({ message: ''}), 1000)
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)

    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)

    this.setState({ todos: updatedTodos })
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)

    return (
      <div className="App">
        <header className="App-header">
          {this.state.message && <p>{this.state.message}</p>}
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
