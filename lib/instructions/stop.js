export default function stop(state) {
  state.pointer = state.program.length;
  return state;
}
