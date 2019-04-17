(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('acorn')) :
  typeof define === 'function' && define.amd ? define(['acorn'], factory) :
  (global = global || self, global.Sval = factory(global.acorn));
}(this, function (acorn) { 'use strict';

  var declaration = /*#__PURE__*/Object.freeze({
    get FunctionDeclaration () { return FunctionDeclaration; },
    get VariableDeclaration () { return VariableDeclaration; },
    get VariableDeclarator () { return VariableDeclarator; },
    get ClassDeclaration () { return ClassDeclaration; },
    get ClassBody () { return ClassBody; },
    get MethodDefinition () { return MethodDefinition; }
  });
  var declaration$1 = /*#__PURE__*/Object.freeze({
    get FunctionDeclaration () { return FunctionDeclaration$1; },
    get VariableDeclaration () { return VariableDeclaration$1; },
    get VariableDeclarator () { return VariableDeclarator$1; },
    get ClassDeclaration () { return ClassDeclaration$1; },
    get ClassBody () { return ClassBody$1; },
    get MethodDefinition () { return MethodDefinition$1; }
  });

  const AWAIT = { RES: undefined };
  const RETURN = { RES: undefined };
  const CONTINUE = createSymbol('continue');
  const BREAK = createSymbol('break');
  const SUPER = createSymbol('super');
  const ARROW = createSymbol('arrow');
  const NOINIT = createSymbol('noinit');

  const freeze = Object.freeze;
  const define = Object.defineProperty;
  const getDptor = Object.getOwnPropertyDescriptor;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  const getOwnPropertyNames = Object.getOwnPropertyNames;
  function getOwnNames(obj) {
      return getOwnPropertyNames(obj);
  }
  const getPrototypeOf = Object.getPrototypeOf;
  function getProto(obj) {
      return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__;
  }
  const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  function getGetterOrSetter(method, obj, key) {
      while (obj) {
          const descriptor = getOwnPropertyDescriptor(obj, key);
          const value = typeof descriptor !== 'undefined'
              && typeof descriptor.writable === 'undefined'
              && typeof descriptor[method] === 'function'
              && descriptor[method];
          if (value) {
              return value;
          }
          else {
              obj = getProto(obj);
          }
      }
  }
  function getGetter(obj, key) {
      return getGetterOrSetter('get', obj, key);
  }
  function getSetter(obj, key) {
      return getGetterOrSetter('set', obj, key);
  }
  const create = Object.create;
  function inherits(subClass, superClass) {
      subClass.prototype = create(superClass.prototype, {
          constructor: {
              value: subClass,
              writable: true,
          }
      });
  }
  function _assign(target) {
      for (let i = 1; i < arguments.length; ++i) {
          const source = arguments[i];
          for (const key in source) {
              if (hasOwn(source, key)) {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }
  const assign = Object.assign || _assign;
  let names = [];
  let globalObj = {};
  try {
      if (!window.Object)
          throw 0;
      names = getOwnNames(globalObj = window).filter(n => n !== 'webkitStorageInfo');
  }
  catch (err) {
      try {
          if (!global.Object)
              throw 0;
          names = getOwnNames(globalObj = global).filter(n => n !== 'GLOBAL' && n !== 'root');
      }
      catch (err) {
          try {
              globalObj.Object = Object;
          }
          catch (err) { }
          try {
              globalObj.Function = Function;
          }
          catch (err) { }
          try {
              globalObj.Array = Array;
          }
          catch (err) { }
          try {
              globalObj.Number = Number;
          }
          catch (err) { }
          try {
              globalObj.parseFloat = parseFloat;
          }
          catch (err) { }
          try {
              globalObj.parseInt = parseInt;
          }
          catch (err) { }
          try {
              globalObj.Infinity = Infinity;
          }
          catch (err) { }
          try {
              globalObj.NaN = NaN;
          }
          catch (err) { }
          try {
              globalObj.undefined = undefined;
          }
          catch (err) { }
          try {
              globalObj.Boolean = Boolean;
          }
          catch (err) { }
          try {
              globalObj.String = String;
          }
          catch (err) { }
          try {
              globalObj.Symbol = Symbol;
          }
          catch (err) { }
          try {
              globalObj.Date = Date;
          }
          catch (err) { }
          try {
              globalObj.Promise = Promise;
          }
          catch (err) { }
          try {
              globalObj.RegExp = RegExp;
          }
          catch (err) { }
          try {
              globalObj.Error = Error;
          }
          catch (err) { }
          try {
              globalObj.EvalError = EvalError;
          }
          catch (err) { }
          try {
              globalObj.RangeError = RangeError;
          }
          catch (err) { }
          try {
              globalObj.ReferenceError = ReferenceError;
          }
          catch (err) { }
          try {
              globalObj.SyntaxError = SyntaxError;
          }
          catch (err) { }
          try {
              globalObj.TypeError = TypeError;
          }
          catch (err) { }
          try {
              globalObj.URIError = URIError;
          }
          catch (err) { }
          try {
              globalObj.JSON = JSON;
          }
          catch (err) { }
          try {
              globalObj.Math = Math;
          }
          catch (err) { }
          try {
              globalObj.console = console;
          }
          catch (err) { }
          try {
              globalObj.Intl = Intl;
          }
          catch (err) { }
          try {
              globalObj.ArrayBuffer = ArrayBuffer;
          }
          catch (err) { }
          try {
              globalObj.Uint8Array = Uint8Array;
          }
          catch (err) { }
          try {
              globalObj.Int8Array = Int8Array;
          }
          catch (err) { }
          try {
              globalObj.Uint16Array = Uint16Array;
          }
          catch (err) { }
          try {
              globalObj.Int16Array = Int16Array;
          }
          catch (err) { }
          try {
              globalObj.Uint32Array = Uint32Array;
          }
          catch (err) { }
          try {
              globalObj.Int32Array = Int32Array;
          }
          catch (err) { }
          try {
              globalObj.Float32Array = Float32Array;
          }
          catch (err) { }
          try {
              globalObj.Float64Array = Float64Array;
          }
          catch (err) { }
          try {
              globalObj.Uint8ClampedArray = Uint8ClampedArray;
          }
          catch (err) { }
          try {
              globalObj.DataView = DataView;
          }
          catch (err) { }
          try {
              globalObj.Map = Map;
          }
          catch (err) { }
          try {
              globalObj.Set = Set;
          }
          catch (err) { }
          try {
              globalObj.WeakMap = WeakMap;
          }
          catch (err) { }
          try {
              globalObj.WeakSet = WeakSet;
          }
          catch (err) { }
          try {
              globalObj.Proxy = Proxy;
          }
          catch (err) { }
          try {
              globalObj.Reflect = Reflect;
          }
          catch (err) { }
          try {
              globalObj.decodeURI = decodeURI;
          }
          catch (err) { }
          try {
              globalObj.decodeURIComponent = decodeURIComponent;
          }
          catch (err) { }
          try {
              globalObj.encodeURI = encodeURI;
          }
          catch (err) { }
          try {
              globalObj.encodeURIComponent = encodeURIComponent;
          }
          catch (err) { }
          try {
              globalObj.escape = escape;
          }
          catch (err) { }
          try {
              globalObj.unescape = unescape;
          }
          catch (err) { }
          try {
              globalObj.eval = eval;
          }
          catch (err) { }
          try {
              globalObj.isFinite = isFinite;
          }
          catch (err) { }
          try {
              globalObj.isNaN = isNaN;
          }
          catch (err) { }
          try {
              globalObj.SharedArrayBuffer = SharedArrayBuffer;
          }
          catch (err) { }
          try {
              globalObj.Atomics = Atomics;
          }
          catch (err) { }
          try {
              globalObj.WebAssembly = WebAssembly;
          }
          catch (err) { }
          try {
              globalObj.clearInterval = clearInterval;
          }
          catch (err) { }
          try {
              globalObj.clearTimeout = clearTimeout;
          }
          catch (err) { }
          try {
              globalObj.setInterval = setInterval;
          }
          catch (err) { }
          try {
              globalObj.setTimeout = setTimeout;
          }
          catch (err) { }
          try {
              globalObj.crypto = crypto;
          }
          catch (err) { }
          names = getOwnNames(globalObj);
      }
  }
  const win = {};
  for (const index in names) {
      const name = names[index];
      try {
          win[name] = globalObj[name];
      }
      catch (err) { }
  }
  function createSandBox() {
      return assign({}, win);
  }
  function createSymbol(key) {
      return key + Math.random().toString(36).substring(2);
  }
  function runAsync(iterator, options = {}) {
      const { res, err, ret, full } = options;
      return new Promise((resolve, reject) => {
          if (hasOwn(options, 'ret')) {
              return resolve(iterator.return(ret));
          }
          if (hasOwn(options, 'err')) {
              onRejected(err);
          }
          else {
              onFulfilled(res);
          }
          function onFulfilled(res) {
              let ret;
              try {
                  ret = iterator.next(res);
              }
              catch (e) {
                  return reject(e);
              }
              next(ret);
              return null;
          }
          function onRejected(err) {
              let ret;
              try {
                  ret = iterator.throw(err);
              }
              catch (e) {
                  return reject(e);
              }
              next(ret);
          }
          function next(ret) {
              if (ret.done)
                  return resolve(full ? ret : ret.value);
              if (ret.value !== AWAIT)
                  return resolve(ret);
              const awaitValue = ret.value.RES;
              const value = awaitValue && awaitValue.then === 'function'
                  ? awaitValue : Promise.resolve(awaitValue);
              return value.then(onFulfilled, onRejected);
          }
      });
  }
  function getIterator(obj) {
      const iterator = typeof Symbol === 'function' && obj[Symbol.iterator];
      if (iterator) {
          return iterator.call(obj);
      }
      else if (typeof obj.next === 'function') {
          return obj;
      }
      else {
          let i = 0;
          return {
              next() {
                  if (obj && i >= obj.length) {
                      obj = undefined;
                  }
                  return { value: obj && obj[i++], done: !obj };
              }
          };
      }
  }

  var version = "0.4.0";

  class Var {
      constructor(kind, value) {
          this.kind = kind;
          this.value = value;
      }
      get() {
          return this.value;
      }
      set(value) {
          if (this.kind === 'const') {
              throw new TypeError('Assignment to constant variable');
          }
          else {
              return this.value = value;
          }
      }
  }
  class Prop {
      constructor(object, property) {
          this.object = object;
          this.property = property;
      }
      get() {
          return this.object[this.property];
      }
      set(value) {
          this.object[this.property] = value;
          return true;
      }
      del() {
          return delete this.object[this.property];
      }
  }

  class Scope {
      constructor(parent = null, isolated = false) {
          this.context = Object.create(null);
          this.parent = parent;
          this.isolated = isolated;
      }
      global() {
          let scope = this;
          while (scope.parent) {
              scope = scope.parent;
          }
          return scope;
      }
      clone() {
          const cloneScope = new Scope(this.parent, this.isolated);
          const names = getOwnNames(this.context);
          for (const index in names) {
              const name = names[index];
              const variable = this.context[name];
              cloneScope[variable.kind](name, variable.get());
          }
          return cloneScope;
      }
      find(name) {
          if (hasOwn(this.context, name)) {
              return this.context[name];
          }
          else if (this.parent) {
              return this.parent.find(name);
          }
          else {
              const win = this.global().find('window').get();
              if (hasOwn(win, name)) {
                  return new Prop(win, name);
              }
              else {
                  return null;
              }
          }
      }
      var(name, value) {
          let scope = this;
          while (scope.parent && !scope.isolated) {
              scope = scope.parent;
          }
          const variable = scope.context[name];
          if (!variable) {
              scope.context[name] = new Var('var', value === NOINIT ? undefined : value);
          }
          else {
              if (variable.kind === 'var') {
                  if (value !== NOINIT) {
                      variable.set(value);
                  }
              }
              else {
                  throw new SyntaxError(`Identifier '${name}' has already been declared`);
              }
          }
          if (!scope.parent) {
              const win = scope.find('window').get();
              if (value !== NOINIT) {
                  win[name] = value;
              }
          }
      }
      let(name, value) {
          const variable = this.context[name];
          if (!variable) {
              this.context[name] = new Var('let', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
      const(name, value) {
          const variable = this.context[name];
          if (!variable) {
              this.context[name] = new Var('const', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
      func(name, value) {
          const variable = this.context[name];
          if (!variable || variable.kind === 'var') {
              this.context[name] = new Var('var', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
  }

  function Identifier(node, scope, options = {}) {
      const { getVar = false, throwErr = true } = options;
      if (node.name === 'undefined') {
          return undefined;
      }
      const variable = scope.find(node.name);
      if (variable) {
          return getVar ? variable : variable.get();
      }
      else if (throwErr) {
          throw new ReferenceError(`${node.name} is not defined`);
      }
      else {
          return undefined;
      }
  }

  var identifier = /*#__PURE__*/Object.freeze({
    Identifier: Identifier
  });

  function Literal(node, scope) {
      return node.value;
  }

  var literal = /*#__PURE__*/Object.freeze({
    Literal: Literal
  });

  function ThisExpression(node, scope) {
      return scope.find('this').get();
  }
  function ArrayExpression(node, scope) {
      let results = [];
      for (const index in node.elements) {
          const item = node.elements[index];
          if (item.type === 'SpreadElement') {
              results = results.concat(SpreadElement(item, scope));
          }
          else {
              results.push(evaluate(item, scope));
          }
      }
      return results;
  }
  function ObjectExpression(node, scope) {
      const object = {};
      for (const index in node.properties) {
          const property = node.properties[index];
          if (property.type === 'SpreadElement') {
              assign(object, SpreadElement(property, scope));
          }
          else {
              let key;
              const propKey = property.key;
              if (property.computed) {
                  key = evaluate(propKey, scope);
              }
              else {
                  if (propKey.type === 'Identifier') {
                      key = propKey.name;
                  }
                  else {
                      key = '' + (Literal(propKey, scope));
                  }
              }
              const value = evaluate(property.value, scope);
              const propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  define(object, key, { get: value });
              }
              else {
                  define(object, key, { set: value });
              }
          }
      }
      return object;
  }
  function FunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function UnaryExpression(node, scope) {
      const arg = node.argument;
      switch (node.operator) {
          case '+':
              return +(evaluate(arg, scope));
          case '-':
              return -(evaluate(arg, scope));
          case '!':
              return !(evaluate(arg, scope));
          case '~':
              return ~(evaluate(arg, scope));
          case 'void':
              return void (evaluate(arg, scope));
          case 'typeof':
              if (arg.type === 'Identifier') {
                  return typeof (Identifier(arg, scope, { throwErr: false }));
              }
              else {
                  return typeof (evaluate(arg, scope));
              }
          case 'delete':
              if (arg.type === 'MemberExpression') {
                  const variable = MemberExpression(arg, scope, { getVar: true });
                  return variable.del();
              }
              else if (arg.type === 'Identifier') {
                  const win = scope.global().find('window').get();
                  return delete win[arg.name];
              }
              else {
                  throw new SyntaxError('Unexpected token');
              }
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function UpdateExpression(node, scope) {
      const arg = node.argument;
      let variable;
      if (arg.type === 'Identifier') {
          variable = Identifier(arg, scope, { getVar: true });
      }
      else if (arg.type === 'MemberExpression') {
          variable = MemberExpression(arg, scope, { getVar: true });
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const value = variable.get();
      if (node.operator === '++') {
          variable.set(value + 1);
          return node.prefix ? variable.get() : value;
      }
      else if (node.operator === '--') {
          variable.set(value - 1);
          return node.prefix ? variable.get() : value;
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function BinaryExpression(node, scope) {
      const left = evaluate(node.left, scope);
      const right = evaluate(node.right, scope);
      const binaryOps = {
          '==': () => left == right,
          '!=': () => left != right,
          '===': () => left === right,
          '!==': () => left !== right,
          '<': () => left < right,
          '<=': () => left <= right,
          '>': () => left > right,
          '>=': () => left >= right,
          '<<': () => left << right,
          '>>': () => left >> right,
          '>>>': () => left >>> right,
          '+': () => left + right,
          '-': () => left - right,
          '*': () => left * right,
          '**': () => Math.pow(left, right),
          '/': () => left / right,
          '%': () => left % right,
          '|': () => left | right,
          '^': () => left ^ right,
          '&': () => left & right,
          'in': () => left in right,
          'instanceof': () => left instanceof right,
      };
      const handler = binaryOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function AssignmentExpression(node, scope) {
      const value = evaluate(node.right, scope);
      const left = node.left;
      let variable;
      if (left.type === 'Identifier') {
          variable = Identifier(left, scope, { getVar: true, throwErr: false });
          if (!variable) {
              const win = scope.global().find('window').get();
              variable = new Prop(win, left.name);
          }
      }
      else if (left.type === 'MemberExpression') {
          variable = MemberExpression(left, scope, { getVar: true });
      }
      else {
          return pattern$3(left, scope, { feed: value });
      }
      const assignOps = {
          '=': () => {
              variable.set(value);
              return variable.get();
          },
          '+=': () => {
              variable.set(variable.get() + value);
              return variable.get();
          },
          '-=': () => {
              variable.set(variable.get() - value);
              return variable.get();
          },
          '*=': () => {
              variable.set(variable.get() * value);
              return variable.get();
          },
          '/=': () => {
              variable.set(variable.get() / value);
              return variable.get();
          },
          '%=': () => {
              variable.set(variable.get() % value);
              return variable.get();
          },
          '**=': () => {
              variable.set(Math.pow(variable.get(), value));
              return variable.get();
          },
          '<<=': () => {
              variable.set(variable.get() << value);
              return variable.get();
          },
          '>>=': () => {
              variable.set(variable.get() >> value);
              return variable.get();
          },
          '>>>=': () => {
              variable.set(variable.get() >>> value);
              return variable.get();
          },
          '|=': () => {
              variable.set(variable.get() | value);
              return variable.get();
          },
          '^=': () => {
              variable.set(variable.get() ^ value);
              return variable.get();
          },
          '&=': () => {
              variable.set(variable.get() & value);
              return variable.get();
          },
      };
      const handler = assignOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function LogicalExpression(node, scope) {
      switch (node.operator) {
          case '||':
              return (evaluate(node.left, scope)) || (evaluate(node.right, scope));
          case '&&':
              return (evaluate(node.left, scope)) && (evaluate(node.right, scope));
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function MemberExpression(node, scope, options = {}) {
      const { getObj = false, getVar = false } = options;
      let object;
      if (node.object.type === 'Super') {
          object = Super(node.object, scope, { getProto: true });
      }
      else {
          object = evaluate(node.object, scope);
      }
      if (getObj) {
          if (node.object.type === 'Super') {
              return scope.find('this').get();
          }
          else {
              return object;
          }
      }
      let key;
      if (node.computed) {
          key = evaluate(node.property, scope);
      }
      else {
          key = node.property.name;
      }
      if (getVar) {
          const setter = getSetter(object, key);
          if (node.object.type === 'Super' && setter) {
              const thisObject = scope.find('this').get();
              const privateKey = createSymbol(key);
              define(thisObject, privateKey, { set: setter });
              return new Prop(thisObject, privateKey);
          }
          else {
              return new Prop(object, key);
          }
      }
      else {
          const getter = getGetter(object, key);
          if (node.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
              return getter.call(thisObject);
          }
          else {
              return object[key];
          }
      }
  }
  function ConditionalExpression(node, scope) {
      return (evaluate(node.test, scope))
          ? (evaluate(node.consequent, scope))
          : (evaluate(node.alternate, scope));
  }
  function CallExpression(node, scope) {
      let func;
      let object;
      if (node.callee.type === 'MemberExpression') {
          object = MemberExpression(node.callee, scope, { getObj: true });
          let key;
          if (node.callee.computed) {
              key = evaluate(node.callee.property, scope);
          }
          else {
              key = node.callee.property.name;
          }
          const getter = getGetter(object, key);
          if (node.callee.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
              func = getter.call(thisObject);
          }
          else {
              func = object[key];
          }
      }
      else {
          object = scope.find('this').get();
          func = evaluate(node.callee, scope);
      }
      let args = [];
      for (const index in node.arguments) {
          const arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      if (!func.apply) {
          throw new TypeError(`${func && func.name || func} is not a function`);
      }
      return func.apply(object, args);
  }
  function NewExpression(node, scope) {
      const constructor = evaluate(node.callee, scope);
      if (typeof constructor !== 'function') {
          let name;
          if (node.callee.type === 'Identifier') {
              name = node.callee.name;
          }
          else {
              try {
                  name = JSON.stringify(constructor);
              }
              catch (err) {
                  name = '' + constructor;
              }
          }
          throw new TypeError(`${name} is not a constructor`);
      }
      else if (constructor[ARROW]) {
          throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`);
      }
      let args = [];
      for (const index in node.arguments) {
          const arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      return new constructor(...args);
  }
  function SequenceExpression(node, scope) {
      let result;
      for (const index in node.expressions) {
          result = evaluate(node.expressions[index], scope);
      }
      return result;
  }
  function ArrowFunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function TemplateLiteral(node, scope) {
      const quasis = node.quasis;
      const expressions = node.expressions;
      let result = '';
      let temEl;
      let expr;
      while (temEl = quasis.shift()) {
          result += TemplateElement(temEl, scope);
          expr = expressions.shift();
          if (expr) {
              result += evaluate(expr, scope);
          }
      }
      return result;
  }
  function TaggedTemplateExpression(node, scope) {
      const tagFunc = evaluate(node.tag, scope);
      const quasis = node.quasi.quasis;
      const str = quasis.map(v => v.value.cooked);
      const raw = quasis.map(v => v.value.raw);
      define(str, 'raw', {
          value: freeze(raw)
      });
      const expressions = node.quasi.expressions;
      const args = [];
      if (expressions) {
          for (const index in expressions) {
              args.push(evaluate(expressions[index], scope));
          }
      }
      return tagFunc(freeze(str), ...args);
  }
  function TemplateElement(node, scope) {
      return node.value.raw;
  }
  function ClassExpression(node, scope) {
      return createClass$1(node, scope);
  }
  function Super(node, scope, options = {}) {
      const { getProto = false } = options;
      const superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function SpreadElement(node, scope) {
      return evaluate(node.argument, scope);
  }

  var expression = /*#__PURE__*/Object.freeze({
    ThisExpression: ThisExpression,
    ArrayExpression: ArrayExpression,
    ObjectExpression: ObjectExpression,
    FunctionExpression: FunctionExpression,
    UnaryExpression: UnaryExpression,
    UpdateExpression: UpdateExpression,
    BinaryExpression: BinaryExpression,
    AssignmentExpression: AssignmentExpression,
    LogicalExpression: LogicalExpression,
    MemberExpression: MemberExpression,
    ConditionalExpression: ConditionalExpression,
    CallExpression: CallExpression,
    NewExpression: NewExpression,
    SequenceExpression: SequenceExpression,
    ArrowFunctionExpression: ArrowFunctionExpression,
    TemplateLiteral: TemplateLiteral,
    TaggedTemplateExpression: TaggedTemplateExpression,
    TemplateElement: TemplateElement,
    ClassExpression: ClassExpression,
    Super: Super,
    SpreadElement: SpreadElement
  });

  function ObjectPattern(node, scope, options = {}) {
      const { kind = 'let', hoist = false, feed = {} } = options;
      const fedKeys = [];
      for (const index in node.properties) {
          const property = node.properties[index];
          const value = property.value;
          if (hoist) {
              if (kind === 'var') {
                  if (value.type === 'Identifier') {
                      scope.var(value.name);
                  }
                  else {
                      pattern$3(value, scope, { kind, hoist });
                  }
              }
          }
          else if (property.type === 'Property') {
              let key;
              if (property.computed) {
                  key = evaluate(property.key, scope);
              }
              else {
                  key = property.key.name;
              }
              fedKeys.push(key);
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  pattern$3(value, scope, { kind, feed: feed[key] });
              }
          }
          else {
              const rest = assign({}, feed);
              for (const index in fedKeys) {
                  delete rest[fedKeys[index]];
              }
              RestElement(property, scope, { kind, feed: rest });
          }
      }
  }
  function ArrayPattern(node, scope, options = {}) {
      const { kind, hoist = false, feed = [] } = options;
      const result = [];
      for (let i = 0; i < node.elements.length; i++) {
          const element = node.elements[i];
          if (hoist) {
              if (kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope.var(element.name);
                  }
                  else {
                      pattern$3(element, scope, { kind, hoist });
                  }
              }
          }
          else {
              if (element.type === 'Identifier') {
                  if (kind) {
                      scope[kind](element.name, feed[i]);
                  }
                  else {
                      const variable = Identifier(element, scope, { getVar: true });
                      variable.set(feed[i]);
                      result.push(variable.get());
                  }
              }
              else if (element.type === 'RestElement') {
                  RestElement(element, scope, { kind, feed: feed.slice(i) });
              }
              else {
                  pattern$3(element, scope, { kind, feed: feed[i] });
              }
          }
      }
      if (result.length) {
          return result;
      }
  }
  function RestElement(node, scope, options = {}) {
      const { kind, hoist = false, feed = [] } = options;
      const arg = node.argument;
      if (hoist) {
          if (kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope.var(arg.name);
              }
              else {
                  pattern$3(arg, scope, { kind, hoist });
              }
          }
      }
      else {
          if (arg.type === 'Identifier') {
              if (kind) {
                  scope[kind](arg.name, feed);
              }
              else {
                  const variable = Identifier(arg, scope, { getVar: true });
                  variable.set(feed);
              }
          }
          else {
              pattern$3(arg, scope, { kind, feed });
          }
      }
  }
  function AssignmentPattern(node, scope) {
      const feed = evaluate(node.right, scope);
      if (node.left.type === 'Identifier') {
          scope.let(node.left.name, feed);
      }
      else {
          pattern$3(node.left, scope, { feed });
      }
  }

  var pattern = /*#__PURE__*/Object.freeze({
    ObjectPattern: ObjectPattern,
    ArrayPattern: ArrayPattern,
    RestElement: RestElement,
    AssignmentPattern: AssignmentPattern
  });

  function Program(program, scope) {
      for (const index in program.body) {
          evaluate(program.body[index], scope);
      }
  }

  var program = /*#__PURE__*/Object.freeze({
    Program: Program
  });

  function ExpressionStatement(node, scope) {
      evaluate(node.expression, scope);
  }
  function BlockStatement(block, scope, options = {}) {
      const { invasived = false, hoisted = false, } = options;
      const subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          hoistFunc$1(block, subScope);
      }
      for (const index in block.body) {
          const result = evaluate(block.body[index], subScope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function EmptyStatement() {
  }
  function DebuggerStatement() {
      debugger;
  }
  function ReturnStatement(node, scope) {
      RETURN.RES = node.argument ? (evaluate(node.argument, scope)) : undefined;
      return RETURN;
  }
  function BreakStatement() {
      return BREAK;
  }
  function ContinueStatement() {
      return CONTINUE;
  }
  function IfStatement(node, scope) {
      if (evaluate(node.test, scope)) {
          return evaluate(node.consequent, scope);
      }
      else {
          return evaluate(node.alternate, scope);
      }
  }
  function SwitchStatement(node, scope) {
      const discriminant = evaluate(node.discriminant, scope);
      let matched = false;
      for (const index in node.cases) {
          const eachCase = node.cases[index];
          if (!matched
              && (!eachCase.test
                  || (evaluate(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              const result = SwitchCase(eachCase, scope);
              if (result === BREAK || result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function SwitchCase(node, scope) {
      for (const index in node.consequent) {
          const result = evaluate(node.consequent[index], scope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function ThrowStatement(node, scope) {
      throw evaluate(node.argument, scope);
  }
  function TryStatement(node, scope) {
      try {
          return BlockStatement(node.block, scope);
      }
      catch (err) {
          if (node.handler) {
              const subScope = new Scope(scope);
              const param = node.handler.param;
              if (param) {
                  if (param.type === 'Identifier') {
                      const name = param.name;
                      subScope.let(name, err);
                  }
                  else {
                      pattern$3(param, scope, { feed: err });
                  }
              }
              return CatchClause(node.handler, subScope);
          }
          else {
              throw err;
          }
      }
      finally {
          if (node.finalizer) {
              return BlockStatement(node.finalizer, scope);
          }
      }
  }
  function CatchClause(node, scope) {
      return BlockStatement(node.body, scope, { invasived: true });
  }
  function WhileStatement(node, scope) {
      while (evaluate(node.test, scope)) {
          const result = evaluate(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function DoWhileStatement(node, scope) {
      do {
          const result = evaluate(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      } while (evaluate(node.test, scope));
  }
  function ForStatement(node, scope) {
      const forScope = new Scope(scope);
      for (evaluate(node.init, forScope); node.test ? (evaluate(node.test, forScope)) : true; evaluate(node.update, forScope)) {
          const subScope = new Scope(forScope);
          let result;
          if (node.body.type === 'BlockStatement') {
              result = BlockStatement(node.body, subScope, { invasived: true });
          }
          else {
              result = evaluate(node.body, subScope);
          }
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForInStatement(node, scope) {
      for (const value in evaluate(node.right, scope)) {
          const result = ForXHandler$1(node, scope, { value });
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForOfStatement(node, scope) {
      const right = evaluate(node.right, scope);
      for (const value of right) {
          const result = ForXHandler$1(node, scope, { value });
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }

  var statement = /*#__PURE__*/Object.freeze({
    ExpressionStatement: ExpressionStatement,
    BlockStatement: BlockStatement,
    EmptyStatement: EmptyStatement,
    DebuggerStatement: DebuggerStatement,
    ReturnStatement: ReturnStatement,
    BreakStatement: BreakStatement,
    ContinueStatement: ContinueStatement,
    IfStatement: IfStatement,
    SwitchStatement: SwitchStatement,
    SwitchCase: SwitchCase,
    ThrowStatement: ThrowStatement,
    TryStatement: TryStatement,
    CatchClause: CatchClause,
    WhileStatement: WhileStatement,
    DoWhileStatement: DoWhileStatement,
    ForStatement: ForStatement,
    ForInStatement: ForInStatement,
    ForOfStatement: ForOfStatement
  });

  const evaluateOps = assign({}, declaration, expression, identifier, literal, pattern, program, statement);
  function evaluate(node, scope) {
      if (!node)
          return;
      const handler = evaluateOps[node.type];
      if (handler) {
          return handler(node, scope);
      }
      else {
          throw new Error(`${node.type} isn't implemented`);
      }
  }

  function FunctionDeclaration(node, scope) {
      scope.func(node.id.name, createFunc$1(node, scope));
  }
  function VariableDeclaration(node, scope, options = {}) {
      for (const index in node.declarations) {
          VariableDeclarator(node.declarations[index], scope, assign({ kind: node.kind }, options));
      }
  }
  function VariableDeclarator(node, scope, options = {}) {
      const { kind = 'let', hoist = false, feed } = options;
      if (hoist) {
          if (kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope.var(node.id.name);
              }
              else {
                  pattern$3(node.id, scope, { kind, hoist });
              }
          }
      }
      else if (kind === 'var'
          || kind === 'let'
          || kind === 'const') {
          const value = hasOwn(options, 'feed') ? feed : evaluate(node.init, scope);
          if (node.id.type === 'Identifier') {
              const name = node.id.name;
              if (kind === 'var' && !node.init) {
                  scope.var(name, NOINIT);
              }
              else {
                  scope[kind](name, value);
              }
              if (node.init &&
                  [
                      'FunctionExpression',
                      'ArrowFunctionExpression'
                  ].indexOf(node.init.type) !== -1
                  && !value.name) {
                  define(value, 'name', {
                      value: name,
                      configurable: true
                  });
              }
          }
          else {
              pattern$3(node.id, scope, { kind, feed: value });
          }
      }
      else {
          throw new SyntaxError('Unexpected identifier');
      }
  }
  function ClassDeclaration(node, scope) {
      scope.func(node.id.name, createClass$1(node, scope));
  }
  function ClassBody(node, scope, options = {}) {
      const { klass = function () { } } = options;
      for (const index in node.body) {
          MethodDefinition(node.body[index], scope, { klass });
      }
  }
  function MethodDefinition(node, scope, options = {}) {
      const { klass = function () { } } = options;
      let key;
      if (node.computed) {
          key = evaluate(node.key, scope);
      }
      else if (node.key.type === 'Identifier') {
          key = node.key.name;
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const obj = node.static ? klass : klass.prototype;
      const value = createFunc$1(node.value, scope);
      switch (node.kind) {
          case 'constructor':
              break;
          case 'method':
              define(obj, key, {
                  value,
                  writable: true,
                  configurable: true,
              });
              break;
          case 'get': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: value,
                  set: oriDptor && oriDptor.set,
                  configurable: true,
              });
              break;
          }
          case 'set': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: oriDptor && oriDptor.get,
                  set: value,
                  configurable: true,
              });
              break;
          }
          default:
              throw new SyntaxError('Unexpected token');
      }
  }

  function* Identifier$1(node, scope, options = {}) {
      const { getVar = false, throwErr = true } = options;
      if (node.name === 'undefined') {
          return undefined;
      }
      const variable = scope.find(node.name);
      if (variable) {
          return getVar ? variable : variable.get();
      }
      else if (throwErr) {
          throw new ReferenceError(`${node.name} is not defined`);
      }
      else {
          return undefined;
      }
  }

  var identifier$1 = /*#__PURE__*/Object.freeze({
    Identifier: Identifier$1
  });

  function* Literal$1(node, scope) {
      return node.value;
  }

  var literal$1 = /*#__PURE__*/Object.freeze({
    Literal: Literal$1
  });

  function* ThisExpression$1(node, scope) {
      return scope.find('this').get();
  }
  function* ArrayExpression$1(node, scope) {
      let results = [];
      for (const index in node.elements) {
          const item = node.elements[index];
          if (item.type === 'SpreadElement') {
              results = results.concat(yield* SpreadElement$1(item, scope));
          }
          else {
              results.push(yield* evaluate$1(item, scope));
          }
      }
      return results;
  }
  function* ObjectExpression$1(node, scope) {
      const object = {};
      for (const index in node.properties) {
          const property = node.properties[index];
          if (property.type === 'SpreadElement') {
              assign(object, yield* SpreadElement$1(property, scope));
          }
          else {
              let key;
              const propKey = property.key;
              if (property.computed) {
                  key = yield* evaluate$1(propKey, scope);
              }
              else {
                  if (propKey.type === 'Identifier') {
                      key = propKey.name;
                  }
                  else {
                      key = '' + (yield* Literal$1(propKey, scope));
                  }
              }
              const value = yield* evaluate$1(property.value, scope);
              const propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  define(object, key, { get: value });
              }
              else {
                  define(object, key, { set: value });
              }
          }
      }
      return object;
  }
  function* FunctionExpression$1(node, scope) {
      return createFunc(node, scope);
  }
  function* UnaryExpression$1(node, scope) {
      const arg = node.argument;
      switch (node.operator) {
          case '+':
              return +(yield* evaluate$1(arg, scope));
          case '-':
              return -(yield* evaluate$1(arg, scope));
          case '!':
              return !(yield* evaluate$1(arg, scope));
          case '~':
              return ~(yield* evaluate$1(arg, scope));
          case 'void':
              return void (yield* evaluate$1(arg, scope));
          case 'typeof':
              if (arg.type === 'Identifier') {
                  return typeof (yield* Identifier$1(arg, scope, { throwErr: false }));
              }
              else {
                  return typeof (yield* evaluate$1(arg, scope));
              }
          case 'delete':
              if (arg.type === 'MemberExpression') {
                  const variable = yield* MemberExpression$1(arg, scope, { getVar: true });
                  return variable.del();
              }
              else if (arg.type === 'Identifier') {
                  const win = scope.global().find('window').get();
                  return delete win[arg.name];
              }
              else {
                  throw new SyntaxError('Unexpected token');
              }
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* UpdateExpression$1(node, scope) {
      const arg = node.argument;
      let variable;
      if (arg.type === 'Identifier') {
          variable = yield* Identifier$1(arg, scope, { getVar: true });
      }
      else if (arg.type === 'MemberExpression') {
          variable = yield* MemberExpression$1(arg, scope, { getVar: true });
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const value = variable.get();
      if (node.operator === '++') {
          variable.set(value + 1);
          return node.prefix ? variable.get() : value;
      }
      else if (node.operator === '--') {
          variable.set(value - 1);
          return node.prefix ? variable.get() : value;
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* BinaryExpression$1(node, scope) {
      const left = yield* evaluate$1(node.left, scope);
      const right = yield* evaluate$1(node.right, scope);
      const binaryOps = {
          '==': () => left == right,
          '!=': () => left != right,
          '===': () => left === right,
          '!==': () => left !== right,
          '<': () => left < right,
          '<=': () => left <= right,
          '>': () => left > right,
          '>=': () => left >= right,
          '<<': () => left << right,
          '>>': () => left >> right,
          '>>>': () => left >>> right,
          '+': () => left + right,
          '-': () => left - right,
          '*': () => left * right,
          '**': () => Math.pow(left, right),
          '/': () => left / right,
          '%': () => left % right,
          '|': () => left | right,
          '^': () => left ^ right,
          '&': () => left & right,
          'in': () => left in right,
          'instanceof': () => left instanceof right,
      };
      const handler = binaryOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* AssignmentExpression$1(node, scope) {
      const value = yield* evaluate$1(node.right, scope);
      const left = node.left;
      let variable;
      if (left.type === 'Identifier') {
          variable = yield* Identifier$1(left, scope, { getVar: true, throwErr: false });
          if (!variable) {
              const win = scope.global().find('window').get();
              variable = new Prop(win, left.name);
          }
      }
      else if (left.type === 'MemberExpression') {
          variable = yield* MemberExpression$1(left, scope, { getVar: true });
      }
      else {
          return yield* pattern$2(left, scope, { feed: value });
      }
      const assignOps = {
          '=': () => {
              variable.set(value);
              return variable.get();
          },
          '+=': () => {
              variable.set(variable.get() + value);
              return variable.get();
          },
          '-=': () => {
              variable.set(variable.get() - value);
              return variable.get();
          },
          '*=': () => {
              variable.set(variable.get() * value);
              return variable.get();
          },
          '/=': () => {
              variable.set(variable.get() / value);
              return variable.get();
          },
          '%=': () => {
              variable.set(variable.get() % value);
              return variable.get();
          },
          '**=': () => {
              variable.set(Math.pow(variable.get(), value));
              return variable.get();
          },
          '<<=': () => {
              variable.set(variable.get() << value);
              return variable.get();
          },
          '>>=': () => {
              variable.set(variable.get() >> value);
              return variable.get();
          },
          '>>>=': () => {
              variable.set(variable.get() >>> value);
              return variable.get();
          },
          '|=': () => {
              variable.set(variable.get() | value);
              return variable.get();
          },
          '^=': () => {
              variable.set(variable.get() ^ value);
              return variable.get();
          },
          '&=': () => {
              variable.set(variable.get() & value);
              return variable.get();
          },
      };
      const handler = assignOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* LogicalExpression$1(node, scope) {
      switch (node.operator) {
          case '||':
              return (yield* evaluate$1(node.left, scope)) || (yield* evaluate$1(node.right, scope));
          case '&&':
              return (yield* evaluate$1(node.left, scope)) && (yield* evaluate$1(node.right, scope));
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* MemberExpression$1(node, scope, options = {}) {
      const { getObj = false, getVar = false } = options;
      let object;
      if (node.object.type === 'Super') {
          object = yield* Super$1(node.object, scope, { getProto: true });
      }
      else {
          object = yield* evaluate$1(node.object, scope);
      }
      if (getObj) {
          if (node.object.type === 'Super') {
              return scope.find('this').get();
          }
          else {
              return object;
          }
      }
      let key;
      if (node.computed) {
          key = yield* evaluate$1(node.property, scope);
      }
      else {
          key = node.property.name;
      }
      if (getVar) {
          const setter = getSetter(object, key);
          if (node.object.type === 'Super' && setter) {
              const thisObject = scope.find('this').get();
              const privateKey = createSymbol(key);
              define(thisObject, privateKey, { set: setter });
              return new Prop(thisObject, privateKey);
          }
          else {
              return new Prop(object, key);
          }
      }
      else {
          const getter = getGetter(object, key);
          if (node.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
              return getter.call(thisObject);
          }
          else {
              return object[key];
          }
      }
  }
  function* ConditionalExpression$1(node, scope) {
      return (yield* evaluate$1(node.test, scope))
          ? (yield* evaluate$1(node.consequent, scope))
          : (yield* evaluate$1(node.alternate, scope));
  }
  function* CallExpression$1(node, scope) {
      let func;
      let object;
      if (node.callee.type === 'MemberExpression') {
          object = yield* MemberExpression$1(node.callee, scope, { getObj: true });
          let key;
          if (node.callee.computed) {
              key = yield* evaluate$1(node.callee.property, scope);
          }
          else {
              key = node.callee.property.name;
          }
          const getter = getGetter(object, key);
          if (node.callee.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
              func = getter.call(thisObject);
          }
          else {
              func = object[key];
          }
      }
      else {
          object = scope.find('this').get();
          func = yield* evaluate$1(node.callee, scope);
      }
      let args = [];
      for (const index in node.arguments) {
          const arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(yield* SpreadElement$1(arg, scope));
          }
          else {
              args.push(yield* evaluate$1(arg, scope));
          }
      }
      if (!func.apply) {
          throw new TypeError(`${func && func.name || func} is not a function`);
      }
      return func.apply(object, args);
  }
  function* NewExpression$1(node, scope) {
      const constructor = yield* evaluate$1(node.callee, scope);
      if (typeof constructor !== 'function') {
          let name;
          if (node.callee.type === 'Identifier') {
              name = node.callee.name;
          }
          else {
              try {
                  name = JSON.stringify(constructor);
              }
              catch (err) {
                  name = '' + constructor;
              }
          }
          throw new TypeError(`${name} is not a constructor`);
      }
      else if (constructor[ARROW]) {
          throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`);
      }
      let args = [];
      for (const index in node.arguments) {
          const arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(yield* SpreadElement$1(arg, scope));
          }
          else {
              args.push(yield* evaluate$1(arg, scope));
          }
      }
      return new constructor(...args);
  }
  function* SequenceExpression$1(node, scope) {
      let result;
      for (const index in node.expressions) {
          result = yield* evaluate$1(node.expressions[index], scope);
      }
      return result;
  }
  function* ArrowFunctionExpression$1(node, scope) {
      return createFunc(node, scope);
  }
  function* TemplateLiteral$1(node, scope) {
      const quasis = node.quasis;
      const expressions = node.expressions;
      let result = '';
      let temEl;
      let expr;
      while (temEl = quasis.shift()) {
          result += yield* TemplateElement$1(temEl, scope);
          expr = expressions.shift();
          if (expr) {
              result += yield* evaluate$1(expr, scope);
          }
      }
      return result;
  }
  function* TaggedTemplateExpression$1(node, scope) {
      const tagFunc = yield* evaluate$1(node.tag, scope);
      const quasis = node.quasi.quasis;
      const str = quasis.map(v => v.value.cooked);
      const raw = quasis.map(v => v.value.raw);
      define(str, 'raw', {
          value: freeze(raw)
      });
      const expressions = node.quasi.expressions;
      const args = [];
      if (expressions) {
          for (const index in expressions) {
              args.push(yield* evaluate$1(expressions[index], scope));
          }
      }
      return tagFunc(freeze(str), ...args);
  }
  function* TemplateElement$1(node, scope) {
      return node.value.raw;
  }
  function* ClassExpression$1(node, scope) {
      return yield* createClass(node, scope);
  }
  function* Super$1(node, scope, options = {}) {
      const { getProto = false } = options;
      const superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function* SpreadElement$1(node, scope) {
      return yield* evaluate$1(node.argument, scope);
  }
  function* YieldExpression(node, scope) {
      const res = yield* evaluate$1(node.argument, scope);
      return node.delegate ? yield* res : yield res;
  }
  function* AwaitExpression(node, scope) {
      AWAIT.RES = yield* evaluate$1(node.argument, scope);
      return yield AWAIT;
  }

  var expression$1 = /*#__PURE__*/Object.freeze({
    ThisExpression: ThisExpression$1,
    ArrayExpression: ArrayExpression$1,
    ObjectExpression: ObjectExpression$1,
    FunctionExpression: FunctionExpression$1,
    UnaryExpression: UnaryExpression$1,
    UpdateExpression: UpdateExpression$1,
    BinaryExpression: BinaryExpression$1,
    AssignmentExpression: AssignmentExpression$1,
    LogicalExpression: LogicalExpression$1,
    MemberExpression: MemberExpression$1,
    ConditionalExpression: ConditionalExpression$1,
    CallExpression: CallExpression$1,
    NewExpression: NewExpression$1,
    SequenceExpression: SequenceExpression$1,
    ArrowFunctionExpression: ArrowFunctionExpression$1,
    TemplateLiteral: TemplateLiteral$1,
    TaggedTemplateExpression: TaggedTemplateExpression$1,
    TemplateElement: TemplateElement$1,
    ClassExpression: ClassExpression$1,
    Super: Super$1,
    SpreadElement: SpreadElement$1,
    YieldExpression: YieldExpression,
    AwaitExpression: AwaitExpression
  });

  function* ObjectPattern$1(node, scope, options = {}) {
      const { kind = 'let', hoist = false, feed = {} } = options;
      const fedKeys = [];
      for (const index in node.properties) {
          const property = node.properties[index];
          const value = property.value;
          if (hoist) {
              if (kind === 'var') {
                  if (value.type === 'Identifier') {
                      scope.var(value.name);
                  }
                  else {
                      yield* pattern$2(value, scope, { kind, hoist });
                  }
              }
          }
          else if (property.type === 'Property') {
              let key;
              if (property.computed) {
                  key = yield* evaluate$1(property.key, scope);
              }
              else {
                  key = property.key.name;
              }
              fedKeys.push(key);
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  yield* pattern$2(value, scope, { kind, feed: feed[key] });
              }
          }
          else {
              const rest = assign({}, feed);
              for (const index in fedKeys) {
                  delete rest[fedKeys[index]];
              }
              yield* RestElement$1(property, scope, { kind, feed: rest });
          }
      }
  }
  function* ArrayPattern$1(node, scope, options = {}) {
      const { kind, hoist = false, feed = [] } = options;
      const result = [];
      for (let i = 0; i < node.elements.length; i++) {
          const element = node.elements[i];
          if (hoist) {
              if (kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope.var(element.name);
                  }
                  else {
                      yield* pattern$2(element, scope, { kind, hoist });
                  }
              }
          }
          else {
              if (element.type === 'Identifier') {
                  if (kind) {
                      scope[kind](element.name, feed[i]);
                  }
                  else {
                      const variable = yield* Identifier$1(element, scope, { getVar: true });
                      variable.set(feed[i]);
                      result.push(variable.get());
                  }
              }
              else if (element.type === 'RestElement') {
                  yield* RestElement$1(element, scope, { kind, feed: feed.slice(i) });
              }
              else {
                  yield* pattern$2(element, scope, { kind, feed: feed[i] });
              }
          }
      }
      if (result.length) {
          return result;
      }
  }
  function* RestElement$1(node, scope, options = {}) {
      const { kind, hoist = false, feed = [] } = options;
      const arg = node.argument;
      if (hoist) {
          if (kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope.var(arg.name);
              }
              else {
                  yield* pattern$2(arg, scope, { kind, hoist });
              }
          }
      }
      else {
          if (arg.type === 'Identifier') {
              if (kind) {
                  scope[kind](arg.name, feed);
              }
              else {
                  const variable = yield* Identifier$1(arg, scope, { getVar: true });
                  variable.set(feed);
              }
          }
          else {
              yield* pattern$2(arg, scope, { kind, feed });
          }
      }
  }
  function* AssignmentPattern$1(node, scope) {
      const feed = yield* evaluate$1(node.right, scope);
      if (node.left.type === 'Identifier') {
          scope.let(node.left.name, feed);
      }
      else {
          yield* pattern$2(node.left, scope, { feed });
      }
  }

  var pattern$1 = /*#__PURE__*/Object.freeze({
    ObjectPattern: ObjectPattern$1,
    ArrayPattern: ArrayPattern$1,
    RestElement: RestElement$1,
    AssignmentPattern: AssignmentPattern$1
  });

  function* Program$1(program, scope) {
      for (const index in program.body) {
          yield* evaluate$1(program.body[index], scope);
      }
  }

  var program$1 = /*#__PURE__*/Object.freeze({
    Program: Program$1
  });

  function* ExpressionStatement$1(node, scope) {
      yield* evaluate$1(node.expression, scope);
  }
  function* BlockStatement$1(block, scope, options = {}) {
      const { invasived = false, hoisted = false, } = options;
      const subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          yield* hoistFunc(block, subScope);
      }
      for (const index in block.body) {
          const result = yield* evaluate$1(block.body[index], subScope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function* EmptyStatement$1() {
  }
  function* DebuggerStatement$1() {
      debugger;
  }
  function* ReturnStatement$1(node, scope) {
      RETURN.RES = node.argument ? (yield* evaluate$1(node.argument, scope)) : undefined;
      return RETURN;
  }
  function* BreakStatement$1() {
      return BREAK;
  }
  function* ContinueStatement$1() {
      return CONTINUE;
  }
  function* IfStatement$1(node, scope) {
      if (yield* evaluate$1(node.test, scope)) {
          return yield* evaluate$1(node.consequent, scope);
      }
      else {
          return yield* evaluate$1(node.alternate, scope);
      }
  }
  function* SwitchStatement$1(node, scope) {
      const discriminant = yield* evaluate$1(node.discriminant, scope);
      let matched = false;
      for (const index in node.cases) {
          const eachCase = node.cases[index];
          if (!matched
              && (!eachCase.test
                  || (yield* evaluate$1(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              const result = yield* SwitchCase$1(eachCase, scope);
              if (result === BREAK || result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function* SwitchCase$1(node, scope) {
      for (const index in node.consequent) {
          const result = yield* evaluate$1(node.consequent[index], scope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function* ThrowStatement$1(node, scope) {
      throw yield* evaluate$1(node.argument, scope);
  }
  function* TryStatement$1(node, scope) {
      try {
          return yield* BlockStatement$1(node.block, scope);
      }
      catch (err) {
          if (node.handler) {
              const subScope = new Scope(scope);
              const param = node.handler.param;
              if (param) {
                  if (param.type === 'Identifier') {
                      const name = param.name;
                      subScope.let(name, err);
                  }
                  else {
                      yield* pattern$2(param, scope, { feed: err });
                  }
              }
              return yield* CatchClause$1(node.handler, subScope);
          }
          else {
              throw err;
          }
      }
      finally {
          if (node.finalizer) {
              return yield* BlockStatement$1(node.finalizer, scope);
          }
      }
  }
  function* CatchClause$1(node, scope) {
      return yield* BlockStatement$1(node.body, scope, { invasived: true });
  }
  function* WhileStatement$1(node, scope) {
      while (yield* evaluate$1(node.test, scope)) {
          const result = yield* evaluate$1(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* DoWhileStatement$1(node, scope) {
      do {
          const result = yield* evaluate$1(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      } while (yield* evaluate$1(node.test, scope));
  }
  function* ForStatement$1(node, scope) {
      const forScope = new Scope(scope);
      for (yield* evaluate$1(node.init, forScope); node.test ? (yield* evaluate$1(node.test, forScope)) : true; yield* evaluate$1(node.update, forScope)) {
          const subScope = new Scope(forScope);
          let result;
          if (node.body.type === 'BlockStatement') {
              result = yield* BlockStatement$1(node.body, subScope, { invasived: true });
          }
          else {
              result = yield* evaluate$1(node.body, subScope);
          }
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* ForInStatement$1(node, scope) {
      for (const value in yield* evaluate$1(node.right, scope)) {
          const result = yield* ForXHandler(node, scope, { value });
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* ForOfStatement$1(node, scope) {
      const right = yield* evaluate$1(node.right, scope);
      if (node.await) {
          const iterator = getIterator(right);
          let ret;
          for (AWAIT.RES = iterator.next(), ret = yield AWAIT; !ret.done; AWAIT.RES = iterator.next(), ret = yield AWAIT) {
              const result = yield* ForXHandler(node, scope, { value: ret.value });
              if (result === BREAK) {
                  break;
              }
              else if (result === CONTINUE) {
                  continue;
              }
              else if (result === RETURN) {
                  return result;
              }
          }
      }
      else {
          for (const value of right) {
              const result = yield* ForXHandler(node, scope, { value });
              if (result === BREAK) {
                  break;
              }
              else if (result === CONTINUE) {
                  continue;
              }
              else if (result === RETURN) {
                  return result;
              }
          }
      }
  }

  var statement$1 = /*#__PURE__*/Object.freeze({
    ExpressionStatement: ExpressionStatement$1,
    BlockStatement: BlockStatement$1,
    EmptyStatement: EmptyStatement$1,
    DebuggerStatement: DebuggerStatement$1,
    ReturnStatement: ReturnStatement$1,
    BreakStatement: BreakStatement$1,
    ContinueStatement: ContinueStatement$1,
    IfStatement: IfStatement$1,
    SwitchStatement: SwitchStatement$1,
    SwitchCase: SwitchCase$1,
    ThrowStatement: ThrowStatement$1,
    TryStatement: TryStatement$1,
    CatchClause: CatchClause$1,
    WhileStatement: WhileStatement$1,
    DoWhileStatement: DoWhileStatement$1,
    ForStatement: ForStatement$1,
    ForInStatement: ForInStatement$1,
    ForOfStatement: ForOfStatement$1
  });

  const evaluateOps$1 = assign({}, declaration$1, expression$1, identifier$1, literal$1, pattern$1, program$1, statement$1);
  function* evaluate$1(node, scope) {
      if (!node)
          return;
      const handler = evaluateOps$1[node.type];
      if (handler) {
          return yield* handler(node, scope);
      }
      else {
          throw new Error(`${node.type} isn't implemented`);
      }
  }

  function* FunctionDeclaration$1(node, scope) {
      scope.func(node.id.name, createFunc(node, scope));
  }
  function* VariableDeclaration$1(node, scope, options = {}) {
      for (const index in node.declarations) {
          yield* VariableDeclarator$1(node.declarations[index], scope, assign({ kind: node.kind }, options));
      }
  }
  function* VariableDeclarator$1(node, scope, options = {}) {
      const { kind = 'let', hoist = false, feed } = options;
      if (hoist) {
          if (kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope.var(node.id.name);
              }
              else {
                  yield* pattern$2(node.id, scope, { kind, hoist });
              }
          }
      }
      else if (kind === 'var'
          || kind === 'let'
          || kind === 'const') {
          const value = hasOwn(options, 'feed') ? feed : yield* evaluate$1(node.init, scope);
          if (node.id.type === 'Identifier') {
              const name = node.id.name;
              if (kind === 'var' && !node.init) {
                  scope.var(name, NOINIT);
              }
              else {
                  scope[kind](name, value);
              }
              if (node.init &&
                  [
                      'FunctionExpression',
                      'ArrowFunctionExpression'
                  ].indexOf(node.init.type) !== -1
                  && !value.name) {
                  define(value, 'name', {
                      value: name,
                      configurable: true
                  });
              }
          }
          else {
              yield* pattern$2(node.id, scope, { kind, feed: value });
          }
      }
      else {
          throw new SyntaxError('Unexpected identifier');
      }
  }
  function* ClassDeclaration$1(node, scope) {
      scope.func(node.id.name, yield* createClass(node, scope));
  }
  function* ClassBody$1(node, scope, options = {}) {
      const { klass = function () { } } = options;
      for (const index in node.body) {
          yield* MethodDefinition$1(node.body[index], scope, { klass });
      }
  }
  function* MethodDefinition$1(node, scope, options = {}) {
      const { klass = function () { } } = options;
      let key;
      if (node.computed) {
          key = yield* evaluate$1(node.key, scope);
      }
      else if (node.key.type === 'Identifier') {
          key = node.key.name;
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const obj = node.static ? klass : klass.prototype;
      const value = createFunc(node.value, scope);
      switch (node.kind) {
          case 'constructor':
              break;
          case 'method':
              define(obj, key, {
                  value,
                  writable: true,
                  configurable: true,
              });
              break;
          case 'get': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: value,
                  set: oriDptor && oriDptor.set,
                  configurable: true,
              });
              break;
          }
          case 'set': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: oriDptor && oriDptor.get,
                  set: value,
                  configurable: true,
              });
              break;
          }
          default:
              throw new SyntaxError('Unexpected token');
      }
  }

  function* hoist(block, scope) {
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'ImportDeclaration'
              || statement.type === 'ExportNamedDeclaration'
              || statement.type === 'ExportDefaultDeclaration'
              || statement.type === 'ExportAllDeclaration') {
              continue;
          }
          if (statement.type === 'FunctionDeclaration') {
              yield* FunctionDeclaration$1(statement, scope);
          }
          else {
              yield* hoistVarRecursion(statement, scope);
          }
      }
  }
  function* hoistFunc(block, scope) {
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              yield* FunctionDeclaration$1(statement, scope);
          }
      }
  }
  function* hoistVarRecursion(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              yield* VariableDeclaration$1(statement, scope, { hoist: true });
              break;
          case 'WhileStatement':
          case 'DoWhileStatement':
          case 'ForStatement':
          case 'ForInStatement':
          case 'ForOfStatement':
              yield* hoistVarRecursion(statement.body, scope);
              break;
          case 'BlockStatement':
              for (const index in statement.body) {
                  yield* hoistVarRecursion(statement.body[index], scope);
              }
              break;
          case 'SwitchStatement':
              for (const index in statement.cases) {
                  for (const idx in statement.cases[index].consequent) {
                      yield* hoistVarRecursion(statement.cases[index].consequent[idx], scope);
                  }
              }
              break;
          case 'TryStatement': {
              const tryBlock = statement.block.body;
              for (const index in tryBlock) {
                  yield* hoistVarRecursion(tryBlock[index], scope);
              }
              const catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (const index in catchBlock) {
                      yield* hoistVarRecursion(catchBlock[index], scope);
                  }
              }
              const finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (const index in finalBlock) {
                      yield* hoistVarRecursion(finalBlock[index], scope);
                  }
              }
              break;
          }
      }
  }
  function* pattern$2(node, scope, options = {}) {
      switch (node.type) {
          case 'ObjectPattern':
              return yield* ObjectPattern$1(node, scope, options);
          case 'ArrayPattern':
              return yield* ArrayPattern$1(node, scope, options);
          case 'RestElement':
              return yield* RestElement$1(node, scope, options);
          case 'AssignmentPattern':
              return yield* AssignmentPattern$1(node, scope);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc(node, scope, options = {}) {
      if (!node.generator && !node.async) {
          return createFunc$1(node, scope, options);
      }
      const { superClass } = options;
      const params = node.params;
      const tmpFunc = function* (...args) {
          const subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              if (superClass) {
                  subScope.const(SUPER, superClass);
              }
          }
          for (let i = 0; i < params.length; i++) {
              const param = params[i];
              if (param.type === 'Identifier') {
                  subScope.let(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  yield* RestElement$1(param, subScope, { kind: 'let', feed: args.slice(i) });
              }
              else {
                  yield* pattern$2(param, subScope, { feed: args[i] });
              }
          }
          let result;
          if (node.body.type === 'BlockStatement') {
              yield* hoist(node.body, subScope);
              result = yield* BlockStatement$1(node.body, subScope, {
                  invasived: true,
                  hoisted: true
              });
          }
          else {
              result = yield* evaluate$1(node.body, subScope);
              if (node.type === 'ArrowFunctionExpression') {
                  RETURN.RES = result;
                  result = RETURN;
              }
          }
          if (result === RETURN) {
              return result.RES;
          }
      };
      let func;
      if (node.async && node.generator) {
          func = function (...args) {
              const iterator = tmpFunc(args);
              let last = Promise.resolve();
              const run = (opts) => last = last.then(() => runAsync(iterator, assign({ full: true }, opts)));
              const asyncIterator = {
                  next: (res) => run({ res }),
                  throw: (err) => run({ err }),
                  return: (ret) => run({ ret })
              };
              if (typeof Symbol === 'function') {
                  asyncIterator[Symbol.iterator] = function () { return this; };
              }
              return asyncIterator;
          };
      }
      else if (node.async) {
          func = (...args) => runAsync(tmpFunc(args));
          if (node.type === 'ArrowFunctionExpression') {
              define(func, ARROW, { value: true });
          }
      }
      else {
          func = tmpFunc;
      }
      define(func, 'name', {
          value: node.id
              && node.id.name
              || '',
          configurable: true
      });
      define(func, 'length', {
          value: params.length,
          configurable: true
      });
      return func;
  }
  function* createClass(node, scope) {
      const superClass = yield* evaluate$1(node.superClass, scope);
      let klass = function () { };
      const methodBody = node.body.body;
      for (const index in methodBody) {
          const method = methodBody[index];
          if (method.kind === 'constructor') {
              klass = yield* createFunc(method.value, scope, { superClass });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      yield* ClassBody$1(node.body, scope, { klass });
      define(klass, 'name', {
          value: node.id.name,
          configurable: true
      });
      return klass;
  }
  function* ForXHandler(node, scope, options) {
      const { value } = options;
      const left = node.left;
      const subScope = new Scope(scope);
      if (left.type === 'VariableDeclaration') {
          yield* VariableDeclaration$1(left, subScope, { feed: value });
      }
      else if (left.type === 'Identifier') {
          const variable = yield* Identifier(left, scope, { getVar: true });
          variable.set(value);
      }
      else {
          yield* pattern$2(left, scope, { feed: value });
      }
      let result;
      if (node.body.type === 'BlockStatement') {
          result = yield* BlockStatement$1(node.body, subScope, { invasived: true });
      }
      else {
          result = yield* evaluate$1(node.body, subScope);
      }
      return result;
  }

  function hoist$1(block, scope) {
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'ImportDeclaration'
              || statement.type === 'ExportNamedDeclaration'
              || statement.type === 'ExportDefaultDeclaration'
              || statement.type === 'ExportAllDeclaration') {
              continue;
          }
          if (statement.type === 'FunctionDeclaration') {
              FunctionDeclaration(statement, scope);
          }
          else {
              hoistVarRecursion$1(statement, scope);
          }
      }
  }
  function hoistFunc$1(block, scope) {
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              FunctionDeclaration(statement, scope);
          }
      }
  }
  function hoistVarRecursion$1(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              VariableDeclaration(statement, scope, { hoist: true });
              break;
          case 'WhileStatement':
          case 'DoWhileStatement':
          case 'ForStatement':
          case 'ForInStatement':
          case 'ForOfStatement':
              hoistVarRecursion$1(statement.body, scope);
              break;
          case 'BlockStatement':
              for (const index in statement.body) {
                  hoistVarRecursion$1(statement.body[index], scope);
              }
              break;
          case 'SwitchStatement':
              for (const index in statement.cases) {
                  for (const idx in statement.cases[index].consequent) {
                      hoistVarRecursion$1(statement.cases[index].consequent[idx], scope);
                  }
              }
              break;
          case 'TryStatement': {
              const tryBlock = statement.block.body;
              for (const index in tryBlock) {
                  hoistVarRecursion$1(tryBlock[index], scope);
              }
              const catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (const index in catchBlock) {
                      hoistVarRecursion$1(catchBlock[index], scope);
                  }
              }
              const finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (const index in finalBlock) {
                      hoistVarRecursion$1(finalBlock[index], scope);
                  }
              }
              break;
          }
      }
  }
  function pattern$3(node, scope, options = {}) {
      switch (node.type) {
          case 'ObjectPattern':
              return ObjectPattern(node, scope, options);
          case 'ArrayPattern':
              return ArrayPattern(node, scope, options);
          case 'RestElement':
              return RestElement(node, scope, options);
          case 'AssignmentPattern':
              return AssignmentPattern(node, scope);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc$1(node, scope, options = {}) {
      if (node.generator || node.async) {
          return createFunc(node, scope, options);
      }
      const { superClass } = options;
      const params = node.params;
      const tmpFunc = function (...args) {
          const subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              if (superClass) {
                  subScope.const(SUPER, superClass);
              }
          }
          for (let i = 0; i < params.length; i++) {
              const param = params[i];
              if (param.type === 'Identifier') {
                  subScope.let(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  RestElement(param, subScope, { kind: 'let', feed: args.slice(i) });
              }
              else {
                  pattern$3(param, subScope, { feed: args[i] });
              }
          }
          let result;
          if (node.body.type === 'BlockStatement') {
              hoist$1(node.body, subScope);
              result = BlockStatement(node.body, subScope, {
                  invasived: true,
                  hoisted: true
              });
          }
          else {
              result = evaluate(node.body, subScope);
              if (node.type === 'ArrowFunctionExpression') {
                  RETURN.RES = result;
                  result = RETURN;
              }
          }
          if (result === RETURN) {
              return result.RES;
          }
      };
      let func = tmpFunc;
      if (node.type === 'ArrowFunctionExpression') {
          define(func, ARROW, { value: true });
      }
      define(func, 'name', {
          value: node.id
              && node.id.name
              || '',
          configurable: true
      });
      define(func, 'length', {
          value: params.length,
          configurable: true
      });
      return func;
  }
  function createClass$1(node, scope) {
      const superClass = evaluate(node.superClass, scope);
      let klass = function () { };
      const methodBody = node.body.body;
      for (const index in methodBody) {
          const method = methodBody[index];
          if (method.kind === 'constructor') {
              klass = createFunc$1(method.value, scope, { superClass });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      ClassBody(node.body, scope, { klass });
      define(klass, 'name', {
          value: node.id.name,
          configurable: true
      });
      return klass;
  }
  function ForXHandler$1(node, scope, options) {
      const { value } = options;
      const left = node.left;
      const subScope = new Scope(scope);
      if (left.type === 'VariableDeclaration') {
          VariableDeclaration(left, subScope, { feed: value });
      }
      else if (left.type === 'Identifier') {
          const variable = Identifier(left, scope, { getVar: true });
          variable.set(value);
      }
      else {
          pattern$3(left, scope, { feed: value });
      }
      let result;
      if (node.body.type === 'BlockStatement') {
          result = BlockStatement(node.body, subScope, { invasived: true });
      }
      else {
          result = evaluate(node.body, subScope);
      }
      return result;
  }

  class Sval {
      constructor(options = {}) {
          this.options = {};
          this.scope = new Scope(null, true);
          this.exports = {};
          let { ecmaVer = 9, sandBox = true } = options;
          ecmaVer -= ecmaVer < 2015 ? 0 : 2009;
          if ([3, 5, 6, 7, 8, 9, 10].indexOf(ecmaVer) === -1) {
              throw new Error(`unsupported ecmaVer`);
          }
          this.options.ecmaVersion = ecmaVer;
          if (sandBox) {
              const win = createSandBox();
              this.scope.let('window', win);
              this.scope.let('this', win);
          }
          else {
              this.scope.let('window', globalObj);
              this.scope.let('this', globalObj);
          }
          this.scope.const('exports', this.exports = {});
      }
      import(nameOrModules, mod) {
          if (typeof nameOrModules === 'string') {
              nameOrModules = { [nameOrModules]: mod };
          }
          if (typeof nameOrModules !== 'object')
              return;
          const names = getOwnNames(nameOrModules);
          for (const index in names) {
              const name = names[index];
              this.scope.var(name, nameOrModules[name]);
          }
      }
      run(code) {
          const ast = acorn.parse(code, this.options);
          hoist$1(ast, this.scope);
          evaluate(ast, this.scope);
      }
  }
  Sval.version = version;

  return Sval;

}));
