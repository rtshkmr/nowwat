import React from "react";
import PropTypes from "prop-types";

const Task = ({ task }) => (
  <div>
    <h2>
      {task.deadline}
      {" - "}
      {task.title}
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
  task: PropTypes.shape()
};

Task.defaultProps = {
    task: {}, 
};

export default Task;
