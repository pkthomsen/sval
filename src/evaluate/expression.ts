import { define, freeze, getGetter, getSetter, createSymbol, assign, getDptor, WINDOW } from '../share/util'
import { SUPER, NOCTOR, AWAIT, CLSCTOR, NEWTARGET, SUPERCALL, PRIVATE, IMPORT } from '../share/const'
import { pattern, createFunc, createClass } from './helper'
import { Variable, Prop } from '../scope/variable'
import { Identifier } from './identifier'
import { Literal } from './literal'
import * as acorn from 'acorn'
import Scope from '../scope'
import evaluate from '.'

export function* ThisExpression(node: acorn.ThisExpression, scope: Scope) {
  const superCall = scope.find(SUPERCALL)
  if (superCall && !superCall.get()) {
    throw new ReferenceError('Must call super constructor in derived class '
      + 'before accessing \'this\' or returning from derived constructor')
  } else {
    return scope.find('this').get()
  }
}

export function* ArrayExpression(node: acorn.ArrayExpression, scope: Scope) {
  let results: any[] = []
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i]
    if (item.type === 'SpreadElement') {
      results = results.concat(yield* SpreadElement(item, scope))
    } else {
      results.push(yield* evaluate(item, scope))
    }
  }
  return results
}

export function* ObjectExpression(node: acorn.ObjectExpression, scope: Scope) {
  const object: { [key: string]: any } = {}
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i]
    if (property.type === 'SpreadElement') {
      assign(object, yield* SpreadElement(property, scope))
    } else {
      let key: string
      const propKey = property.key
      if (property.computed) {
        key = yield* evaluate(propKey, scope)
      } else {
        if (propKey.type === 'Identifier') {
          key = propKey.name
        } else {
          key = '' + (yield* Literal(propKey as acorn.Literal, scope))
        }
      }
  
      const value = yield* evaluate(property.value, scope)
  
      const propKind = property.kind
      if (propKind === 'init') {
        object[key] = value
      } else if (propKind === 'get') {
        const oriDptor = getDptor(object, key)
        define(object, key, {
          get: value,
          set: oriDptor && oriDptor.set,
          enumerable: true,
          configurable: true
        })
      } else { // propKind === 'set'
        const oriDptor = getDptor(object, key)
        define(object, key, {
          get: oriDptor && oriDptor.get,
          set: value,
          enumerable: true,
          configurable: true
        })
      }
    }
  }
  return object
}

export function* FunctionExpression(node: acorn.FunctionExpression, scope: Scope) {
  if (node.id && node.id.name) {
    // it's for accessing function expression by its name inside
    // e.g. const a = function b() { console.log(b) }
    const tmpScope = new Scope(scope)
    const func = createFunc(node, tmpScope)
    tmpScope.const(node.id.name, func)
    return func
  } else {
    return createFunc(node, scope)
  }
}

export function* UnaryExpression(node: acorn.UnaryExpression, scope: Scope) {
  const arg = node.argument
  switch (node.operator) {
    case '+': return +(yield* evaluate(arg, scope))
    case '-': return -(yield* evaluate(arg, scope))
    case '!': return !(yield* evaluate(arg, scope))
    case '~': return ~(yield* evaluate(arg, scope))
    case 'void': return void (yield* evaluate(arg, scope))
    case 'typeof':
      if (arg.type === 'Identifier') {
        return typeof (yield* Identifier(arg, scope, { throwErr: false }))
      } else {
        return typeof (yield* evaluate(arg, scope))
      }
    case 'delete':
      if (arg.type === 'MemberExpression') {
        const variable: Prop = yield* MemberExpression(arg, scope, { getVar: true })
        return variable.del()
      } else if (arg.type === 'Identifier') {
        throw new SyntaxError('Delete of an unqualified identifier in strict mode')
      } else {
        yield* evaluate(arg, scope)
        return true
      }
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function* UpdateExpression(node: acorn.UpdateExpression, scope: Scope) {
  const arg = node.argument
  
  let variable: Variable
  if (arg.type === 'Identifier') {
    variable = yield* Identifier(arg, scope, { getVar: true })
  } else if (arg.type === 'MemberExpression') {
    variable = yield* MemberExpression(arg, scope, { getVar: true })
  } else {
    /* istanbul ignore next */
    throw new SyntaxError('Unexpected token')
  }

  const value = variable.get()
  if (node.operator === '++') {
    variable.set(value + 1)
    return node.prefix ? variable.get() : value
  } else if (node.operator === '--') {
    variable.set(value - 1)
    return node.prefix ? variable.get() : value
  } else {
    /* istanbul ignore next */
    throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function* BinaryExpression(node: acorn.BinaryExpression, scope: Scope) {
  let left: any
  let right: any

  if (node.left.type === 'PrivateIdentifier') {
    left = node.left.name
    right = yield* evaluate(node.right, scope)
    right = right[PRIVATE]
  } else {
    left = yield* evaluate(node.left, scope)
    right = yield* evaluate(node.right, scope)
  }

  switch (node.operator) {
    case '==': return left == right
    case '!=': return left != right
    case '===': return left === right
    case '!==': return left !== right
    case '<': return left < right
    case '<=': return left <= right
    case '>': return left > right
    case '>=': return left >= right
    case '<<': return left << right
    case '>>': return left >> right
    case '>>>': return left >>> right
    case '+': return left + right
    case '-': return left - right
    case '*': return left * right
    case '**': return left ** right
    case '/': return left / right
    case '%': return left % right
    case '|': return left | right
    case '^': return left ^ right
    case '&': return left & right
    case 'in': return left in right
    case 'instanceof': return left instanceof right
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function* AssignmentExpression(node: acorn.AssignmentExpression, scope: Scope) {
  const left = node.left
  let variable: Variable
  if (left.type === 'Identifier') {
    variable = yield* Identifier(left, scope, { getVar: true, throwErr: false })
    if (!variable) {
      const win = scope.global().find('window').get()
      variable = new Prop(win, left.name, scope.ctrl)
    }
  } else if (left.type === 'MemberExpression') {
    variable = yield* MemberExpression(left, scope, { getVar: true })
  } else {
    const value = yield* evaluate(node.right, scope)
    return yield* pattern(left, scope, { feed: value })
  }

  const value = yield* evaluate(node.right, scope)
  switch (node.operator) {
    case '=': variable.set(value); return variable.get()
    case '+=': variable.set(variable.get() + value); return variable.get()
    case '-=': variable.set(variable.get() - value); return variable.get()
    case '*=': variable.set(variable.get() * value); return variable.get()
    case '/=': variable.set(variable.get() / value); return variable.get()
    case '%=': variable.set(variable.get() % value); return variable.get()
    case '**=': variable.set(variable.get() ** value); return variable.get()
    case '<<=': variable.set(variable.get() << value); return variable.get()
    case '>>=': variable.set(variable.get() >> value); return variable.get()
    case '>>>=': variable.set(variable.get() >>> value); return variable.get()
    case '|=': variable.set(variable.get() | value); return variable.get()
    case '^=': variable.set(variable.get() ^ value); return variable.get()
    case '&=': variable.set(variable.get() & value); return variable.get()
    case '??=': variable.set(variable.get() ?? value); return variable.get()
    case '&&=': variable.set(variable.get() && value); return variable.get()
    case '||=': variable.set(variable.get() || value); return variable.get()
    /* istanbul ignore next */
    default: throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export function* LogicalExpression(node: acorn.LogicalExpression, scope: Scope) {
  switch (node.operator) {
    case '||':
      return (yield* evaluate(node.left, scope)) || (yield* evaluate(node.right, scope))
    case '&&':
      return (yield* evaluate(node.left, scope)) && (yield* evaluate(node.right, scope))
    case '??':
      return (yield* evaluate(node.left, scope)) ?? (yield* evaluate(node.right, scope))
    default:
      /* istanbul ignore next */
      throw new SyntaxError(`Unexpected token ${node.operator}`)
  }
}

export interface MemberExpressionOptions {
  getObj?: boolean
  getVar?: boolean
}

export function* MemberExpression(
  node: acorn.MemberExpression,
  scope: Scope,
  options: MemberExpressionOptions = {},
) {
  const { getObj = false, getVar = false } = options

  let object: any
  if (node.object.type === 'Super') {
    object = yield* Super(node.object, scope, { getProto: true })
  } else {
    object = yield* evaluate(node.object, scope)
  }

  if (getObj) return object

  let key: string
  let priv: boolean = false

  if (node.computed) {
    key = yield* evaluate(node.property, scope)
  } else if (node.property.type === 'PrivateIdentifier') {
    key = node.property.name
    priv = true
  } else {
    key = (node.property as acorn.Identifier).name
  }

  if (priv) {
    object = object[PRIVATE]
  }

  if (getVar) {
    // left value
    const setter = getSetter(object, key, scope.ctrl)
    if (node.object.type === 'Super' && setter) {
      // transfer the setter from super to this with a private key
      const thisObject = scope.find('this').get()
      const privateKey = createSymbol(key)
      define(thisObject, privateKey, { set: setter })
      return new Prop(thisObject, privateKey, scope.ctrl)
    } else {
      return new Prop(object, key, scope.ctrl)
    }
  } else {
    // right value
    const getter = getGetter(object, key, scope.ctrl)
    if (node.object.type === 'Super' && getter) {
      const thisObject = scope.find('this').get()
      // if it's optional chaining, check if this ref is null or undefined, so use ==
      if (node.optional && thisObject == null) {
        return undefined
      }
      return getter.call(thisObject)
    } else {
      // if it's optional chaining, check if object is null or undefined, so use ==
      if (node.optional && object == null) {
        return undefined
      }
      return object[key]
    }
  }
}

export function* ConditionalExpression(node: acorn.ConditionalExpression, scope: Scope) {
  return (yield* evaluate(node.test, scope))
    ? (yield* evaluate(node.consequent, scope))
    : (yield* evaluate(node.alternate, scope))
}

export function* CallExpression(node: acorn.CallExpression, scope: Scope) {
  let func: any
  let object: any

  if (node.callee.type === 'MemberExpression') {
    object = yield* MemberExpression(node.callee, scope, { getObj: true })

    // if it's optional chaining, check if object is null or undefined, so use ==
    if (node.callee.optional && object == null) {
      return undefined
    }

    // get key
    let key: string
    let priv: boolean = false

    if (node.callee.computed) {
      key = yield* evaluate(node.callee.property, scope)
    } else if (node.callee.property.type === 'PrivateIdentifier') {
      key = node.callee.property.name
      priv = true
    } else {
      key = (node.callee.property as acorn.Identifier).name
    }

    let obj = object

    if (priv) {
      obj = obj[PRIVATE]
    }

    // right value
    if (node.callee.object.type === 'Super') {
      const thisObject = scope.find('this').get()
      func = obj[key].bind(thisObject)
    } else {
      func = obj[key]
    }

    // if it's optional chaining, check if function is null or undefined, so use ==
    if (node.optional && func == null) {
      return undefined
    }

    if (typeof func !== 'function') {
      throw new TypeError(`${key} is not a function`)
    } else if (func[CLSCTOR]) {
      throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`)
    }
  } else {
    object = scope.find('this').get()
    func = yield* evaluate(node.callee, scope)

    // if it's optional chaining, check if function is null or undefined, so use ==
    if (node.optional && func == null) {
      return undefined
    }

    if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
      let name: string
      if (node.callee.type === 'Identifier') {
        name = node.callee.name
      } else {
        try {
          name = JSON.stringify(func)
        } catch (err) {
          name = '' + func
        }
      }
      if (typeof func !== 'function') {
        throw new TypeError(`${name} is not a function`)
      } else {
        throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`)
      }
    }
  }

  if (scope.ctrl.interceptFunction.includes(func)) {
    const idx = scope.ctrl.interceptFunction.findIndex(p => p === func);
    func = scope.ctrl.interceptFunctionReplace[idx];
    if (!func) {
      throw new Error("calling function '" + scope.ctrl.interceptFunctionName[idx] + "' not allowed");
    }
  }

  let args: any[] = []
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
      args = args.concat(yield* SpreadElement(arg, scope))
    } else {
      args.push(yield* evaluate(arg, scope))
    }
  }

  if (node.callee.type === 'Super') {
    const superCall = scope.find(SUPERCALL)
    if (superCall.get()) {
      throw new ReferenceError('Super constructor may only be called once')
    } else {
      scope.find(SUPERCALL).set(true)
    }
  }

  if (object && object[WINDOW] && func.toString().indexOf('[native code]') !== -1) {
    // you will get "TypeError: Illegal invocation" if not binding native function with window
    return func.apply(object[WINDOW], args)
  }

  return func.apply(object, args)
}

export function* NewExpression(node: acorn.NewExpression, scope: Scope) {
  const constructor = yield* evaluate(node.callee, scope)

  if (typeof constructor !== 'function') {
    let name: string
    if (node.callee.type === 'Identifier') {
      name = node.callee.name
    } else {
      try {
        name = JSON.stringify(constructor)
      } catch (err) {
        name = '' + constructor
      }
    }
    throw new TypeError(`${name} is not a constructor`)
  } else if (constructor[NOCTOR]) {
    throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`)
  }

  let args: any[] = []
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i]
    if (arg.type === 'SpreadElement') {
      args = args.concat(yield* SpreadElement(arg, scope))
    } else {
      args.push(yield* evaluate(arg, scope))
    }
  }

  return new constructor(...args)
}

export function* MetaProperty(node: acorn.MetaProperty, scope: Scope) {
  if (node.meta.name === 'new' && node.property.name === 'target') {
    return scope.find(NEWTARGET).get()
  } else if (node.meta.name === 'import' && node.property.name === 'meta') {
    return { url: '' }
  }
}

export function* SequenceExpression(node: acorn.SequenceExpression, scope: Scope) {
  let result: any
  for (let i = 0; i < node.expressions.length; i++) {
    result = yield* evaluate(node.expressions[i], scope)
  }
  return result
}

export function* ArrowFunctionExpression(node: acorn.ArrowFunctionExpression, scope: Scope) {
  return createFunc(node, scope)
}

export function* TemplateLiteral(node: acorn.TemplateLiteral, scope: Scope) {
  const quasis = node.quasis.slice()
  const expressions = node.expressions.slice()

  let result = ''
  let temEl: acorn.TemplateElement
  let expr: acorn.Expression

  while (temEl = quasis.shift()) {
    result += yield* TemplateElement(temEl, scope)
    expr = expressions.shift()
    if (expr) {
      result += yield* evaluate(expr, scope)
    }
  }

  return result
}

export function* TaggedTemplateExpression(node: acorn.TaggedTemplateExpression, scope: Scope) {
  const tagFunc = yield* evaluate(node.tag, scope)

  const quasis = node.quasi.quasis
  const str = quasis.map(v => v.value.cooked)
  const raw = quasis.map(v => v.value.raw)

  define(str, 'raw', {
    value: freeze(raw)
  })

  const expressions = node.quasi.expressions

  const args = []
  if (expressions) {
    for (let i = 0; i < expressions.length; i++) {
      args.push(yield* evaluate(expressions[i], scope))
    }
  }

  return tagFunc(freeze(str), ...args)
}

export function* TemplateElement(node: acorn.TemplateElement, scope: Scope) {
  return node.value.raw
}

export function* ClassExpression(node: acorn.ClassExpression, scope: Scope) {
  if (node.id && node.id.name) {
    // it's for accessing class expression by its name inside
    // e.g. const a = class b { log() { console.log(b) } }
    const tmpScope = new Scope(scope)
    const klass = yield* createClass(node, tmpScope)
    tmpScope.const(node.id.name, klass)
    return klass
  } else {
    return yield* createClass(node, scope)
  }
}

export interface SuperOptions {
  getProto?: boolean
}

export function* Super(
  node: acorn.Super,
  scope: Scope,
  options: SuperOptions = {},
) {
  const { getProto = false } = options
  const superClass = scope.find(SUPER).get()
  return getProto ? superClass.prototype: superClass
}

export function* SpreadElement(node: acorn.SpreadElement, scope: Scope) {
  const result = yield* evaluate(node.argument, scope)
  return typeof result === 'string' ? [...result] : result; 
}

export function* ChainExpression(node: acorn.ChainExpression, scope: Scope) {
  return yield* evaluate(node.expression, scope)
}

export function* ImportExpression(node: acorn.ImportExpression, scope: Scope) {
  const globalScope = scope.global()

  const source = yield* evaluate(node.source, scope)
  const module = globalScope.find(IMPORT + source)
  let value: any
  if (module) {
    const result = module.get()
    if (result) {
      if (typeof result === 'function') {
        value = result()
      } else if (typeof result === 'object') {
        value = result
      }
    }
  }

  if (!value || typeof value !== 'object') {
    return Promise.reject(new TypeError(`Failed to resolve module specifier "${source}"`))
  }

  return Promise.resolve(value)
}

/*<remove>*/
export function* YieldExpression(node: acorn.YieldExpression, scope: Scope): any {
  const res = yield* evaluate(node.argument, scope)
  return node.delegate ? yield* res : yield res
}

export function* AwaitExpression(node: acorn.AwaitExpression, scope: Scope): any {
  AWAIT.RES = yield* evaluate(node.argument, scope)
  return yield AWAIT
}
/*</remove>*/
