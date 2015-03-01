import div from '../../lib/instructions/div';
import VM from '../../lib/vm';

describe('div', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [6, 2]
    });
  });

  it('pops two elements on the stack and pushes their quotient', function () {
    var result = div(this.vm.state);
    expect(result.stack.pop()).to.eql(3);

    this.vm.state.stack = [5, 3];
    result = div(this.vm.state);
    expect(result.stack.pop()).to.eql(1);
  });
});
