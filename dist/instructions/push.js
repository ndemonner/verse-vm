"use strict";

module.exports = push;
function push(state) {
  state.capacity--;
  state.pointer++;

  var operand = state.program.readIntLE(state.pointer, 4);
  state.stack.push(operand);
  state.pointer += 4;
  return state;
}