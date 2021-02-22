export function reorder(data, index) {
  return data.slice(index).concat(data.slice(0, index));
}

export default reorder;
