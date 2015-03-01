import _ from "lodash";
global._ = _;

import { EventEmitter } from "events";
import binstring from "binstring";

import nop   from "./instructions/nop";
import push  from "./instructions/push";
import pop   from "./instructions/pop";
import load  from "./instructions/load";
import store from "./instructions/store";
import jmp   from "./instructions/jmp";
import jz    from "./instructions/jz";
import jnz   from "./instructions/jnz";
import add   from "./instructions/add";
import sub   from "./instructions/sub";
import mul   from "./instructions/mul";
import div   from "./instructions/div";
import print from "./instructions/print";
import stop  from "./instructions/stop";

export default class VM extends EventEmitter {
  constructor(state = {}) {
    this.state = {
      stack:     state.stack     || [],
      stackSize: state.stackSize || 256,
      program:   state.program   || null,
      pointer:   state.pointer   || 0,
      cost:      state.cost      || 0,
      error:     state.error     || null,
      value:     state.value     || null,
      registers: state.registers || new Array(16)
    }
  }

  load(bytes) {
    if (typeof(bytes) == 'string') {
      bytes = bytes.replace(/\s/g, '');
      bytes = binstring(bytes, {in: 'hex', out: 'bytes'});
    }
    this.state.program = new Buffer(bytes);
  }

  execute() {
    while (this.executeNextInstruction()) {
      this.emit('instructionExecuted', this.state);
    }
    return this.state;
  }

  executeNextInstruction() {
    if (this.state.error != null) {
      this.emit('error', this.state);
      return false;
    }

    if (this.state.pointer >= this.state.program.length) {
      this.state.value = this.state.stack.pop();
      return false;
    }

    var next = this.state.program.readUIntLE(this.state.pointer, 1);
    var dispatcher = {
      0x00: nop,
      0x01: push,
      0x02: pop,
      0x03: load,
      0x04: store,
      0x05: jmp,
      0x06: jz,
      0x07: jnz,
      0x08: add,
      0x09: sub,
      0x0a: mul,
      0x0b: div,
      0x0c: print,
      0x0d: stop
    }

    var instruction = dispatcher[next];
    if (instruction == null) {
      var bytecode = next.toString(16);
      this.state.error = `No such instruction with bytecode 0x${bytecode}`;
      return false;
    }

    this.state = instruction(this.state);
    return true;
  }
}
