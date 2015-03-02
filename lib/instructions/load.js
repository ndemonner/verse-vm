export default function load(state) {
  state.capacity--;
  state.pointer++;

  var index = state.program.readUIntLE(state.pointer, 1);
  state.stack.push(state.registers[index]);
  state.pointer++;
  return state;
}
