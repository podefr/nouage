Disclaimer: this is a WIP

Data-binding-object-observe
-----------------

Now that Object.observe starts being available in various JS runtimes, data-binding libraries can be standalone. For years, we have used Backbone-like models that publish events when changes happen, or Angular-like digest loops with dirty-checking.
All of this is now an unnecessary abstraction as Object.observe will keep track of data changes. Data-binding-object-observe is a library that leverages Object.observe to provide a way to achieve two-way data-binding.

Installation
---------

npm install data-binding-object-observe

Usage
-----

var dataBinding = require('data-binding-object-observe');

License
-----

MIT