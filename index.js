var toml = require('toml');
var through = require('through');

function isToml(file) {
  return /\.toml$/.test(file);
}

function stringify(data) {
  if (data instanceof Date) {
    return "new Date(\"" + data.toString() + "\")";
  } else if (data instanceof Array) {
    return "[" + data.map(stringify).join(',') + "]";
  } else if (typeof(data) === "string") {
    return JSON.stringify(data);
  } else if (typeof(data) === "number") {
    return JSON.stringify(data);
  } else if (typeof(data) === "boolean") {
    return JSON.stringify(data);
  } else {
    var s = "{";
    for (key in data) {
      s += JSON.stringify(key) + ":"
      var value = stringify(data[key]);
      s += value + ",";
    }
    return s.substr(0, s.length - 1) + "}";
  }
}

module.exports = function(file) {
  if (!isToml(file)) return through();

  var data = '';
  return through(write, end);

  function write (buf) { data += buf; }
  function end () {
    try {
        data = toml.parse(data);
    } catch (e) {
      if (e.line && e.column) {
        var tomlCompileError = new Error("Error compiling " + file + " at line " + e.line +
          ", column " + e.column + ": " + e.message);
        this.emit('error', tomlCompileError);
      } else {
        this.emit('error', e);
      }
    }

    data = stringify(data);
    this.queue("module.exports = " + data);
    this.queue(null);
  }
};
