export default function store(state) {
  state.cost++;
  state.pointer++;

  var index = state.program.readUIntLE(state.pointer, 1);
  state.registers[index] = state.stack.pop();
  state.pointer++;
  return state;
}
