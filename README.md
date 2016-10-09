**mxObject**
========

**Mixable and eXtensible objects in JavaScript**

----------


**Introduction**
-------

Inheritance in JavaScript is achieved via the **prototype chain**. Each object may have a prototype from which it inherits some additional behavior (in the form of additional properties). An object's prototype is just another object which, in turn, has its own prototype. Even though **an object can only have *one* prototype**, because of this chaining effect, objects not only inherit behavior from their own prototype, but every prototype in the prototype chain until eventually you hit an object with no prototype (usually, Object.prototype). 

JavaScript prototypal inheritance is...

 - **Single Inheritance** 
 - **Multi-level Inheritance**
 - **Live Inheritance**

The 1st bullet makes composition impossible and can force a programmer into logical inconsistencies to achieve a desired behavior. These restrictions do not exist in systems that allow multiple inheritance. As an example, consider Beary Potter who is both a Bear and a Wizard.

The 3rd bullet, "Live Inheritance" is simultaneously awesome and awful. Any changes to a prototype property is "automatically" changed in all objects which contain that prototype in its prototype chain. This is awesome because you can have a whole bunch of objects share the same behavior. Changing the prototype behavior changes the behavior of all of the other objects. Yet, this is awful in that prototypes provide no way to simply stamp out instances of the prototype. To stamp out instances, you have to use the **new keyword** and a **Constructor** function (which then lets you keep some live properties by matching the constructor's prototype property with an instances internal prototype).  Personally, I don't like the *feel* of new keyword and constructors (and by extension ES6 classes). To me it seems like a square peg forced into the round hole that is the rest of JS for the purpose of trying to replicate the instancing functionality that exists in OOP classes.


    enter code here
