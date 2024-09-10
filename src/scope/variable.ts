import { Ctrl } from "."

export type VarKind = 'var' | 'let' | 'const'

export interface Variable {
  get(): any,
  set(value: any): boolean,
}

export class Var implements Variable {
  readonly kind: VarKind
  private value: any

  constructor(kind: VarKind, value: any) {
    this.kind = kind
    this.value = value
  }

  get(): any {
    return this.value
  }

  set(value: any) {
    if (this.kind === 'const') {
      throw new TypeError('Assignment to constant variable')
    } else {
      return this.value = value
    }
  }
}

export class Prop implements Variable {
  private readonly object: any
  private readonly property: string
  private readonly ctrl: Ctrl;

  constructor(object: any, property: string, ctrl: Ctrl) {
    if (ctrl.noProto && (property === "prototype" || property === "__proto__")) {
      throw new Error("access to prototypes are not allowed");
    }

    this.object = object
    this.property = property;
    this.ctrl = ctrl;
  }

  get() {
    return this.object[this.property]
  }

  set(value: any) {
    if (this.ctrl.blackList.includes(this.object)) {
      const idx = this.ctrl.blackList.findIndex(p => p === this.object);
      throw new Error("object '" + this.ctrl.blackListNames[idx] + "' is readonly");
    }
    this.object[this.property] = value
    return true
  }

  del() {
    return delete this.object[this.property]
  }
}
