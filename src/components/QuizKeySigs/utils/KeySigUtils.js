export function reorder(data, index) {
  return data.slice(index).concat(data.slice(0, index));
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default reorder;
