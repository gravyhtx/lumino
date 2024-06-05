export type TypesList =
  | 'array'
  | 'arrays'
  | 'hasarrays'
  | 'boolean'
  | 'number'
  | 'numberstring'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'regex'
  | 'function'
  | 'rgb'
  | 'rgbobject'
  | 'rgbarray'
  | 'rgba'
  | 'hex'
  | 'hsl'
  | 'percentage'
  | 'element'
  | 'node'
  | 'domnode'
  | 'undefined'
  | 'null'
  | 'object'
  | 'image'
  | 'date'
  | 'infinity'
  | 'htmlcollection'
  | 'json'
  | 'jsonobject'
  | 'jsonstring'
  | 'plainobject'
  | 'record'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'promise'
  // Shortcut types
  | 'a'             // array
  | 'arr'           // array
  | '[]'            // array
  | 'multiarr'      // arrays
  | 'multiarray'    // arrays
  | 'arrs'          // arrays
  | '[[]]'          // arrays
  | 's'             // string
  | 'str'           // string
  | 'o'             // object
  | 'obj'           // object
  | '{}'            // object
  | 'f'             // function
  | 'fn'            // function
  | 'fun'           // function
  | 'func'          // function
  | 'b'             // boolean
  | 'bool'          // boolean
  | '??'            // boolean
  | 'n'             // number
  | 'num'           // number
  | 'ns'            // numberstring
  | 'numstr'        // numberstring
  | 'big'           // bigint
  | 'd'             // date
  | 'percent'       // percentage
  | '%'             // percentage
  | 'sym'           // symbol
  | 'u'             // undefined
  | 'e'             // element
  | 'el'            // element
  | '<>'            // element
  | 'img'           // image
  | 'jsonobj'       // jsonobject
  | 'jsonstr'       // jsonstring
  | 'rbgobj'        // rgbobject
  | 'rbgarr';       // rgbarray