import add from '../../lib/instructions/add';
import VM from '../../lib/vm';

describe('add', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [255, 74]
    });
  });

  it('pops two from the stack, adds them, and pushes the result', function () {
    var result = add(this.vm.state);
    expect(result.stack.pop()).to.eql(329);
  });
});
