export default function deleteProps(array: any[], object: any) {
  var newObj = object;
  array.forEach((prop) => {
    delete newObj[prop];
  });

  return newObj;
}
