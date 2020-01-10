import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TaskList extends React.Component {
  renderTasks() {
    const { activeId, tasks } = this.props;
    tasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

    return tasks.map(task => (
      <li key={task.id}>
        <Link
          to={`/tasks/${task.id}`}
          className={activeId === task.id ? "active" : ""}
        >
          {task.deadline}
          {" - "}
          {task.title}
        </Link>
      </li>
    ));
  }

  render() {
    console.log("the TaskList component is now rendering...");
    return (
      <section className="taskList">
        <h2>
          All Tasks
          <Link to="/tasks/new"> Add New Task</Link>
        </h2>
        <ul>{this.renderTasks()}</ul>
      </section>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object)
};

TaskList.defaultProps = {
  tasks: []
};

export default TaskList;
