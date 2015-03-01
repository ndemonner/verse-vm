import print from '../../lib/instructions/print';
import VM from '../../lib/vm';

describe('print', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [255]
    });
  });

  it('pops and prints the top of stack', function () {
    var originalLog = console.log.valueOf();
    console.log = chai.spy();
    print(this.vm.state);
    expect(console.log).to.be.called.with(255);
    console.log = originalLog;
  });
});
