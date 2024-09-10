import { Ctrl } from "../scope"

export const freeze = Object.freeze

export const define = Object.defineProperty

export const getDptor = Object.getOwnPropertyDescriptor

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: any, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

export const getOwnNames = Object.getOwnPropertyNames

const setPrototypeOf = Object.setPrototypeOf
export function setProto(obj: any, proto: any) {
  setPrototypeOf ? setPrototypeOf(obj, proto) : obj.__proto__ = proto
}

const getPrototypeOf = Object.getPrototypeOf
export function getProto(obj: any) {
  return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__
}

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
function getGetterOrSetter(method: 'get' | 'set', obj: any, key: string, ctrl: Ctrl) {

  if (ctrl.noProto && (key === "prototype" || key === "__proto__")) { throw new Error ("Access to prototype not allowed"); }
  if (method === "set" && ctrl.blackList.includes(obj)) {
    const idx = ctrl.blackList.findIndex(p => p === obj);
    throw new Error("object '" + ctrl.blackListNames[idx] + "' is readonly");
  }

  while (obj) {
    const descriptor = getOwnPropertyDescriptor(obj, key)
    const value = typeof descriptor !== 'undefined'
      && typeof descriptor.writable === 'undefined'
      && typeof descriptor[method] === 'function'
      && descriptor[method]
    if (value) {
      return value
    } else {
      obj = getProto(obj)
    }
  }
}
export function getGetter(obj: any, key: string, ctrl: Ctrl) {
  return getGetterOrSetter('get', obj, key, ctrl)
}
export function getSetter(obj: any, key: string, ctrl: Ctrl) {
  return getGetterOrSetter('set', obj, key, ctrl)
}

export const create = Object.create
export function inherits(
  subClass: (...args: any[]) => any,
  superClass: (...args: any[]) => any,
) {
  setProto(subClass, superClass) // allow to access static methods from derived class
  subClass.prototype = create(superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
    }
  })
}

export function _assign(target: any): any {
    for (let i = 1; i < arguments.length; ++i) {
      const source = arguments[i]
      for (const key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
}
export const assign = Object.assign ||  _assign

declare let WebAssembly: any // Avoid typescript error
let names: string[] = []
export let globalObj = create(null)
try {
  // Browser environment
  if (!window.Object) throw 0
  names = getOwnNames(globalObj = window).filter(n => n !== 'webkitStorageInfo')
} catch (err) {
  /* istanbul ignore next */
  try {
    // Node environment
    if (!global.Object) throw 0
    names = getOwnNames(globalObj = global).filter(n => n !== 'GLOBAL' && n !== 'root')
  } catch (err) {
    // Unknow environment, simulate a global environment
    try { globalObj.Object = Object                         } catch (err) { /* empty */ }
    try { globalObj.Function = Function                     } catch (err) { /* empty */ }
    try { globalObj.Array = Array                           } catch (err) { /* empty */ }
    try { globalObj.Number = Number                         } catch (err) { /* empty */ }
    try { globalObj.parseFloat = parseFloat                 } catch (err) { /* empty */ }
    try { globalObj.parseInt = parseInt                     } catch (err) { /* empty */ }
    try { globalObj.Infinity = Infinity                     } catch (err) { /* empty */ }
    try { globalObj.NaN = NaN                               } catch (err) { /* empty */ }
    try { globalObj.undefined = undefined                   } catch (err) { /* empty */ }
    try { globalObj.Boolean = Boolean                       } catch (err) { /* empty */ }
    try { globalObj.String = String                         } catch (err) { /* empty */ }
    try { globalObj.Symbol = Symbol                         } catch (err) { /* empty */ }
    try { globalObj.Date = Date                             } catch (err) { /* empty */ }
    try { globalObj.Promise = Promise                       } catch (err) { /* empty */ }
    try { globalObj.RegExp = RegExp                         } catch (err) { /* empty */ }
    try { globalObj.Error = Error                           } catch (err) { /* empty */ }
    try { globalObj.EvalError = EvalError                   } catch (err) { /* empty */ }
    try { globalObj.RangeError = RangeError                 } catch (err) { /* empty */ }
    try { globalObj.ReferenceError = ReferenceError         } catch (err) { /* empty */ }
    try { globalObj.SyntaxError = SyntaxError               } catch (err) { /* empty */ }
    try { globalObj.TypeError = TypeError                   } catch (err) { /* empty */ }
    try { globalObj.URIError = URIError                     } catch (err) { /* empty */ }
    try { globalObj.JSON = JSON                             } catch (err) { /* empty */ }
    try { globalObj.Math = Math                             } catch (err) { /* empty */ }
    try { globalObj.console = console                       } catch (err) { /* empty */ }
    try { globalObj.Intl = Intl                             } catch (err) { /* empty */ }
    try { globalObj.ArrayBuffer = ArrayBuffer               } catch (err) { /* empty */ }
    try { globalObj.Uint8Array = Uint8Array                 } catch (err) { /* empty */ }
    try { globalObj.Int8Array = Int8Array                   } catch (err) { /* empty */ }
    try { globalObj.Uint16Array = Uint16Array               } catch (err) { /* empty */ }
    try { globalObj.Int16Array = Int16Array                 } catch (err) { /* empty */ }
    try { globalObj.Uint32Array = Uint32Array               } catch (err) { /* empty */ }
    try { globalObj.Int32Array = Int32Array                 } catch (err) { /* empty */ }
    try { globalObj.Float32Array = Float32Array             } catch (err) { /* empty */ }
    try { globalObj.Float64Array = Float64Array             } catch (err) { /* empty */ }
    try { globalObj.Uint8ClampedArray = Uint8ClampedArray   } catch (err) { /* empty */ }
    try { globalObj.DataView = DataView                     } catch (err) { /* empty */ }
    try { globalObj.Map = Map                               } catch (err) { /* empty */ }
    try { globalObj.Set = Set                               } catch (err) { /* empty */ }
    try { globalObj.WeakMap = WeakMap                       } catch (err) { /* empty */ }
    try { globalObj.WeakSet = WeakSet                       } catch (err) { /* empty */ }
    try { globalObj.Proxy = Proxy                           } catch (err) { /* empty */ }
    try { globalObj.Reflect = Reflect                       } catch (err) { /* empty */ }
    try { globalObj.BigInt = BigInt                         } catch (err) { /* empty */ }
    try { globalObj.decodeURI = decodeURI                   } catch (err) { /* empty */ }
    try { globalObj.decodeURIComponent = decodeURIComponent } catch (err) { /* empty */ }
    try { globalObj.encodeURI = encodeURI                   } catch (err) { /* empty */ }
    try { globalObj.encodeURIComponent = encodeURIComponent } catch (err) { /* empty */ }
    try { globalObj.escape = escape                         } catch (err) { /* empty */ }
    try { globalObj.unescape = unescape                     } catch (err) { /* empty */ }
    try { globalObj.eval = eval                             } catch (err) { /* empty */ }
    try { globalObj.isFinite = isFinite                     } catch (err) { /* empty */ }
    try { globalObj.isNaN = isNaN                           } catch (err) { /* empty */ }
    try { globalObj.SharedArrayBuffer = SharedArrayBuffer   } catch (err) { /* empty */ }
    try { globalObj.Atomics = Atomics                       } catch (err) { /* empty */ }
    try { globalObj.WebAssembly = WebAssembly               } catch (err) { /* empty */ }
    try { globalObj.clearInterval = clearInterval           } catch (err) { /* empty */ }
    try { globalObj.clearTimeout = clearTimeout             } catch (err) { /* empty */ }
    try { globalObj.setInterval = setInterval               } catch (err) { /* empty */ }
    try { globalObj.setTimeout = setTimeout                 } catch (err) { /* empty */ }
    try { globalObj.crypto = crypto                         } catch (err) { /* empty */ }
    names = getOwnNames(globalObj)
  }
}
if (globalObj.Symbol) {
  !globalObj.Symbol.iterator && (globalObj.Symbol.iterator = createSymbol('iterator'))
  !globalObj.Symbol.asyncIterator && (globalObj.Symbol.asyncIterator = createSymbol('asynciterator'))
}
const win = create({})
for (let i = 0; i < names.length; i++) {
  const name = names[i]
  try { win[name] = globalObj[name] } catch (err) { /* empty */ }
}
export const WINDOW = createSymbol('window')

export function createSymbol(key: string) {
  return key + Math.random().toString(36).substring(2)
}


/**
 * create plain JS context with just the basic Javascript objects and function
 * available.
 * @param obj 
 * @returns 
 */


function createPlainJsGlobalObj() {

  let globalObj = Object.create(null);
  const coreJs = {

    // Core types
    Object, Function, Array, Number, String, Boolean, 
    
    // Core values
    Infinity, NaN, undefined: undefined as any,

    // Core objects
    Date, Error,

    // Core functions
    parseFloat, parseInt, Math, JSON, isNaN, isFinite,
  }
  Object.assign(globalObj, coreJs);

  // Browser specific functions
  try {
    Object.assign(globalObj, { decodeURI, decodeURIComponent, encodeURI, encodeURIComponent })
  } catch (err) { }


  return globalObj;

/*
  try { globalObj.Symbol = Symbol                         } catch (err) {  }
  try { globalObj.Promise = Promise                       } catch (err) {  }
  try { globalObj.RegExp = RegExp                         } catch (err) {  }
  try { globalObj.EvalError = EvalError                   } catch (err) {  }
  try { globalObj.RangeError = RangeError                 } catch (err) {  }
  try { globalObj.ReferenceError = ReferenceError         } catch (err) {  }
  try { globalObj.SyntaxError = SyntaxError               } catch (err) {  }
  try { globalObj.TypeError = TypeError                   } catch (err) {  }
  try { globalObj.URIError = URIError                     } catch (err) {  }
  try { globalObj.console = console                       } catch (err) {  }
  try { globalObj.Intl = Intl                             } catch (err) {  }
  try { globalObj.ArrayBuffer = ArrayBuffer               } catch (err) {  }
  try { globalObj.Uint8Array = Uint8Array                 } catch (err) {  }
  try { globalObj.Int8Array = Int8Array                   } catch (err) {  }
  try { globalObj.Uint16Array = Uint16Array               } catch (err) {  }
  try { globalObj.Int16Array = Int16Array                 } catch (err) {  }
  try { globalObj.Uint32Array = Uint32Array               } catch (err) {  }
  try { globalObj.Int32Array = Int32Array                 } catch (err) {  }
  try { globalObj.Float32Array = Float32Array             } catch (err) {  }
  try { globalObj.Float64Array = Float64Array             } catch (err) {  }
  try { globalObj.Uint8ClampedArray = Uint8ClampedArray   } catch (err) {  }
  try { globalObj.DataView = DataView                     } catch (err) {  }
  try { globalObj.Map = Map                               } catch (err) {  }
  try { globalObj.Set = Set                               } catch (err) {  }
  try { globalObj.WeakMap = WeakMap                       } catch (err) {  }
  try { globalObj.WeakSet = WeakSet                       } catch (err) {  }
  try { globalObj.Proxy = Proxy                           } catch (err) {  }
  try { globalObj.Reflect = Reflect                       } catch (err) {  }
  try { globalObj.BigInt = BigInt                         } catch (err) {  }
  try { globalObj.escape = escape                         } catch (err) {  }
  try { globalObj.unescape = unescape                     } catch (err) {  }
  try { globalObj.eval = eval                             } catch (err) {  }
  try { globalObj.SharedArrayBuffer = SharedArrayBuffer   } catch (err) {  }
  try { globalObj.Atomics = Atomics                       } catch (err) {  }
  try { globalObj.WebAssembly = WebAssembly               } catch (err) {  }
  try { globalObj.clearInterval = clearInterval           } catch (err) {  }
  try { globalObj.clearTimeout = clearTimeout             } catch (err) {  }
  try { globalObj.setInterval = setInterval               } catch (err) {  }
  try { globalObj.setTimeout = setTimeout                 } catch (err) {  }
  try { globalObj.crypto = crypto                         } catch (err) {  }
*/
  
}

const emptyGlobalObj = createPlainJsGlobalObj();
const emptyWin = create({});
Object.assign(emptyWin, emptyGlobalObj);


export function createSandBox(type: true | false | "empty" | "full") {

  if (type === "empty") {
    return assign (create({ [WINDOW]: emptyGlobalObj }), emptyWin);
  } else {
    return assign(create({ [WINDOW]: globalObj }), win)
  }
}




export function getAsyncIterator(obj: any) {
  let iterator: any
  if (typeof Symbol === 'function') {
    iterator = obj[Symbol.asyncIterator]
    !iterator && (iterator = obj[Symbol.iterator])
  }
  if (iterator) {
    return iterator.call(obj)
  } else if (typeof obj.next === 'function') {
    return obj
  } else {
    let i = 0
    return {
      next() {
        if (obj && i >= obj.length) obj = undefined
        return { value: obj && obj[i++], done: !obj }
      }
    }
  }
}
