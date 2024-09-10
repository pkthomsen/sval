import { getOwnNames, createSandBox, globalObj, assign } from './share/util'
import { parse, Options, Node, Program } from 'acorn'
import { EXPORTS, IMPORT } from './share/const'
import { version } from '../package.json'
import Scope from './scope'

import { hoist } from './evaluate_n/helper'
import evaluate from './evaluate_n'

export interface SvalOptions {
  ecmaVer?: Options['ecmaVersion']
  sourceType?: Options['sourceType']
  sandBox?: true | false | "full" | "empty";
  timeout?: number;
}

const latestVer = 15


/**
 * Define the list of Object that are blacklisted (readonly)
 */
const blackListDefs: [object, string][] = [
  [Object,             "Object"],
  [Object.prototype,   "Object.prototype"],
  [Function,           "Function"],
  [Function.prototype, "Function.prototype"],
  [Array,              "Array"],
  [Array.prototype,    "Array.prototype"],
  [Number,             "Number"],
  [Number.prototype,   "Number.prototype"],
  [String,             "String"],
  [String.prototype,   "String.prototype"],
  [Boolean,            "Boolean"],
  [Boolean.prototype,  "Boolean.prototype"],

  [Date,               "Date"],
  [Date.prototype,     "Date.prototype"],
  [Error,              "Error"],
  [Error.prototype,    "Error.prototype"],

  [Infinity,           "Infinity"],
  [NaN,                "NaN"],

  [Math,               "Math"],
  [JSON,               "JSON"],
];


/**
 * Convert the list into simple arrays with just the object and the string. This allows
 * to perform the check in the list by simply calling blackList.includes(object) which is
 * fast native function.
 */

const blackList      = blackListDefs.map(p => p[0]);
const blackListNames = blackListDefs.map(p => p[1]);

/**
 * The safeObjectAssign function is used to intercept the normal Object.assign() function.
 * This is necessary to check black listed objects from being the target of an assign.
 * 
 * @param target 
 * @param sources 
 * @returns 
 */
const safeObjectAssign = (target: any, ...sources: any[]) => {
  if (blackList.includes(target)) {
    const idx = blackList.findIndex(p => p === target);
    throw new Error("object '" + blackListNames[idx] + "' is readonly");
  }
  return Object.assign(target, ...sources);
};       


/**
 * Define the list of Functions that must be intercepted. The intercepted function
 * can either be replaced by another function, of will just cause an exception
 */
const interceptFunctionDefs: [Function, string, Function][] = [
  [Object.assign,         "Object.assign",         safeObjectAssign],
  [Object.getPrototypeOf, "Object.getPrototypeOf", null],
  [Object.setPrototypeOf, "Object.setPrototypeOf", null],
]

const interceptFunction        = interceptFunctionDefs.map(p => p[0]);
const interceptFunctionName    = interceptFunctionDefs.map(p => p[1]);
const interceptFunctionReplace = interceptFunctionDefs.map(p => p[2]);





class Sval {
  static version: string = version

  private options: Options = { ecmaVersion: 'latest' }
  private scope = new Scope(null, true)

  exports: Record<string, any> = {};


  constructor(options: SvalOptions = {}) {
    let { ecmaVer = 'latest', sandBox = true, sourceType = 'script' } = options

    if (typeof ecmaVer === 'number') {
      ecmaVer -= ecmaVer < 2015 ? 0 : 2009 // format ecma edition
    }

    if (ecmaVer !== 'latest' && ecmaVer !== 3 && (ecmaVer < 5 || ecmaVer > latestVer)) {
      throw new Error(`unsupported ecmaVer`)
    }

    this.options.ecmaVersion = ecmaVer as Options['ecmaVersion']
    this.options.sourceType = sourceType

    if (sandBox) {
      // Shallow clone to create a sandbox
      const win = createSandBox(sandBox)
      this.scope.let('globalThis', win)
      this.scope.let('window', win)
      this.scope.let('this', win)

      if (sandBox === "empty") {
        this.scope.ctrl.noProto = true;
        this.scope.ctrl.blackList                = blackList;
        this.scope.ctrl.blackListNames           = blackListNames;
        this.scope.ctrl.interceptFunction        = interceptFunction;
        this.scope.ctrl.interceptFunctionName    = interceptFunctionName;
        this.scope.ctrl.interceptFunctionReplace = interceptFunctionReplace;
      }
1
    } else {
      this.scope.let('globalThis', globalObj)
      this.scope.let('window', globalObj)
      this.scope.let('this', globalObj)
    }

    this.scope.const(sourceType === 'module' ? EXPORTS : 'exports', this.exports = {})
    
    if (typeof options.timeout === "number") {
      this.scope.setTimeout(options.timeout)
    }
  }

  import(nameOrModules: string | Record<string, any>, mod?: any) {
    if (typeof nameOrModules === 'string') {
      nameOrModules = { [nameOrModules]: mod }
    }

    if (typeof nameOrModules !== 'object') return

    const names = getOwnNames(nameOrModules)

    for (let i = 0; i < names.length; i++) {
      const name = names[i]
      const modName = this.options.sourceType === 'module' ? IMPORT + name : name
      this.scope.var(modName, nameOrModules[name])
    }
  }

  parse(code: string, parser?: (code: string, options: SvalOptions) => Node) {
    if (typeof parser === 'function') {
      return parser(code, assign({} as SvalOptions, this.options))
    }
    return parse(code, this.options)
  }

  run(code: string | Node) {
    const ast = typeof code === 'string' ? parse(code, this.options) as Node : code
    hoist(ast as Program, this.scope)
    evaluate(ast, this.scope)
  }
}

export default Sval