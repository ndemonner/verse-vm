export default function push(state) {
  state.cost++;
  state.pointer++;

  state.stack.pop();
  return state;
}
