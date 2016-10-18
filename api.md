
###mxObject API Reference

 - [mxObject()](#mxObject)
 - [mxObject.prototype.\__type__](#__type__)
 - [mxObject.prototype.mixin()](#mixin)
 - [mxObject.prototype.insertMixin()](#insertMixin)
 - [mxObject.prototype.hasMixinProperty()](#hasMixinProperty)
 - [mxObject.prototype.getMixinProperty()](#getMixinProperty)
 - [mxObject.prototype.isMixinOf()](#isMixinOf)
 - [mxObject.prototype.getPriorityOf()](#getPriorityOf)
 - [mxObject.prototype.getAll()](#getAll)
 - [mxObject.prototype.getEverything()](#getEverything)
 - [mxObject.prototype.getMixinsDeep()](#getMixinsDeep)
 - [mxObject.prototype.getMixinsBroad()](#getMixinsBroad)
 - [mxObject.prototype.extend()](#extend)
 - [mxObject.prototype.isExtensionOf()](#isExtensionOf) 

----

<details open>
<summary>
<a name="mxObject" href="#mxObject">#</a> **mxObject**( [*init*] ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L29 "Source")
</summary>

**Factory function for initializing mxObjects**

mxObject() returns an ES6 proxy, `mxObj`. The mxObject factory function establishes a closure for the `mxObj`'s handler's get() and set() methods. Each of the two closures (ie. the get() closure and the set() closure) have access to the mixins array and the extensions array and expose these arrays on the __mixins__ and __extensions__ properties of the returned `mxObj` proxy. The mxObject's proxy's get() method will, when checking for a property,first check the underlying target object for the given property key. If not found, the get() method will loop over the objects in the mixin array and return the first value found for the given property key.

#####**Parameters**
######**`init` (*optional*)** &nbsp;&nbsp; intial extension for a mxObject

#####**Return Value**
###### A mxObject

</details>
----
<br />

<details open>
<summary>
<a name="__type__" href="#__type__">#</a> *mxObj*.**\__type__**[<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L113 "Source")
</summary>

**Returns the string "mxObject" to denote mxObj is a mxObject.**

mxObject.

</details>
----
<br />


<details open>
<summary>
<a name="mixin" href="#mixin">#</a> *mxObj*.**mixin**( *arguments...* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L113 "Source")
</summary>

**Add mixins to a mxObject**

Push mixins to the mixin array, making mixin properties accessible on the mxObject. Note that mixins added later will have lower priority.

#####**Parameters**
######**`arguments...`** &nbsp;&nbsp; each argument is an object to mix into the mxObject 

#####**Return Value**
###### returns the modified mxObject with added mixins

</details>
----
<br />

<details open>
<summary>
<a name="insertMixin" href="#insertMixin">#</a> *mxObj*.**insertMixin**( *index*,*arguments...* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L124 "Source")
</summary>

**Insert mixin objects into the mixin array (ie to force a higher priority)**

insertMixin allows you to mix in objects with a specific priority (the index parameter). For example, when inserted at index 0, the mixin object will have the highest priority (priority 0).

#####**Parameters**
######**`index`** &nbsp;&nbsp; location in mixin array 
######**`arguments...`** &nbsp;&nbsp; each argument is an object to mix into the mxObject 

#####**Return Value**
###### the modified mxObject with added mixins

</details>
----
<br />

<details open>
<summary>
<a name="hasMixinProperty" href="#hasMixinProperty">#</a> *mxObj*.**hasMixinProperty**( *prop* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L145 "Source")
</summary>

**Check if any mixin has a given property**

#####**Parameters**
######**`prop`** &nbsp;&nbsp; property key to look for in mixin array

#####**Return Value**
###### returns true if any mixin has `prop`; otherwise false

</details>
----
<br />

<details open>
<summary>
<a name="getMixinProperty" href="#getMixinProperty">#</a> *mxObj*.**getMixinProperty**( *prop* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L159 "Source")
</summary>

**If any mixin has a given property, return the property value from the highest priority mixin.**

#####**Parameters**
######**`prop`** &nbsp;&nbsp; property key to look for in mixin array

#####**Return Value**
###### returns value of prop on first mixin found with given prop

</details>
----
<br />

<details open>
<summary>
<a name="isMixinOf" href="#isMixinOf">#</a> *mxObj*.**isMixinOf**( *obj* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L173 "Source")
</summary>

**Check if an object is on a mxObjects mixin array**

#####**Parameters**
######**`obj`** &nbsp;&nbsp; object to check the mixin array for

#####**Return Value**
###### returns true if obj has been mixed in; otherwise false

</details>
----
<br />

<details open>
<summary>
<a name="getPriorityOf" href="#getPriorityOf">#</a> *mxObj*.**getPriorityOf**( *obj* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L186 "Source")
</summary>

**Get the priority of a mixin (ie. its index in the mixin array)**

#####**Parameters**
######**`obj`** &nbsp;&nbsp; object to check the mixin array for

#####**Return Value**
###### returns priority/index of obj; `-1` if not mixed-in

</details>
----
<br />

<details open>
<summary>
<a name="getAll" href="#getAll">#</a> *mxObj*.**getAll**( *prop* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L201 "Source")
</summary>

**Given a property key, get an array of all values for the key from the mxObject and all its mixins.**

#####**Parameters**
######**`prop`** &nbsp;&nbsp; property key to look for in mxObject and mixin array

#####**Return Value**
###### returns an array of all values a mxObject has for `prop`

</details>
----
<br />

<details open>
<summary>
<a name="getEverything" href="#getEverything">#</a> *mxObj*.**getEverything**( ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L224 "Source")
</summary>

**Get an object that fully describes everything a mxObject has access to**

For each accessible property, return an array of values (primary value and all backup values)

#####**Parameters**
######** `` &nbsp;&nbsp; takes no parameters

#####**Return Value**
###### returns Object with all accessible keys paired with array of all accesible values

</details>
----
<br />

<details open>
<summary>
<a name="getMixinsDeep" href="#getMixinsDeep">#</a> *mxObj*.**getMixinsDeep**( ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L250 "Source")
</summary>

**Flatten mixin tree in depth-first style**

Recursively traverse all mixin arrays in mixin tree, pushing values to flattened mixin array

#####**Parameters**
######** `` &nbsp;&nbsp; takes no parameters

#####**Return Value**
###### returns a flattened version of an mxObject's mixin tree

</details>
----
<br />

<details open>
<summary>
<a name="getMixinsBroad" href="#getMixinsBroad">#</a> *mxObj*.**getMixinsBroad**( ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L275 "Source")
</summary>

**Flatten mixin tree in breadth-first style**

Recursively traverse all mixin arrays in mixin tree. During tree traversal, track the current depth and push mixins to the array for the current depth. This results in an array of arrays for each depth... 
  [ [depth0_mixinArray,...], [depth1_mixinArray,...], ... ]
...which gets flattened into the final breadth-first flattening.

#####**Parameters**
######** `` &nbsp;&nbsp; takes no parameters

#####**Return Value**
###### returns a flattened version of an mxObject's mixin tree

</details>
----
<br />

<details open>
<summary>
<a name="extend" href="#extend">#</a> *mxObj*.**extend**( *arguments...* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L301 "Source")
</summary>

**Add extensions to mxObject**

Copy properties from extension objects onto the mxObject and save references to extension objects on the extensions array.

#####**Parameters**
######**`arguments...` (*optional*)** &nbsp;&nbsp; extension objects from which to extend

#####**Return Value**
###### returns the modified mxObject with extended properties

</details>
----
<br />

<details open>
<summary>
<a name="isExtensionOf" href="#isExtensionOf">#</a> *mxObj*.**isExtensionOf**( *obj* ) [<>](https://github.com/Sladav/mxObject/blob/master/mxObject.js#L319 "Source")
</summary>

**Check if a mxObject was extended from an object**

#####**Parameters**
######**`obj` (*optional*)** &nbsp;&nbsp; object to check the extension array for

#####**Return Value**
###### returns true if mxObject has been extended from obj; otherwise false

</details>
----
<br />
