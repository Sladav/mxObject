let mxObject = require('../mxObject');

const A = {
  label: 'A',
  sayA(){return `A: I'm from ${this.label}`}
}

const B = {
  label: 'B',
  sayB(){return `B: I'm from ${this.label}`}
}

const mxObj = mxObject().mixin(A)

// mxObj still doesn't have any of its own properties
console.log(Object.getOwnPropertyNames(mxObj)) // returns []

// yet it can access properties on A as if it A were in its prototype chain
console.log(mxObj.label)    // 'A'
console.log(mxObj.sayA())   // 'A: I'm from A'

// and we can check to see if A is a mixin of mxObj(this is like
// Object.prototype.isPrototypeOf())
console.log(mxObj.isMixinOf(A))  // true

mxObj.mixin(B)

// mxObj still doesn't have any of its own properties
console.log(Object.getOwnPropertyNames(mxObj)) // returns []

// yet it can access properties from both B and A as if both A and B were
// prototypes. Since mxObj inherits 'label' from both A and B, those mixins
// collide on the 'label' property. Since A was mixed-in first, A.label
// takes priority over B.label.
console.log(mxObj.label)    // returns 'A'
console.log(mxObj.sayA())   // returns 'A: I'm from A'
console.log(mxObj.sayB())   // returns 'B: I'm from A'

// nevertheless, mxObject still "knows" that B.label exists
console.log(mxObj.getAll('label'))  // returns ['A', 'B']

// A change on a mixin is "seen" from all mxObjects that have mixed it in
A.label = 'AA'
console.log(mxObj.label)  // returns 'AA'

// A does NOT inherit from B
// B does NOT inherit from A

// ERROR: A.sayB is not a function [it's undefined]
try{ A.sayB() } catch(err){ console.log(err.message) }

// ERROR: B.sayA is not a function [it's undefined]
try{ B.sayA() } catch(err){ console.log(err.message) }
