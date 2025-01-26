# gridref-js

Parse Ordnance Survey Great Britain alpha numeric grid references into a bounding box.

## Installation

```shell
npm i @astuntech/gridref-js
```

## Usage

```javascript
import { parse, InvalidGridRef } from './gridref-js';

try {
  var bbox = parse('SU387148');
  console.log(bbox);
} catch (e) {
  if (e instanceof InvalidGridRef) {
    console.error(e.message);
  } else {
    throw e;
  }
}
```

## API

<!-- API START -->
<a name="parse"></a>

## parse(gridref) ⇒ <code>Array.&lt;Number&gt;</code>
Converts OSGB grid reference (`'SU387148'`) to bounding box in
British National Grid (`[438700, 114800, 438800, 114900]`)

**Kind**: global function  
**Returns**: <code>Array.&lt;Number&gt;</code> - Bounding box of grid reference in metres  

| Param | Type | Description |
| --- | --- | --- |
| gridref | <code>String</code> | Standard format OSGB grid reference (e.g. SU387148) |
<!-- API END -->

## Credit

Derived from https://github.com/peterhaldbaek/mt-osgridref

## License

MIT
