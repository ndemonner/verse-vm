"use strict";

module.exports = print;
function print(state) {
  state.capacity--;
  state.pointer++;

  console.log(state.stack.pop());
  return state;
}