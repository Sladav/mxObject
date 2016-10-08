// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {'use strict';

  let mxObject = function(init = {}, mixins = [], extensions = []){
    if(!Array.isArray(mixins)) mixins = [mixins];
    if(!Array.isArray(extensions)) extensions = [extensions];

    let handler = {
    	get(obj,prop){
      	switch(true){
          case(prop === '__mixins__'):
          	return mixins;
          case(prop === '__extensions__'):
          	return extensions;
          case(obj.hasOwnProperty(prop)):
          	return obj[prop];
          default:
          	for(let mixin of mixins){
              if(prop in mixin){
                return mixin[prop]
              }
            }
            return mxObject.prototype[prop];
      	}
      },
      set(obj,prop,value){
      	switch(true){
          case(prop === '__mixins__'):
          	mixins = value;
            break;
        	default:
  					obj[prop] = value
        }
        return true;
      },
    }
    let mxObj = new Proxy({}, handler)
    mxObj.extend(init, ...extensions)
  	return mxObj
  };

  mxObject.prototype = {
    __type__: 'mxObject',
    hasMixinProperty(prop){
      return this.__mixins__.some( v => v.hasOwnProperty(prop) );
    },
    getMixinProperty(prop){
      let index = this.__mixins__.find( v => v.hasOwnProperty(prop) );
      return index[prop]
    },
    isMixinOf(proto){
      return this.__mixins__.includes( proto );
    },
    getPriorityOf(proto){
      return this.__mixins__.indexOf( proto );
    },
    getAll(prop){
      let initListOfValues = [];
      if(this.hasOwnProperty(prop)) initListOfValues.push(this[prop])
      return this.__mixins__.reduce(
        (listOfValues, currentMixin)=>{
          if(currentMixin.hasOwnProperty(prop)) listOfValues.push(currentMixin[prop])
          return listOfValues;
        }, initListOfValues
      )
    },
    getEverything(){
      return [this, ...this.__mixins__]
        .map(Object.getOwnPropertyNames)
        .reduce((allProps, currentProps)=>{
          return allProps.concat(currentProps);
        },[])
        .filter((v, i, a) => a.indexOf(v) === i)
        .reduce((everythingObject, currentProp)=>{
          everythingObject[currentProp] = this.getAll(currentProp);
          return everythingObject;
        },{})
    },
    getMixinsDeep(_mixArr = []){
      this.__mixins__.map( v => {
        _mixArr.push(v)
        if(v.__type__ === 'mxObject') v.getMixinsDeep(_mixArr)
          })
      return _mixArr;
    },
    getMixinsBroad(_mixArr = [], _depth = 0){
      function helper(){
        if(typeof _mixArr[_depth] === 'undefined') _mixArr[_depth] = [];
        this.__mixins__.map( v => {
          _mixArr[_depth].push(v)
          if(v.__type__ === 'mxObject') v.getMixinsBroad(_mixArr,_depth+1)
        })
        return _mixArr;
      }

      return helper.call(this)
        .reduce((allProps, currentProps)=>{
          return allProps.concat(currentProps);
        },[])
    },
    mixin(...args){
      this.__mixins__.push(...args)
      return this
    },
    insertMixin(index, ...args){
      this.__mixins__.splice(index, 0, ...args)
      return this
    },
    extend(...args){
      this.__extensions__.push(...args)
      this.__extensions__.filter((v, i, a) => a.slice(i+1).indexOf(v) === -1 )
      Object.assign(this, ...args.reverse())
      return this
    },
    isExtensionOf(extension){
      return this.__extensions__.includes( extension );
    }
  }

  return mxObject

}));
