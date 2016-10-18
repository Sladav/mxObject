let mxObject = require('../mxObject');

const C = {
  label: 'C',
  sayC(){return `C: I'm from ${this.label}`}
}

const D = {
  label: 'D',
  sayD(){return `D: I'm from ${this.label}`}
}

const mxObj = mxObject().extend(C)

// mxObj now has its own 'label' property and its own 'sayC()' property
console.log(Object.getOwnPropertyNames(mxObj)) // returns ['label', 'sayC']

// when it accesses its own properties (or at least the ones extended from C),
// it behaves virtually identically to C
console.log(mxObj.label)    // 'C'
console.log(mxObj.sayC())   // 'C: I'm from C'

// and we can check to see if mxObj is an extension of C
//   (this is like the instanceof keyword)
console.log(mxObj.isExtensionOf(C))  // true

mxObj.extend(D)

// mxObj now has an additional property 'sayD()'
console.log(Object.getOwnPropertyNames(mxObj)) // returns ['label', 'sayC', 'sayD']

// and 'label' has been overwritten
console.log(mxObj.label)    // returns 'D'
console.log(mxObj.sayC())   // returns 'C: I'm from D'
console.log(mxObj.sayD())   // returns 'D: I'm from D'

// mxObject properties that have been extended do not "see" changes to the
// original object
D.label = 'DD'
console.log(mxObj.label)  // returns 'D'
