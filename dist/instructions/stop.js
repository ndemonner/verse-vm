"use strict";

module.exports = stop;
function stop(state) {
  state.pointer = state.program.length;
  return state;
}