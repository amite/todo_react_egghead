import React from 'react';


export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input type="text" onChange={props.handleInputChange} 
    value={props.currentTodo} />
    {props.errorMessage && <p className="errorMessage">{props.errorMessage}</p>}
  </form>
)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  errorMessage: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
