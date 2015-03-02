"use strict";

module.exports = store;
function store(state) {
  state.capacity--;
  state.pointer++;

  var index = state.program.readUIntLE(state.pointer, 1);
  state.registers[index] = state.stack.pop();
  state.pointer++;
  return state;
}