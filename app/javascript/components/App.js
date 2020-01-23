import React from "react";
import { Route } from "react-router-dom";

// import css styling:
import "./../../assets/stylesheets/application.css";

// import Children components:
import Editor from "./Editor";

const App = () => (
  <div>
    {" "}
    {/* <Switch> */} <Route path="/tasks/:id?" component={Editor} />{" "}
    {/* <Route path="/tags/:id?" component={Editor} />{" "} */}{" "}
    {/* </Switch> */}{" "}
    {/* #Debug */}
    {console.log(
      "[App.js]: has a Route to Editor component if the path is: /tasks/:id? hence either app component or editor component is rendered"
    )}{" "}

    <Route path="/tags/:id?" component={Editor} />{" "}
    {console.log(
      "[App.js] :  has a route to Editor component if the path is /tags/:id? hence either app component or editor component is rendered"
    )}
    {console.log(
      "[App.js]: app/javascript/components/App.js should now render app/javascript/components/Editor.js"
    )}{" "}
  </div>
);

export default App;
