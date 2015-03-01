import push from '../../lib/instructions/push';
import VM from '../../lib/vm';

describe('push', function () {
  beforeEach(function () {
    this.vm = new VM;
  });

  it('pushes the operand onto the stack', function () {
    this.vm.load("01 ff 00 00 00");
    var result = push(this.vm.state);
    expect(result.pointer).to.eql(5);
    expect(result.stack.pop()).to.eql(255);
  });
});
