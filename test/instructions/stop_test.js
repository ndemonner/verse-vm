import stop from '../../lib/instructions/stop';
import VM from '../../lib/vm';

describe('stop', function () {
  beforeEach(function () {
    this.vm = new VM;
  });

  it('moves the instruction pointer to the end of the program', function () {
    this.vm.load("00 00 00 00 00");
    var result = stop(this.vm.state);
    expect(result.pointer).to.eql(result.program.length);
  });
});
