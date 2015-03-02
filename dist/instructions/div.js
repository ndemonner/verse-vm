"use strict";

module.exports = div;
function div(state) {
  state.capacity -= 2;
  state.pointer++;

  var s1 = state.stack.pop();
  var s2 = state.stack.pop();
  var result = ~ ~(s2 / s1); // Fast integer division
  state.stack.push(result);
  return state;
}