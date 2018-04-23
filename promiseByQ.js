const Q = require('q');

module.exports = PromiseByQ;

function PromiseByQ() {}

let ret5 = () => {
  let deferred = Q.defer();
  deferred.resolve(5);
  return deferred.promise;
};

PromiseByQ.prototype.ret5 = ret5;

let showValueLater = (value) => {
  let deferred = Q.defer();
  setTimeout(() => {
    console.log(value);
    deferred.resolve(value);
  }, 1000);
  return deferred.promise;
};

PromiseByQ.prototype.showValueLater = showValueLater;

PromiseByQ.prototype.combined = () => {
  ret5().then(showValueLater);
};
