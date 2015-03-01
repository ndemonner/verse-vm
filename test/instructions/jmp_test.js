import jmp from '../../lib/instructions/jmp';
import VM from '../../lib/vm';

describe('jmp', function () {
  beforeEach(function () {
    this.vm = new VM;
  });

  it('move instruction pointer to new address', function () {
    this.vm.load("05 07 00 00 00 00 00 00");
    var result = jmp(this.vm.state);
    expect(result.pointer).to.eql(7);
  });
});
