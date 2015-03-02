export default function push(state) {
  state.capacity--;
  state.pointer++;

  state.stack.pop();
  return state;
}
