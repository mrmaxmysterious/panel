module.exports = (array, object) => {
  var newObj = object;
  array.forEach((prop) => {
    delete newObj[prop];
  });

  return newObj;
};
