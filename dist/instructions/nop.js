"use strict";

module.exports = nop;
function nop(state) {
  state.pointer++;
  return state;
}