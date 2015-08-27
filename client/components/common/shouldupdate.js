import {filter, isEqual, keys, every, isFunction} from "lodash";
import Immutable from "immutable";

function not (fn) {
  return function () {
    return !fn.apply(fn, arguments);
  };
}

function isStatics (_, key) {
  return key === "statics";
}

function isChildren (_, key) {
  return key === "children";
}

function or (fn1, fn2) {
  return function () {
    return fn1.apply(null, arguments) || fn2.apply(null, arguments);
  };
}

var isNotIgnorable = not(or(isStatics, isChildren));

function compare (current, next, typeCheck, equalCheck) {
  var isCurrent = typeCheck(current);
  var isNext = typeCheck(next);

  if (isCurrent && isNext) {
    return equalCheck(current, next);
  }
  if (isCurrent || isNext) {
    return false;
  }
}

function isImmutable(maybeImmutable) {
  return !!(maybeImmutable && isFunction(maybeImmutable.toJS));
}

function isEqualImmutable (a, b) {
  return Immutable.is(a, b);
}

function isCursor (maybeCursor) {
  return !!(maybeCursor && isFunction(maybeCursor.deref));
}

function unCursor(cursor) {
  if (!cursor || !cursor.deref) { return cursor; }
  return cursor.deref();
}

function isEqualCursor (a, b) {
  return unCursor(a) === unCursor(b);
}

function isEqualState (value, other) {
  return isEqual(value, other, function (current, next) {
    if (current === next) { return true; }
    return compare(current, next, isImmutable, isEqualImmutable);
  });
}

function isEqualImmutableDS(value, other) {
  var cursorsEqual = compare(value, other, isCursor, isEqualCursor);
  if (cursorsEqual !== undefined) { return cursorsEqual; }

  return compare(value, other, isImmutable, isEqualImmutable);
}

function isEqualValue(value, other) {
  if (value === other) { return true; }

  var isImmutableDS = isEqualImmutableDS(value, other);
  if (isImmutableDS !== undefined) { return isImmutableDS; }

  return isEqual(value, other, function (current, next) {
    if (current === next) { return true; }

    if(isFunction(current) && isFunction(next)) {
      return current.toString() === next.toString();
    }

    return isEqualImmutableDS(current, next);
  });
}

function isEqualProps(currentProps, nextProps) {
  var haveSameKeys = isEqual(
    keys(currentProps).sort(),
    keys(nextProps).sort()
  );

  if(!haveSameKeys) { return false; }

  return every(keys(currentProps), (k) => isEqualValue(currentProps[k], nextProps[k]));
}

export default function shouldComponentUpdate(nextProps, nextState) {

  if (nextProps === this.props && nextState === this.state) {
    return false;
  }

  if (!isEqualState(this.state, nextState)) {
    return true;
  }

  nextProps    = filter(nextProps, isNotIgnorable);
  var currentProps = filter(this.props, isNotIgnorable);

  if (!isEqualProps(currentProps, nextProps)) {
    return true;
  }

  return false;
}
