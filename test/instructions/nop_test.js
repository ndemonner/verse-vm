import nop from '../../lib/instructions/nop';

describe('push', function () {
  it('simply increases the instruction pointer for free', function () {
    var result = nop({pointer: 0, cost: 0});
    expect(result.pointer).to.eql(1);
  });
});
