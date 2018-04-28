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
    let res = [];
    arr.forEach((val) => {
      if (val === 3) return;
      res.push(val);
    });
    res.should.deepEqual([1, 2, 4]);
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
          Promise.resolve('result');
          num.should.equal(5);
        })
        // Promise.resolve で 次の段に値は渡らない
        .then((s) => {
          should(s).be.undefined();
        })
        .then((obj) => {
          should(obj).be.undefined();
        })
    );
  });
  it('resolve, reject関数を持っていなくてもchainできるが、値は渡せない', () => {
    return (
      new Promise((resolve, reject) => {
        resolve(5);
      })
        .then((num) => {
          Promise.resolve('result');
          num.should.equal(5);
        })
        // 前段がpromiseでなくてもchainできる
        // promiseでない関数でresolveしても次に渡らない
        .then((s) => {
          should(s).be.undefined();
        })
        // chainできる
        .then((s) => {
          should(s).be.undefined();
        })
        // chainできるが、前段がpromiseを返してなければresolveは使えない
        // thenはchainできるだけで、前のthenがpromiseを返して来ているわけではない
        .then((resolve, reject) => {
          should(resolve).be.undefined();
          // resolve, rejectできるのはpromiseでラップされた関数のみ
          return new Promise((resolve, reject) => {
            resolve('わいわい');
          });
        })
        .then((s) => {
          s.should.equal('わいわい');
        })
    );
  });
  // 途中でcatchを入れてもthenのchainは終わらない
  it('途中でcatch', () => {
    let p = () => {
      return new Promise((rs, rj) => {
        rs(5);
      });
    };

    p()
      .then((num) => {
        return new Promise((resolve, reject) => {
          console.log(`num: ${num}`);
          if (num === 5) {
            reject('だめーーーーー');
          }
          resolve(num);
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      })
      .then((num) => {
        console.log(`とりあえずリジェクトを投げるところ`);
        return new Promise((resolve, reject) => {
          reject('とりあえずリジェクト');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('reject後のthenの処理は飛ぶ', () => {
    let p = () => {
      return new Promise((rs, rj) => {
        rs(5);
      });
    };
    p()
      .then((num) => {
        return new Promise((resolve, reject) => {
          console.log(`num: ${num}`);
          if (num === 5) {
            reject('だめーーーーー');
          }
          resolve(num);
        });
      })
      .then((num) => {
        should.fail(); // ここにはこない
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // it('途中でcatch', () => {
  //   let Q = require('q');
  //   Q.fcall(()=>{

  //   })
  // });
});
