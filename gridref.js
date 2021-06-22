/**
 * Converts standard grid reference ('SU387148') to fully numeric ref ([438700, 114800])
 *   returned coordinates are the lower, left corner of the grid square in metres
 *
 * @param {String} gridref Standard format OS grid reference (e.g. SU387148)
 * @returns {Array<Number>} Numeric version of grid reference in metres
 */
function parse(gridref) {
  // Must be a string
  if (typeof gridref !== 'string') {
    throw new InvalidGridRef('Grid reference must be a string');
  }

  // Strip out any whitespace
  gridref = gridref.replace(/ /g, '').toUpperCase();

  // Must be at least 2 characters long
  if (gridref.length < 2) {
    throw new InvalidGridRef(
      'Grid reference must be at least 2 characters long'
    );
  }

  // Must contain an even number of characters
  if (gridref.length % 2) {
    throw new InvalidGridRef(
      'Grid reference must contain an even number of characters'
    );
  }

  // First two characters must be A-H J-Z
  if (!/^[A-HJ-Z]{2}/.test(gridref)) {
    throw new InvalidGridRef('First two characters must be A-H or J-Z');
  }

  // Any remaining characters must be numeric
  if (gridref.length > 2) {
    if (!/^\d+$/.test(gridref.substr(2))) {
      throw new InvalidGridRef('All characters after the grid letters must be numeric');
    }
  }

  // Get numeric values of letter references, mapping A->0, B->1, C->2, etc:
  var l1 = gridref.charCodeAt(0) - 'A'.charCodeAt(0);
  var l2 = gridref.charCodeAt(1) - 'A'.charCodeAt(0);

  // shuffle down letters after 'I' since 'I' is not used in grid:
  if (l1 > 7) l1--;
  if (l2 > 7) l2--;

  // convert grid letters into 100km-square indexes from false origin (grid square SV):
  var e = ((l1 - 2) % 5) * 5 + (l2 % 5);
  var n = 19 - Math.floor(l1 / 5) * 5 - Math.floor(l2 / 5);
  if (e < 0 || e > 6 || n < 0 || n > 12) {
    throw new InvalidGridRef('Out of bounds');
  }

  // skip grid letters to get numeric part of ref, stripping any spaces:
  gridref = gridref.slice(2);

  // append numeric part of references to grid index:
  e += gridref.slice(0, gridref.length / 2);
  n += gridref.slice(gridref.length / 2);

  var x2, y2;

  // normalise to 1m grid, rounding up to centre of grid square:
  // TODO Clean this up...
  switch (gridref.length) {
    case 0:
      e = parseInt(e + '00000', 10);
      n = parseInt(n + '00000', 10);
      x2 = e + 100000;
      y2 = n + 100000;
      break;
    case 2:
      e = parseInt(e + '0000', 10);
      n = parseInt(n + '0000', 10);
      x2 = e + 10000;
      y2 = n + 10000;
      break;
    case 4:
      e = parseInt(e + '000', 10);
      n = parseInt(n + '000', 10);
      x2 = e + 1000;
      y2 = n + 1000;
      break;
    case 6:
      e = parseInt(e + '00', 10);
      n = parseInt(n + '00', 10);
      x2 = e + 100;
      y2 = n + 100;
      break;
    case 8:
      e = parseInt(e + '0', 10);
      n = parseInt(n + '0', 10);
      x2 = e + 10;
      y2 = n + 10;
      break;
    case 10:
      e = parseInt(e, 10);
      n = parseInt(n, 10);
      x2 = e + 1;
      y2 = n + 1;
      break;
    default:
      // TODO Should we support sub-meter grid references?
      throw new InvalidGridRef('Too many digits');
  }

  return [e, n, x2, y2];
}

class InvalidGridRef extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidGridRef';
  }
}

export { parse, InvalidGridRef };
