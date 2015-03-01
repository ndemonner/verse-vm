import jnz from '../../lib/instructions/jnz';
import VM from '../../lib/vm';

describe('jnz', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [0, 1]
    });
  });

  it('jumps to new address if top of stack is not zero', function () {
    // First time we try, top of stack is 1, so we move to the address 0x0004
    this.vm.load("07 04 00 0d 01");
    var result = jnz(this.vm.state);
    expect(result.pointer).to.eql(4);

    // Second time the top of stack is 0, so we just move to the next instuction
    // at 0x0003
    this.vm.state.pointer = 0; // Reset the instruction pointer
    result = jnz(this.vm.state);
    expect(result.pointer).to.eql(3);
  });
});
