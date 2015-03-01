import jz from '../../lib/instructions/jz';
import VM from '../../lib/vm';

describe('jz', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [1, 0]
    });
  });

  it('jumps to new address if top of stack is zero', function () {
    // First time we try, top of stack is 0, so we move to the address 0x0004
    this.vm.load("06 04 00 0d 01");
    var result = jz(this.vm.state);
    expect(result.pointer).to.eql(4);

    // Second time the top of stack is 1, so we just move to the next instuction
    // at 0x0003
    this.vm.state.pointer = 0; // Reset the instruction pointer
    result = jz(this.vm.state);
    expect(result.pointer).to.eql(3);
  });
});
