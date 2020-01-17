import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // to pass existing props to tag form when editing
import { tag_list } from "./../helpers/helpers";
import { task_list } from "./../helpers/helpers";

const Tag = ({ tag }) => (
  <div className="taskContainer">
    {   console.log("*** props received by Tag.js:", tag)}
    {" "}
    {console.log("props received by Tag.js: ", tag)} <h2> {tag.name}</h2>{" "}
    <ul>
      <li>
        <strong> Associated Tasks: </strong>{" "}
      </li>{" "}
      <li className="task_list"> {task_list(tag)} </li>{" "}
    </ul>{" "}
  </div>
);

Tag.propTypes = {
  tag: PropTypes.shape()
};

Tag.defaultProps = {
  tag: {}
};

export default Tag;
