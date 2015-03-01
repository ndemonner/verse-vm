import load from '../../lib/instructions/load';
import VM from '../../lib/vm';

describe('load', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [],
      registers: [10]
    });
  });

  it('pushes a value from a register onto the stack', function () {
    this.vm.load("03 00");
    var result = load(this.vm.state);
    expect(result.stack.pop()).to.eql(10);
  });
});
