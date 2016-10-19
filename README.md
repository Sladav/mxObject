
#**mxObject**

*Mixable and eXtensible objects in JavaScript*


###**Try mxObject**

> **NPM** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `npm install mxobject`
>
> **UNPKG** &nbsp;&nbsp; https://unpkg.com/mxobject@0.1.1

## **mxObject** is  *Multiple Prototypal Inheritance*

mxObject was created in an attempt to answer the question:

> **"What if JavaScript allowed objects to have multiple prototypes?"**

What if, instead of referencing a single prototype object, an object referenced an array of other objects and inherited functionality from all of them? With the ability to inherit from multiple prototypes, JavaScript would (obviously?) support multiple inheritance and all the benefits that come along with that.

The main idea behind mxObject is for every object to maintain a list of "mixins" (prototypes). In the same way objects search their prototype chain for an unfound property, a mxObject searches this list of prototypes for unfound properties.

Beyond replacing traditional prototypes with "mixins", mxObject also wraps `Object.assign()` with "extensions". The only difference here being that objects extended with `mxObject.extend()` keep track of what objects they were extended from to allow `instanceof` style checking with `isExtensionOf()`.

### Basic Example

Lets make a rectangular button composed from a rectangle and button...

```javascript
const Rectangle = {
	height: 5,     // default height
	width: 10,     // default width
	area(){ return this.height * this.width },
	perimeter(){ return 2*(this.height + this.width) }
}

const Button = {
  label: 'default label', // default label
  press(){ return `you pressed ${this.label}`}
}

const myButton = mxObject().mixin(Rectangle, Button)

// myButton doesn't have any of its own properties
console.log(Object.getOwnPropertyNames(myButton)) // returns []

// yet can still access its mixins' properties
console.log(myButton.area()) // returns 50
console.log(myButton.press()) // returns "you pressed default label"

// like prototypes, inheritance is "live"
Button.label = "my button"
console.log(myButton.press()) // returns "you pressed my button"

// and like prototypes, you can still add own properties...
myButton.width = 20;
console.log(Object.getOwnPropertyNames(myButton)) // returns ['width']
console.log(myButton.width) // returns 20
console.log(myButton.area())  // returns 100

// ... without modifying the prototype
console.log(Rectangle.width) // returns 10
```

If you wanted to achieve the same effect with JS prototypes you would have to either (1) make Button a prototype of Rectangle or (2) make Rectangle a prototype of Button. Neither of those make sense! mxObject allows you to inherit from both without making any connection between Rectangles and Buttons.


###Also read...

 - [API Reference](./api.md)
 - [Detailed Overview](./Detailed-Overview.md)
 - [Examples](./examples/Examples.md)


