const target = require('../src/underscoreTutorial');
const should = require('should');

describe('doubleAll', function() {
  it('double array elements', function() {
    let obj = new target.UnderscoreTutorial();

    let arr = [1, 4, 45, 8];

    let res = obj.doubleAll(arr);

    res.length.should.equal(4);
    res[0].should.equal(2);
    res[1].should.equal(8);
    res[2].should.equal(90);
    res[3].should.equal(16);
  });
});
