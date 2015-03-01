import sub from '../../lib/instructions/sub';
import VM from '../../lib/vm';

describe('sub', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [255, 74]
    });
  });

  it('pops two elements on the stack and pushes their difference', function () {
    var result = sub(this.vm.state);
    expect(result.stack.pop()).to.eql(181);
  });
});
