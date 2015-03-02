import print from '../../lib/instructions/print';
import VM from '../../lib/vm';

describe('print', function () {
  beforeEach(function () {
    this.vm = new VM({
      stack: [255]
    });
  });

  it('pops and prints the top of stack', function () {
    var originalLog = process.stdout.write.valueOf();
    process.stdout.write = chai.spy();
    print(this.vm.state);
    expect(process.stdout.write).to.be.called.with(255);
    process.stdout.write = originalLog;
  });
});
