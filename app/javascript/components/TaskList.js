import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TaskList extends React.Component {
  renderTasks() {
    const { tasks } = this.props;
    tasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

    return tasks.map(task => (
      <li key={task.id}>
        <Link to={`/tasks/${task.id}`}>
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
      <section>
        <h2>All Tasks</h2>
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
