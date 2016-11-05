let expect = require('chai').expect;
let mxObject = require('../mxObject');

describe('mxObject Factory', function(){
  describe('input validation',function(){
    it('should return empty mxObject by default', function(){
      let mxObj = mxObject();
      expect(mxObj).to.be.an('object')
      expect(mxObj.__type__).to.equal('mxObject')
      expect(mxObj).to.be.empty
      expect(mxObj.__mixins__).to.be.an('array')
      expect(mxObj.__mixins__).to.be.empty
      expect(mxObj.__extensions__).to.be.an('array')
      expect(mxObj.__extensions__).to.have.length(0)
    })
  })
})
