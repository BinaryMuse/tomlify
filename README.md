tomlify
=======

[TOML](https://github.com/BinaryMuse/toml-node) all up in your [Browserify](http://browserify.org/).

Installation
------------

```
npm install [--save] browserify tomlify
```

Usage
-----

```javascript
// inside client.js
var myConfig = require('./config.toml');
```

```
browserify -t tomlify client.js
```

License
-------

tomlify is licensed under the MIT license. See the LICENSE file for more information.
