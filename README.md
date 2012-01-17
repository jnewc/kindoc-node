Under construction
==================

**kindoc** is a documentation tool for the enyo framework. It's in alpha, so is useable but potentially buggy. Currently there's support for kinds, published properties, functions, codeblocks and a couple of other things. I'll compile a full guide for use in the near future. Until then check out the sample folder to see how comments should be structured for use with kindoc.

Background
----------

The impulse behind this project was my desire to write documentation without having to state redundant information. As it stands, kindoc only requires you to state the kind name in the root comment for each kind. Function names and arguments, and published properties are obtained automatically, so you can spend more time writing what they do and less time repeating their definitions. 


Requirements
------------

Currently kindoc relies on node.js for execution.

Usage
-----

Syntax from command line: `node kindoc.js relative/folder/path/to/js-files > docs.html`

Examples
--------

See sample/sample.js for example comment syntax.