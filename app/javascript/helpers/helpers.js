import React from "react";
import { Link } from "react-router-dom"; // to pass existing props to task form when editing

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateTask = task => {
  const errors = {};

  if (task.title === "") {
    errors.title = "You must enter a title for your task";
  }

  if (task.body === "") {
    errors.body = "You must enter a body for your task";
  }

  if (!isValidDate(task.deadline)) {
    errors.deadline = "You must enter a valid date for deadline";
  }
  console.log(task);
  return errors;
};

export const formatDate = d => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
  // return `${DD}/${MM}/${YYYY}`;
};

// export function tag_list(task) {
//   let result = "";
//   task.tags.forEach(element => {
//     <div>
//       <Link to={`/tags/${element.id}`}> {element.name}</Link>
//     </div>;
//   });
//   return (
//     <div>
//       {/* <Link to={`/tags/${element.id}`}> { element.name }</Link> */}

//       {/* {result} */}
//     </div>
//   );
// }

export function tag_list(task) {
  let result = "";
  task.tags.forEach(element => {
    result += "| #" + element.name + " |";
  });
  return result;
}

export function task_list(tag) {
  let result = "";
  console.log("[helpers.js]: |task_list method|: tag.tasks: ", tag.tasks[0].title);
  tag.tasks.forEach(element => {
    result += " |" + element.title + " |";
  });
  return result;
}
