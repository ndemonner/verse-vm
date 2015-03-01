import pop from '../../lib/instructions/pop';
import VM from '../../lib/vm';

describe('pop', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [1]
    });
  });

  it('pops the top of the stack', function () {
    var result = pop(this.vm.state);
    expect(result.stack).to.eql([]);
  });
});
