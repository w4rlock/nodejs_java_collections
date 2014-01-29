var Collection = require('./Collection');
var SortedSet = require('./SortedSet');
var OperationNotSupported = require('./OperationNotSupported');
var NoSuchElementException = require('./NoSuchElementException');

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 *
 * @implements {SortedSet}
 * @constructor
 */
function TreeSet() {
  this.array = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
TreeSet.prototype = new SortedSet;

/**
 * @type {Array}
 * @private
 */
TreeSet.prototype.array = null;

/**
 * @override
 */
TreeSet.prototype.contains = function(o) {
  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e['compareTo'](o) === 0) {
      return true;
    }
  }
  return false;
};

/**
 * @override
 */
TreeSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  for ( var i = 0, len = this.array.length; i < len; i++) {
    var e = this.array[i];
    if (e['compareTo'](o) === 1) {
      this.array.splice(i, 0, o);
      return true;
    }
  }

  this.array.push(o);

  return true;
};

/**
 * @override
 */
TreeSet.prototype.addAll = function(c) {
  for ( var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};

/**
 * @override
 * @returns {boolean}
 */
TreeSet.prototype.remove = function(o) {
  throw new OperationNotSupported();
};

/**
 * @override
 */
TreeSet.prototype.size = function() {
  return this.array.length;
};

/**
 * @override
 */
TreeSet.prototype.isEmpty = function() {
  return this.array.length === 0;
};

/**
 * @override
 */
TreeSet.prototype.toArray = function() {
  var array = [];

  for ( var i = 0, len = this.array.length; i < len; i++) {
    array.push(this.array[i]);
  }

  return array;
};

/**
 * @override
 */
TreeSet.prototype.iterator = function() {
  return new TreeSet.Iterator(this);
};

/**
 * @implements {Iterator}
 * @param {TreeSet}
 *          treeSet
 * @constructor
 * @private
 */
TreeSet.Iterator = function(treeSet) {
  this.treeSet = treeSet;
};

/**
 * @type {TreeSet}
 * @private
 */
TreeSet.Iterator.prototype.treeSet = null;

/**
 * @type {number}
 * @private
 */
TreeSet.Iterator.prototype.position = 0;

/**
 * @override
 */
TreeSet.Iterator.prototype.next = function() {
  if (this.position === this.treeSet.size()) {
    throw new NoSuchElementException();
  }
  return this.treeSet.array[this.position++];
};

/**
 * @override
 */
TreeSet.Iterator.prototype.hasNext = function() {
  if (this.position < this.treeSet.size()) {
    return true;
  }
  return false;
};

/**
 * @override
 */
TreeSet.Iterator.prototype.remove = function() {
  throw new OperationNotSupported();
};

module.exports = TreeSet;
