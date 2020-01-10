import React from "react";
import PropTypes from "prop-types";

const Task = ({ task, onDelete }) => (
  <div className="taskContainer">
    <h2>
      {task.deadline}
      {" - "}
      {task.title}
      <button
        className="delete"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete Task
      </button>
    </h2>
    <ul>
      <li>
        <strong>Title:</strong>
        {task.title}
      </li>
      <li>
        <strong>Body:</strong>
        {task.body}
      </li>
      <li>
        <strong>Deadline:</strong>
        {task.deadline}
      </li>
      <li>
        <strong>Complete?</strong>
        {task.completed ? " yes" : " no"}
      </li>
    </ul>
  </div>
);

Task.propTypes = {
  task: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired
};

Task.defaultProps = {
  task: {}
};

export default Task;
