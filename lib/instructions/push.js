export default function push(state) {
  state.cost++;
  state.pointer++;

  var operand = state.program.readIntLE(state.pointer, 4);
  state.stack.push(operand);
  state.pointer += 4;
  return state;
}
