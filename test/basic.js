const should = require('should');

describe('basic types', function() {
  it('array - map reduce', function() {
    let arr = [1, 4, 45, 8];

    let res = arr
      .map((num) => {
        return num * 2;
      })
      .reduce((accum, current) => {
        return accum + current;
      });

    res.should.equal(116); // 2 + 8 + 90 + 16
  });
  it('HashMap', () => {
    let m = new Map();
    m.set('wei', 19);
    m.set('yoyo', 90);
    m.set(88, 'string result');
    m.get('yoyo').should.be.equal(90);
    m.get(88).should.be.equal('string result');
  });
  it('array foreach', () => {
    let arr = [2, 5, 7];
    let res = [];
    arr.forEach((value) => {
      res.push(value);
    });
    res.length.should.equal(3);
  });
  it('map foreach', () => {
    let m = new Map();
    m.set(6, 'yo');
    m.set('wei', 82);

    let values = [];
    // 先にvalue
    m.forEach((value, key) => {
      values.push(value);
    });
    values.length.should.equal(2);
  });
  it('set test', () => {
    let s = new Set();
    s.add('yo');
    s.add(8);
    s.has(8).should.be.true();
  });
  it('read txt', () => {
    // let lineReader = require('readline').createInterface({
    //   input: require('fs').createReadStream('./text.txt'),
    // });
    // lineReader.on('line', (l) => {
    //   console.log(l);
    // });
    require('fs').readFile('./test/test.txt', 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
    });
  });
  it('read txt line by line', () => {
    let fs = require('fs');
    let readline = require('readline');
    let instream = fs.createReadStream('./test/test.txt');
    let outstream = new (require('stream'))();
    let rl = readline.createInterface(instream, outstream);

    // 空行ならundefined
    rl.on('line', (line) => {
      console.log(line);
    });
    rl.on('close', (line) => {
      console.log(line);
      console.log('read line end');
    });
  });
  it('forEach continue', () => {
    let arr = [1, 2, 3, 4];
    arr.forEach((val) => {
      if (val === 3) return;
      console.log(val);
    });
  });
});
// 非promiseでもthenで繋げるのかと、(resolve, reject)あたり
describe('promise', () => {
  it('simple', () => {
    let a = new Promise((resolve, reject) => {
      resolve(5);
    });
    // (resolve, reject)でchain
    return (
      a
        .then((num) => {
          console.log(`a then ${num}`);
          Promise.resolve('result');
          num.should.equal(5);
        })
        // Promise.resolve で chain
        .then((s) => {
          console.log(`second then ${s}`);
          // return {
          //   x: 'yoyo',
          // };

          should.be.undefined(s);
          Promise.resolve();
        })
        // ただのreturn
        .then((obj) => {
          console.log(`third then ${obj.x}`);
          should.be.equal(obj);
          Promise.resolve();
        })
    );
  });
  it('resolve, reject関数を持っていなくてもchainできるが、値は渡せない', () => {
    return new Promise((resolve, reject) => {
      resolve(5);
    })
      .then((num) => {
        Promise.resolve('result');
        num.should.equal(5);
      })
      .then((s) => {
        should(s).be.undefined();
      })
      .then((s) => {
        should(s).be.undefined();
      });
  });
});
