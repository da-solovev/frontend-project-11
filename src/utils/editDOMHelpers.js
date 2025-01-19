const addClasses = (node, classes = []) => {
  classes.forEach((className) => {
    node.classList.add(className);
  });
};

export default addClasses;
