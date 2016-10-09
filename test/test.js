'use strict';
let expect = require('chai').expect;
let mxObject = require('../mxObject');

const wrap = function(fn, ...args){
  return fn.bind(undefined, ...args);
}

describe('input validation', function(){
  describe('- no inputs -',function(){
    it('should return empty mxObject by default', function(){
      expect(mxObject()).to.be.an('object')
      expect(mxObject().__type__).to.equal('mxObject')
      expect(mxObject()).to.be.empty
      expect(mxObject().__mixins__).to.be.an('array')
      expect(mxObject().__mixins__).to.be.empty
      expect(mxObject().__extensions__).to.be.an('array')
      expect(mxObject().__extensions__).to.have.length(1)
      expect(mxObject().__extensions__[0]).to.be.an('object')
      expect(mxObject().__extensions__[0]).to.be.empty
    })
  })
})
