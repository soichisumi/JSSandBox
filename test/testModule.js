const td = require('testdouble')
const should = require('should');
const t = require('../testModule');
const subt = require('../subTestModule')

describe('exportされてない関数も書き換えられるのか', function () {
    it('かきかえ', function () {
        t.Func(2).should.equal(4)
        const nijo = td.replace(subt, 'nijo');
        td.when(nijo()).thenReturn(111);
        t.Func(2).should.equal(111);
    });
    afterEach: () => { td.reset(); }
});
