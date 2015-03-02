import VM from '../lib/vm';
import fs from 'fs';

function loadFixture(name) {
  return fs.readFileSync(`test/fixtures/${name}.vm`);
}

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
    this.vm.load(loadFixture('addition'));
    var result = this.vm.execute();
    expect(result.value).to.eql(21);
  });

  it('can execute a complex program', function () {
    this.vm.load(loadFixture('factorial'));
    var result = this.vm.execute();
    expect(result.value).to.eql(3628800);
  });

  it('uses energy as it executes', function () {
    this.vm.load("010a000000");
    this.vm.state.capacity = 10;
    var result = this.vm.execute();
    expect(result.capacity).to.eql(9);
  });

  it('emits an error and cancels if capacity is exhausted', function () {
    var fn = chai.spy();
    this.vm.on('executionError', fn);
    this.vm.load("01 0a000000 01 0b000000");
    this.vm.state.capacity = 1;
    var result = this.vm.execute();
    expect(result.error).to.eql('Not enough capacity to continue execution');
    expect(fn).to.be.called;
  });
});
