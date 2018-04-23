const Q = require('q');

module.exports = PromiseByQ;

function PromiseByQ() {}

PromiseByQ.prototype.ret5 = ret5;

let ret5 = () => {
  let deferred = Q.defer();
  deferred.resolve(5);
  return deferred.promise;
};

PromiseByQ.prototype.showValueLater = showValueLater;

let showValueLater = (value) => {
  let deferred = Q.defer();
  setTimeout(() => {
    console.log(value);
    deferred.resolve();
  }, timeout);
  return deferred.promise;
};

PromiseByQ.prototype.combined = () => {
  ret5().then(showValueLater);
};
