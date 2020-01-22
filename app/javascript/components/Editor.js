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

import TagList from "./TagList";
import Tag from "./Tag";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      tags: null
    };

    //   bind class methods: ADD/DELETE/UPDATE
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);

    console.log("editor component has been contructed");
  }

  // =========================  API FETCHING UPON MOUNT ================================

  componentDidMount() {
    console.log(
      "componentDidMount hook is now running after the editor component has been mounted..."
    );
    // ----------------- adding the tasks to state by making API call ------------------------------
    axios
      .get("/api/tasks.json")
      .then(response => {
        this.setState({ tasks: response.data });
        console.log("axios response for get /api/tasks.json: ", response.data);
        console.log("current state in Editor.js: ", this.state);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(
      "from within the get axios call for all tasks: ",
      this.state.tasks
    );
    console.log(
      "API for all tasks has been pulled by Editor.js upon the Editor component being mounted"
    );
    console.log("this.state.tasks:", this.state.tasks);

    // -------------------- fetching tags and putting to state : ------------------------------
    axios
      .get("/api/tags.json")
      .then(response => {
        this.setState({ tags: response.data });
        console.log("axios response for get /api/tags.json", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // =========================  CREATE/NEW TASK METHOD ================================

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

  // =========================  CREATE/NEW TAG METHOD ================================

  // =========================  DELETE TASK METHOD ================================

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

  // =========================  UPDATE/EDIT TASK METHOD ================================

  updateTask(updatedTask) {
    axios
      .put(`/api/tasks/${updatedTask.id}.json`, updatedTask)
      .then(() => {
        alert("Task update successfully");
        const { tasks } = this.state;
        const idx = tasks.findIndex(task => task.id === updatedTask.id);
        tasks[idx] = updatedTask;
        const { history } = this.props;
        history.push(`/tasks/${updatedTask.id}`);
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    /*
        What is encapsulated: 
        - tasks: API output for /tasks.json
        - tags: API output for /tags.json
        - match : holds the input params (browser's requested url params)
        */
    const { tasks } = this.state;
    const { tags } = this.state;
    console.log("from within editor.js, const {tasks} = this.state", tasks);
    console.log("from within editor.js, const {tags} = this.state", tags);
    //   null check just in case
    if (tasks === null) return null;
    if (tags === null) return null;
    const { match } = this.props;
    console.log("props passed in const{match} = this.props", match);

    // url info:
    // need not necessarily be taskID, if tags, then it's tagID
    const taskId = match.params.id;
    const task = tasks.find(e => e.id === Number(taskId));
    const tag = tags.find(e => e.id === Number(taskId));

    console.log("this.state.tasks from editor.js:", this.state.tasks);
    console.log("**** tasks:", tasks);
    console.log("**** task:", task);
    console.log("**** tags:", tags);
    console.log("**** tag:", tag);

    console.log("now rendering the editor component");

    return (
      <div>
        <Header />{" "}
        {/* Keep routes in this order:
                                                1. new
                                                2. edit
                                                3.delete
                                                4.display
                                                */}{" "}
        <div className="grid">
          <div>
            <TaskList tasks={tasks} activeId={Number(taskId)} />{" "}
            <TagList tags={this.state.tags} />{" "}
          </div>{" "}
          {console.log(
            "TaskList component should be rendered with the tasks passed in"
          )}{" "}
          {/*  ===========================   ROUTING TABLE BELOW  ============================= */}{" "}
          <Switch>
            {" "}
            {/* -------------new task form ----------------------- */}{" "}
            <PropsRoute
              path="/tasks/new"
              component={TaskForm}
              onSubmit={this.addTask}
              // addTask callback function is passed to TaskForm as a callback function prop
            />{" "}
            {/* -------------edit task route ----------------------- */}{" "}
            <Switch>
              {" "}
              {/*  urm this needs tobe removed idk why it's here... */}{" "}
              {/* <PropsRoute
                                path="/tasks/new"
                                component={TaskForm}
                                onSubmit={this.addTask}
                              />{" "} */}{" "}
              <PropsRoute
                exact
                path="/tasks/:id/edit"
                component={TaskForm}
                task={task}
                onSubmit={this.updateTask}
              />{" "}
              {/* -------------Delete task callback route ------------- */}{" "}
              <PropsRoute
                path="/tasks/:id"
                component={Task}
                task={task}
                onDelete={this.deleteTask}
              />{" "}
            </Switch>{" "}
            {/* -------------display task ----------------------- */}{" "}
            <PropsRoute path="/tasks/:id" component={Task} task={task} />{" "}
            {/* -------------display tag ----------------------- */}{" "}
            <PropsRoute path="/tags/:id" component={Tag} tag={tag} />{" "}
          </Switch>{" "}
          {/* SIMULTANEOUSLY DISPLAY TAGSLIST */}{" "}
          {console.log(
            "tags props passed into TagList component: ",
            this.state.tags
          )}{" "}
        </div>{" "}
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
