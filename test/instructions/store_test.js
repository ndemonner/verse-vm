import store from '../../lib/instructions/store';
import VM from '../../lib/vm';

describe('store', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [57]
    });
  });

  it('pops a value off the stack and stores in register', function () {
    this.vm.load("04 0a");
    var result = store(this.vm.state);
    expect(result.registers[0x0a]).to.eql(57);
  });
});
