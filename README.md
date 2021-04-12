# gridref-js

Parse Ordnance Survey Great Britian alpha numeric grid references.

## Usage

```javascript
import { parse, InvalidGridRef } from './gridref.js';

try {
  var coords = parse('SU387148');
  console.log(coords);
} catch (e) {
  if (e instanceof InvalidGridRef) {
    console.error(e.message);
  } else {
    throw e;
  }
}
```

## Credit

Derived from https://github.com/peterhaldbaek/mt-osgridref

## License

MIT
