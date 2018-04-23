const Target = require('../src/promiseByQ');
const should = require('should');

describe('test', () => {
  // Promiseのテスト
  it('ret5', () => {
    let a = new Target();
    // Promiseを返して、thenでassertできる
    return a.ret5().then((res) => {
      res.should.be.equal(5);
    });
  });
  it('showValueLater', () => {
    let a = new Target();
    return a.showValueLater('passed string').then((res) => {
      res.should.be.equal('passed string');
    });
  });
});
