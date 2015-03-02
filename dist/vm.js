"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("lodash"));

global._ = _;

var EventEmitter = require("events").EventEmitter;
var binstring = _interopRequire(require("binstring"));

var nop = _interopRequire(require("./instructions/nop"));

var push = _interopRequire(require("./instructions/push"));

var pop = _interopRequire(require("./instructions/pop"));

var load = _interopRequire(require("./instructions/load"));

var store = _interopRequire(require("./instructions/store"));

var jmp = _interopRequire(require("./instructions/jmp"));

var jz = _interopRequire(require("./instructions/jz"));

var jnz = _interopRequire(require("./instructions/jnz"));

var add = _interopRequire(require("./instructions/add"));

var sub = _interopRequire(require("./instructions/sub"));

var mul = _interopRequire(require("./instructions/mul"));

var div = _interopRequire(require("./instructions/div"));

var print = _interopRequire(require("./instructions/print"));

var stop = _interopRequire(require("./instructions/stop"));

var VM = (function (EventEmitter) {
  function VM() {
    var state = arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, VM);

    this.state = {
      stack: state.stack || [],
      stackSize: state.stackSize || 256,
      program: state.program || null,
      pointer: state.pointer || 0,
      error: state.error || null,
      value: state.value || null,
      registers: state.registers || new Array(16),
      capacity: state.capacity || 999999
    };
  }

  _inherits(VM, EventEmitter);

  _prototypeProperties(VM, null, {
    load: {
      value: function load(bytes) {
        if (typeof bytes == "string") {
          bytes = bytes.replace(/\s/g, "");
          bytes = binstring(bytes, { "in": "hex", out: "bytes" });
        }
        this.state.program = new Buffer(bytes);
      },
      writable: true,
      configurable: true
    },
    execute: {
      value: function execute() {
        while (this.executeNextInstruction()) {
          this.emit("instructionExecuted", this.state);
        }
        return this.state;
      },
      writable: true,
      configurable: true
    },
    executeNextInstruction: {
      value: function executeNextInstruction() {
        if (this.state.error != null) {
          this.emit("executionError", this.state);
          return false;
        }

        if (this.state.pointer >= this.state.program.length) {
          this.state.value = this.state.stack.pop();
          return false;
        }

        var next = this.state.program.readUIntLE(this.state.pointer, 1);
        var dispatcher = {
          0: nop,
          1: push,
          2: pop,
          3: load,
          4: store,
          5: jmp,
          6: jz,
          7: jnz,
          8: add,
          9: sub,
          10: mul,
          11: div,
          12: print,
          13: stop
        };

        var instruction = dispatcher[next];
        if (instruction == null) {
          var bytecode = next.toString(16);
          this.state.error = "No such instruction with bytecode 0x" + bytecode;
          return false;
        }

        this.state = instruction(this.state);

        if (this.state.capacity <= 0) {
          this.state.error = "Not enough capacity to continue execution";
          this.emit("executionError", this.state);
          return false;
        } else {
          return true;
        }
      },
      writable: true,
      configurable: true
    }
  });

  return VM;
})(EventEmitter);

module.exports = VM;