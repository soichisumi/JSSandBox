const _ = require('underscore'); // ArrayやObjectのUtilライブラリ

module.exports.UnderscoreTutorial = UnderscoreTutorial;

function UnderscoreTutorial() {}

UnderscoreTutorial.prototype.doubleAll = arr => {
    const res = _.map(arr, val => {
        return val * 2;
    });
    return res;
};

UnderscoreTutorial.prototype.sumAll = arr => {
    const res = arr.reduce((accumulator, currentValue, index, passedArray) => {
        accumulator = accumulator + currentValue;
    });
    return res;
};