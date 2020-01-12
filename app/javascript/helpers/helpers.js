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
    errors.deadline = 'You must enter a valid date for deadline';
  }
  console.log(task);
  return errors;
};

export const formatDate = d => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  // return `${YYYY}-${MM}-${DD}`;
  return `${DD}/${MM}/${YYYY}`;
};
