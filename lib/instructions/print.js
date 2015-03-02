export default function print(state) {
  state.capacity--;
  state.pointer++;

  process.stdout.write(state.stack.pop());
  return state;
}
