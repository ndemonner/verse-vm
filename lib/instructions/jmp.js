export default function jmp(state) {
  state.cost++;
  state.pointer++;

  var address = state.program.readUIntLE(state.pointer, 2);
  state.pointer = address;
  return state;
}
