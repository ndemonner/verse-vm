"use strict";

module.exports = push;
function push(state) {
  state.capacity--;
  state.pointer++;

  state.stack.pop();
  return state;
}