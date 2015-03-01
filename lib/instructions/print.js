export default function print(state) {
  state.cost++;
  state.pointer++;

  console.log(state.stack.pop());
  return state;
}
