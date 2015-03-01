import VM from '../lib/vm';
import fs from 'fs';

// push 10
// push 11
// add
var additionExample = "01 0a 00 00 00 01 0b 00 00 00 08";

describe('VM', function () {
  beforeEach(function () {
    this.vm = new VM;
  });

  it('emits an event for each instruction', function () {
    var fn = chai.spy();
    this.vm.on('instructionExecuted', fn);
    this.vm.load("00 00 00");
    this.vm.execute();
    expect(fn).to.be.called.exactly(3).times;
  });

  it('emits an event when there is an error', function () {
    var fn = chai.spy();
    this.vm.on('error', fn);
    this.vm.load("ff");
    this.vm.execute();
    expect(fn).to.be.called;
  });

  it('can load a byte array as a program', function () {
    this.vm.load([0x00]);
    var buf = new Buffer([0x00]);
    expect(this.vm.state.program).to.eql(buf);
  });

  it('can load a hexstring as a program', function () {
    this.vm.load("00 00");
    var buf = new Buffer([0x00, 0x00]);
    expect(this.vm.state.program).to.eql(buf);

    this.vm.load("0000");
    var buf = new Buffer([0x00, 0x00]);
    expect(this.vm.state.program).to.eql(buf);
  });

  it('can execute a simple program', function () {
    this.vm.load(additionExample);
    var result = this.vm.execute();
    expect(result.value).to.eql(21);
  });
});
