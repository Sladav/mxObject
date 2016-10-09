**mxObject**
========

**Mixable and eXtensible objects in JavaScript**

----------


**Overview of JS Inheritance**
-------

Inheritance in JavaScript is achieved via the **prototype chain**. Each object may have a prototype from which it inherits some additional behavior (in the form of additional properties). An object's prototype is just another object which, in turn, has its own prototype. Even though **an object can only have *one* prototype**, because of this chaining effect, objects not only inherit behavior from their own prototype, but every prototype in the prototype chain until eventually you hit an object with no prototype (usually, Object.prototype). 

JavaScript prototypal inheritance is...

 - **Single Inheritance** 
 - **Multi-level Inheritance**
 - **Live Inheritance**

The 1st bullet makes composition impossible and can force a programmer into logical inconsistencies to achieve a desired behavior. These restrictions do not exist in systems that allow multiple inheritance. 

As an example, consider Beary Potter who is both a Bear and a Wizard. With single inheritance, if you want Beary Potter to inherit from both Bear AND Wizard, either Bear must inherit from Wizard or Wizard must inherit from Bear. Obviously, this is ridiculus. Multiple inheritance allows you to compose Bear and Wizard in order to create Beary Potter who is both.

<p align="center"><img src="./img/MultipleVsSingleInheritance.png" width="60%" /><br /><em>Not all bears are wizards. Not all wizards are bears. Beary Potter is both.</em></p>

The 3rd bullet item, "Live Inheritance", is simultaneously awesome and awful. Any changes to a prototype property is "automagically" changed in all objects which contain that prototype in its prototype chain. This is awesome because you can have a whole bunch of objects share the same behavior. Changing the prototype behavior changes the behavior of all of the other objects. Yet, this is awful in that prototypes provide no way to simply stamp out instances of the prototype. To stamp out instances, you have to use the **new keyword** and a **Constructor** function (which then lets you keep some live properties by matching the constructor's prototype property with an instance's internal prototype).  Personally, I don't like the *feel* of new keyword and constructors (and by extension, ES6 classes). To me it seems like a square peg forced into the round hole that is the rest of JS for the purpose of trying to replicate the instancing functionality that exists in OOP classes.

**What does mxObject do differently?**
--------------------------------------

A mxObject *(pronounced mix object)* has two ways to inherit functionality (ie. properties) from another mxObject, object, or array: mixins and extensions. A mxObject can inherit from multiple mixins, multiple extensions, or any combination of mixins and extensions. 

**Mixins**

A mxObject maintains a list of mixed-in, "mixin" objects in an internal array [ .\__mixins__ ]. Accessing properties from mixed-in objects is virtually identical to accessing properties from objects in the prototype chain. The mxObject looks for a property on itself. If it doesn't find it, it checks each element in its mixin array. If the property is found on a mixin, it is returned. This process does NOT rely on JavaScript prototypes, so successive elements in the mixin array do NOT inherit from one another. 

 - Mixins provide **single-level, multiple inheritance**
 - Mixin inheritance is "live" in the same way that prototypical inheritance is "live"

**Extensions** 

Extending a mxObject with another mxObject, object, or array simply **copies all properties** of the extension onto the mxObject. In fact, the mxObject.extend( ) is virtually identical to Object.assign( ) (and uses Object.assign( ) in it's implementation). The primary difference between Object.assign( ) and mxObject.extend( ) is that mxObjects maintain an internal array of extensions [ .\__extensions__ ].  This allows you to check if a mxObject has been extended from another object with mxObject.isExtensionOf( ) -- this is not possible using plain Object.assign( ). 

 - Extensions provide **instance-like, stamping/copying of properties**
 - mxObjects maintain a history of extensions
 - Extensions can be overwritten
 - Extensions can be re-extended
 
 > ######***QUICK NOTE &nbsp; &nbsp; |*** &nbsp; &nbsp; **The term "property" is overloaded.** 
> ###### Officially, per ES6, a property is a key-value pair on an object. That value can be function! Often key-value pairs of an object are referred to as either "properties" or "methods" which may lead to confusion. 
> ###### In this documentation, I use these definitions which are in keeping with ES6 definitions: 
 > ###### - **Property:** A key-value pair on an object (either functional, or non-functional)  [[ES6 "Property" definition](http://www.ecma-international.org/ecma-262/6.0/#sec-property)]
 > ###### - **Data-Property**: A key-value pair whose value IS NOT a function [Has no corresponding ES6 defintion]
 > ###### - **Method**: A key-value pair whose value IS a function [[ES6 "Method" definition](http://www.ecma-international.org/ecma-262/6.0/#sec-method)]


### A Basic Example | *Mixins*

###### *NOTE: even though this example purely uses mixins, a single mxObject can both mix and extend. For example, mxObject().mixin(A).extend(D).mixin(B).extend(C) mixes in both A and B, and it extends from both D and C*

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

	// and we can check to see if A is a mixin of mxObj 
	//   (this is like Object.prototype.isPrototypeOf())
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
	
	// nevertheless, mxObject is "knows" that B.label exists
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
	
	// ERROR: A.sayB is not a function
	try{ A.sayB() } catch(err){ console.log(err.message) }

	// ERROR: B.sayA is not a function
	try{ B.sayA() } catch(err){ console.log(err.message) } 
	
	...

### A Basic Example | *Extensions*

###### *NOTE: even though this example purely uses extensions, a single mxObject can both mix and extend. For example, mxObject().mixin(A).extend(D).mixin(B).extend(C) mixes in both A and B, and it extends from both D and C*

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
