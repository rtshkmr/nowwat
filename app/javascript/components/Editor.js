import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PropsRoute from "./PropsRoute";
import { Switch } from "react-router-dom";

// importing react child components:
import Header from "./Header";
import Task from "./Task";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
    };

    //   bind class method:
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

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

  addTask(newTask) {
    axios
      .post("/api/tasks.json", newTask)
      .then(response => {
        alert("Task Added!");
        const savedTask = response.data;
        this.setState(prevState => ({
          tasks: [...prevState.tasks, savedTask]
        }));
        const { history } = this.props;
        //   redirect to the created task component:
        history.push(`/tasks/${savedTask.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteTask(taskId) {
    const sure = window.confirm("Are you sure?");
    if (sure) {
      axios
        .delete(`/api/tasks/${taskId}.json`)
        .then(response => {
          if (response.status === 204) {
            alert("Task deleted");
            const { history } = this.props;

            //   redirect to the root page
            history.push("/tasks");

            const { tasks } = this.state;

            //   remove the deleted element from state:
            this.setState({ tasks: tasks.filter(task => task.id !== taskId) });
            console.log("task has been sucessfully deleted...");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
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
        {/* Keep routes in this order:
1. new
2.delete
3.display
*/}
        <div className="grid">
          <TaskList tasks={tasks} activeId={Number(taskId)} />
          {console.log(
            "TaskList component should be rendered with the tasks passed in"
          )}
          <Switch>
            {/* -------------new task form ----------------------- */}
            <PropsRoute
              path="/tasks/new"
              component={TaskForm}
              onSubmit={this.addTask}
              // addTask callback function is passed to TaskForm as a callback function prop
            />
            {/* -------------Delete task callback route ------------- */}
            <PropsRoute
              path="/tasks/:id"
              component={Task}
              task={task}
              onDelete={this.deleteTask}
            />
            {/* -------------display task ----------------------- */}
            <PropsRoute path="/tasks/:id" component={Task} task={task} />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

Editor.defaultProps = {
  match: undefined
};

export default Editor;
