import React from "react";
import PropTypes from "prop-types";

// import helper functions:
import { isEmptyObject, validateTask, formatDate } from "./../helpers/helpers";

// Pickaday datepicker
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    // give the form some state:
    this.state = {
      task: props.task,
      errors: {} // using an errors property to handle input checking
    };

    // bind class methods in constructor!
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      onSelect: date => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateEvent("deadline", formattedDate);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { task } = this.state;
    const errors = validateTask(task);
    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      console.log(task);
    }
    console.log("task form has been submitted");
  }

  updateTask(key, value) {
    this.setState(prevState => ({
      task: {
        ...prevState.task,
        [key]: value
      }
    }));
  }

  handleInputChange(task) {
    const { target } = task;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.updateTask(name, value);
  }

  renderErrors() {
    console.log("rendering errors in form submission...");
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the task from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>New Task</h2>
        {this.renderErrors()}
        <form className="taskForm" onSubmit={this.handleSubmit}>
          {/* ============  TITLE  ======================= */}
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          {/* =============== BODY ===================== */}
          <div>
            <label htmlFor="body">
              <strong>Body:</strong>
              <input
                type="text"
                id="body"
                name="body"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            {/* ========== DEADLINE ===================== */}
            <label htmlFor="deadline">
              <strong>Deadline:</strong>
              <input
                type="text"
                id="deadline"
                // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // CREATING A REP ON THE INPUT SO WE CAN REFERENCE IT ELSEWHERE IN THE CODE
                ref={this.dateInput}
                autoComplete="off"
              />
            </label>
          </div>
          {/* ============= COMPLETED STATUS============== */}
          <div>
            <label htmlFor="completed">
              <strong>Completed?:</strong>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save Task</button>
          </div>
        </form>
      </div>
    );
  }
}

// type checking and defaults:
TaskForm.propTypes = {
  task: PropTypes.shape()
};

TaskForm.defaultProps = {
  task: {
    title: "",
    body: "",
    deadline: "",
    completed: false
  }
};

export default TaskForm;
