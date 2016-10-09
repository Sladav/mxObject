let expect = require('chai').expect;
let mxObject = require('../mxObject');

describe('extend method',function(){
  describe('input validation', function(){
    it('should accept 1 or more objects/arrays', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},[],{},{})).to.not.throw(Error)
    })
    it('should not accept any numbers', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},0,{})).to.throw(Error)
    })
    it('should not accept any strings', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},'string',{})).to.throw(Error)
    })
    it('should not accept any boolean values', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},true,{})).to.throw(Error)
    })
    it('should not accept any null values', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},null,{})).to.throw(Error)
    })
    it('should not accept any undefined values', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},undefined,{})).to.throw(Error)
    })
    it('should not accept any functions', function(){
      let mxObj = mxObject();
      expect(mxObj.extend.bind(mxObj,{},function(){},{})).to.throw(Error)
    })
  })
})
