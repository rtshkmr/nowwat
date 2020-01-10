import React from "react";
import { Route } from "react-router-dom";

// import styling:
import "../../assets/stylesheets/App.css";

// import Children components:
import Editor from "./Editor";


const App = () => (
  <div>
    <Route path="/tasks/:id?" component={Editor} />
    {console.log(
      "Route component rendered. id is optional, hence either app component or editor component is rendered"
    )}
    {console.log(
      "app/javascript/components/App.js should now render app/javascript/components/Editor.js"
    )}
  </div>
);

export default App;
