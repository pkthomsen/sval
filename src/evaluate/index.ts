import { assign } from '../share/util'
import { Node } from 'acorn'
import Scope from '../scope'

import * as declaration from './declaration'
import * as expression from './expression'
import * as identifier from './identifier'
import * as statement from './statement'
import * as literal from './literal'
import * as pattern from './pattern'
/*<add>*//*import * as program from './program'*//*</add>*/

let evaluateOps: any

export default function* evaluate(node: Node, scope: Scope) {

  scope.entry();

//  console.log("eval", __cnt, __now, scope.global());

  if (!node) return

  // delay initalizing to remove circular reference issue for jest
  if (!evaluateOps) {
    evaluateOps = assign(
      {},
      declaration,
      expression,
      identifier,
      statement,
      literal,
      pattern,
      /*<add>*//*program*//*</add>*/
    )
  }

  const handler = evaluateOps[node.type]
  if (handler) {
    const res = yield* handler(node, scope);
    scope.exit();
    return res;

  } else {
    throw new Error(`${node.type} isn't implemented`)
  }
}
