import mul from '../../lib/instructions/mul';
import VM from '../../lib/vm';

describe('mul', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [2, 3]
    });
  });

  it('pops two elements on the stack and pushes their product', function () {
    var result = mul(this.vm.state);
    expect(result.stack.pop()).to.eql(6);
  });
});
