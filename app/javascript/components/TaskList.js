import React from 'react';
import PropTypes from 'prop-types';

class TaskList extends React.Component {
  renderTasks() {
    const { tasks } = this.props;
    tasks.sort(
      (a, b) => new Date(b.deadline) - new Date(a.deadline),
    );

    return tasks.map(task => (
      <li key={task.id}>
        {task.deadline}
        {' - '}
        {task.title}
      </li>
    ));
  }

  render() {
    return (
      <section>
        <h2>All Tasks</h2>
        <ul>{this.renderTasks()}</ul>
      </section>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};

TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;