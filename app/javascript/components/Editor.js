import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PropsRoute from "./PropsRoute";

// importing react child components:
import Header from "./Header";
import Task from "./Task";
import TaskList from "./TaskList";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
    };
    console.log("editor component has been contructed");
  }

  componentDidMount() {
    console.log(
      "componentDidMount hook is now running after the editor component has been mounted..."
    );
    axios
      .get("/api/tasks.json")
      .then(response => this.setState({ tasks: response.data }))
      .catch(error => {
        console.log(error);
      });
    console.log(
      "API for all tasks has been pulled by Editor.js upon the Editor component being mounted"
    );
  }

  render() {
    const { tasks } = this.state;
    //   null check just in case
    if (tasks === null) return null;

    const { match } = this.props;
    const taskId = match.params.id;
    const task = tasks.find(e => e.id === Number(taskId));

    console.log("now rendering the editor component");

    return (
      <div>
        <Header />
        <TaskList tasks={tasks} />
        {console.log(
          "TaskList component should be rendered with the tasks passed in"
        )}
        {/* PropsRoute component is created to pass props to the child component */}
        <PropsRoute path="/tasks/:id" component={Task} task={task} />
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape()
};

Editor.defaultProps = {
  match: undefined
};

export default Editor;
