export default function jnz(state) {
  state.capacity--;
  state.pointer++;

  var value = state.stack.pop();
  if (value !== 0) {
    var address = state.program.readUIntLE(state.pointer, 2);
    state.pointer = address;
  } else {
    state.pointer += 2;
  }
  return state;
}
