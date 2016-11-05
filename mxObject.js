(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.mxObject = factory();
  }
}(this, function() {
  'use strict';

  /**
  * Factory function for initializing mxObjects
  *
  * A mxObject is an ES6 proxy. The mxObject factory function establishes a closure
  * for the mxObject handler's get() and set() methods. Each of the two closures
  * (ie. the get() closure and the set() closure) have access to the mixins array
  * and the extensions array and expose these arrays on the __mixins__ and
  * __extensions__ properties of the returned mxObject proxy.
  *
  * The mxObject's proxy's get() method will, when checking for a property,
  * first check the underlying target object for the given property key. If not
  * found, the get() method will loop over the objects in the mixin array and
  * return the first value found for the given property key.
  *
  * @function mxObject
  * @param {object} init initial extension to mxObject
  * @return {proxy} mxObj a "mxObject" - a proxy that manages access to the private arrays "mixins" and "extensions"
  */
  const mxObject = function(init = {}) {
    // establish closure for handler.get and handler.set that contains
    // arrays for mixins and extensions.
    let mixins = [];
    let extensions = [];

    // TODO: make checking own props 1st priority, protect mixins/extensions with setter
    const handler = {
      get(obj, prop) {
        switch (true) {                     // Search order when getting props
          case(prop === '__mixins__'):      // 1. check if getting mixins array
            return mixins;
          case(prop === '__extensions__'):  // 2. check if getting extensions array
            return extensions;
          case(obj.hasOwnProperty(prop)):   // 3. check if getting an own property
            return obj[prop];
          default:
            for (let mixin of mixins) {     // 4. loop through mixin array
              if (prop in mixin) {          //    and check for mixin props
                return mixin[prop]
              }
            }
            return mxObject.prototype[prop];  // 5. check if getting utility method/data-prop
        }                                     // 6. *implicit* check Object.prototype
      },
      set(obj, prop, value) {
        switch (true) {
          case(prop === '__mixins__'):
          mixins = value;
          break;
          default:
          obj[prop] = value
        }
        return true;
      }
    }
    let mxObj = new Proxy({}, handler)
    mxObj.extend(init)
    return mxObj
  };

  /**
  * test for non-null, non-functional object
  * @param {any} item some value to check
  * @return {boolean} unnamed true if object or array; otherwise false
  */
  function isObj(item) {
    return typeof item === 'object' && item !== null
  }

  /**
  * Helper function to test that all required arguments are non-null,
  * non-functional objects
  * @param {argArray} item some value to check
  * @throws {Error} NoArgs must provide at least 1 argument
  * @throws {TypeError} NotObject an argument is a primitive, function, null,
  *   or undefined
  */
  function checkMxArgs(argArray, mx) {
    let l = argArray.length;
    if (l === 0)
    throw new Error(`Provide at least one ${mx}`)
    argArray.forEach((mixin, ind) => {
      if (!isObj(mixin))
      throw new TypeError(`Argument${l > 1
        ? ' ' + ind
        : ''} has type ${ (mixin === null)
          ? 'null'
          : typeof mixin}.
          ${mx}s must be mxObjects, objects, or arrays`)
        })
      }

      mxObject.prototype = {
        // Set '__type__' property to identify mxObject
        __type__: 'mxObject',

        /**
        * Push mixins to the mixin array, making mixin properties accessible on
        * the mxObject.
        *
        * @function mixin
        * @this {mxObject} this
        * @param {object} args mixin objects to push
        * @return {proxy} this mxObject with added mixins
        */
        mixin(...args) {
          checkMxArgs(args, 'mixin')
          this.__mixins__.push(...args)
          return this
        },

        /**
        * Insert mixins into the mixin array, making mixin properties accessible on
        * the mxObject.
        *
        * @function insertMixin
        * @this {mxObject} this
        * @param {number} index location to insert mixins
        * @param {object} args mixin objects to insert
        * @return {proxy} this mxObject with inserted mixins
        */
        insertMixin(index, ...args) {
          checkMxArgs(args, 'mixin')
          this.__mixins__.splice(index, 0, ...args)
          return this
        },

        /**
        * Check if any mixin has a given property
        *
        * @function hasMixinProperty
        * @this {mxObject} this
        * @param {string} prop property key to look for in mixin array
        * @return {boolean} unnamed true if any mixin has prop; otherwise false
        */
        hasMixinProperty(prop) {
          return this.__mixins__.some(v => v.hasOwnProperty(prop));
        },

        /**
        * If any mixin has a given property, return the property value from the
        * highest priority mixin.
        *
        * @function getMixinProperty
        * @this {mxObject} this
        * @param {string} prop property key to look for in mixin array
        * @return {any} foundMixin[prop] value of prop on first mixin found with given prop
        */
        getMixinProperty(prop) {
          let foundMixin = this.__mixins__.find(v => v.hasOwnProperty(prop));
          return foundMixin[prop]
        },

        /**
        * Check if an object is on a mxObjects mixin array
        *
        * @function isMixinOf
        * @this {mxObject} this
        * @param {object} obj object to check the mixin array for
        * @return {boolean} unnamed true if obj has been mixed in; otherwise false
        */
        isMixinOf(obj) {
          return this.__mixins__.includes(obj);
        },

        /**
        * Get the priority of a mixin (ie. its index in the mixin array)
        *
        * @function getPriorityOf
        * @this {mxObject} this
        * @param {object} obj object to check the mixin array for
        * @return {number} unnamed priority/index of obj; -1 if not mixed-in
        */
        getPriorityOf(obj) {
          return this.__mixins__.indexOf(obj);
        },

        // TODO: Give getAll() a better name
        /**
        * Given a property key, get an array of all values for the key from the
        * mxObject and all its mixins.
        *
        * @function getAll
        * @this {mxObject} this
        * @param {string} prop property key to look for in mxObject and mixin array
        * @return {array} listOfValues an array of all values a mxObject has for prop
        */
        getAll(prop) {
          let initListOfValues = [];
          if (this.hasOwnProperty(prop))
          initListOfValues.push(this[prop])
          return this.__mixins__.reduce((listOfValues, currentMixin) => {
            if (currentMixin.hasOwnProperty(prop))
            listOfValues.push(currentMixin[prop])
            return listOfValues;
          }, initListOfValues)
        },

        // TODO: Give getEverything() a better name
        // IDEA: Return sparse arrays for each property such that the index matches the priority of the mixin object it came from
        /**
        * Get an object that fully describes everything a mxObject has access to.
        * For each accessible property, return an array of values (primary value
        * and all backup values)
        *
        * @function getEverything
        * @this {mxObject} this
        * @return {object} everythingObject Object with all accessible keys paired with array of all accesible values
        */
        getEverything() {
          return [
            this, ...this.__mixins__
          ].map(Object.getOwnPropertyNames).reduce((allProps, currentProps) => {
            return allProps.concat(currentProps);
          }, []).filter((v, i, a) => a.indexOf(v) === i). // filter unique
          reduce((everythingObject, currentProp) => {
            everythingObject[currentProp] = this.getAll(currentProp);
            return everythingObject;
          }, {})
        },

        // TODO: Add check to eliminate cycles (endless loops) when flattening mixin tree
        /**
        * Flatten mixin tree in depth-first style
        *
        * Recursively traverse all mixin arrays in mixin tree, pushing values to
        * flattened mixin array
        *
        * @function getMixinsDeep
        * @this {mxObject} this
        * @private {array} _flattenedTree
        * @return {array} _flattenedTree
        */
        getMixinsDeep(_flattenedTree = []) {
          this.__mixins__.map(v => {
            _flattenedTree.push(v)
            if (v.__type__ === 'mxObject')
            v.getMixinsDeep(_flattenedTree)
          })
          return _flattenedTree;
        },

        // TODO: Add check to eliminate cycles (endless loops) when flattening mixin tree
        /**
        * Flatten mixin tree in breadth-first style
        *
        * Recursively traverse all mixin arrays in mixin tree. During tree traversal,
        * track the current depth and push mixins to the array for the current depth.
        * This results in an array of arrays for each depth...
        *     [ [depth0_mixinArray,...], [depth1_mixinArray,...], ... ]
        * ...which gets flattened into the final breadth-first flattening.
        *
        * @function getMixinsDeep
        * @this {mxObject} this
        * @private {array} _flattenedTree
        * @private {number} _depth
        * @return {array} _flattenedTree
        */
        getMixinsBroad(_flattenedTree = [], _depth = 0) {
          function helper() {
            if (typeof _flattenedTree[_depth] === 'undefined')
            _flattenedTree[_depth] = [];
            this.__mixins__.map(v => {
              _flattenedTree[_depth].push(v)
              if (v.__type__ === 'mxObject')
              v.getMixinsBroad(_flattenedTree, _depth + 1)
            })
            return _flattenedTree;
          }

          return helper.call(this).reduce((allProps, currentProps) => {
            return allProps.concat(currentProps);
          }, [])
        },

        /**
        * Copy properties from extension objects onto the mxObject and save references
        * to extension objects on the extensions array.
        *
        * @function extend
        * @this {mxObject} this
        * @param {object} args extension objects from which to extend
        * @return {proxy} this mxObject with extended properties
        */
        extend(...args) {
          checkMxArgs(args, 'extension')
          this.__extensions__.unshift(...args)
          this.__extensions__.filter((v, i, a) => a.indexOf(v) === i) // filter unique
          Object.assign(this, ...args.reverse())
          return this
        },

        /**
        * Copy properties from extension objects onto the mxObject and save references
        * to extension objects on the extensions array.
        *
        * @function isMixinOf
        * @this {mxObject} this
        * @param {object} obj object to check the extension array for
        * @return {boolean} unnamed true if obj has been extended; otherwise false
        */
        isExtensionOf(obj) {
          return this.__extensions__.includes(obj);
        },


        /**
        * Create a copy of a mixin with the same properties and the same mixins
        *
        * @function clone
        * @this {mxObject} this
        * @return {mxObject} mx copy of mxobject with same props & mixins
        */
        clone = function(){
          const mx = mxObject().extend(this)
          if(this.__mixins__.length) mx.mixin(...this.__mixins__)
          return mx
        }
      }

      return mxObject

    }));
