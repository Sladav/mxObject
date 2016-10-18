### A Basic Example | *Mixins*

###### *NOTE: even though this example purely uses mixins, a single mxObject can both mix and extend. For example, `mxObject().mixin(A).extend(C).mixin(B).extend(D)` mixes in both A and B, and it extends from both C and D*

Let's start with two objects, **A** and **B**. We'll put a data-property and method on each.

    const A = {
      label: 'A',
      sayA(){return `A: I'm from ${this.label}`}
    }

    const B = {
      label: 'B',
      sayB(){return `B: I'm from ${this.label}`}
    }

    ...

Then let's initialize the mxObject by calling the mxObject factory function and immediately mix-in **A**

	...

	const mxObj = mxObject().mixin(A)

	// mxObj still doesn't have any of its own properties
	console.log(Object.getOwnPropertyNames(mxObj)) // returns []

	// yet it can access properties on A as if it A were in its prototype chain
	console.log(mxObj.label)    // 'A'
	console.log(mxObj.sayA())   // 'A: I'm from A'

	// and we can check to see if A is a mixin of mxObj(this is like
	// Object.prototype.isPrototypeOf())
	console.log(mxObj.isMixinOf(A))  // true

	...

If we want to later include behavior from **B**, we can simply mix-in **B**'s behavior as well

	...

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

	...

Like prototypes, mixins are a form of "live" inheritance

	...

	// A change on a mixin is "seen" from all mxObjects that have mixed it in
	A.label = 'AA'
	console.log(mxObj.label)  // returns 'AA'

	...

And don't forget, not all Bears are Wizards and not all Wizards are Bears!

	...

	// A does NOT inherit from B
	// B does NOT inherit from A

	// ERROR: A.sayB is not a function [it's undefined]
	try{ A.sayB() } catch(err){ console.log(err.message) }

	// ERROR: B.sayA is not a function [it's undefined]
	try{ B.sayA() } catch(err){ console.log(err.message) }

	...

### A Basic Example | *Extensions*

###### *NOTE: even though this example purely uses extensions, a single mxObject can both mix and extend. For example, `mxObject().mixin(A).extend(C).mixin(B).extend(D)` mixes in both A and B, and it extends from both C and D*

  Let's start with two objects, **C** and **D**. We'll put a data-property and method on each.

      const C = {
        label: 'C',
        sayC(){return `C: I'm from ${this.label}`}
      }

      const D = {
        label: 'D',
        sayD(){return `D: I'm from ${this.label}`}
      }

      ...

  Then let's initialize the mxObject by calling the mxObject factory function and immediately extend from **C**

  	...

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

  	...

  If we want to later include behavior from **D**, we can simply extend from **D**'s behavior as well

  	...

  	mxObj.extend(D)

  	// mxObj now has an additional property 'sayD()'
  	console.log(Object.getOwnPropertyNames(mxObj)) // returns ['label', 'sayC', 'sayD']

  	// and 'label' has been overwritten
  	console.log(mxObj.label)    // returns 'D'
  	console.log(mxObj.sayC())   // returns 'C: I'm from D'
  	console.log(mxObj.sayD())   // returns 'D: I'm from D'

  	...

  Like non-static properties of class instances, extended properties are NOT "live".

  	// mxObject properties that have been extended do not "see" changes to the
  	// original object
  	D.label = 'DD'
  	console.log(mxObj.label)  // returns 'D'
