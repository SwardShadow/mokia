import { MOCKABLE } from './constants'
import { Invoker } from './invoker'
import { isClass } from './utils'

export type BaseType = boolean | number | string | null

export type Mockable<T = any> = { [P in keyof T]: BaseType | BaseType[] | Invoker | Mockable<T[P]> }

export function getMockable<T> (proto: T): Mockable<T> {
  if (!isClass(proto)) return proto as any

  const instance = new proto()
  const mockable = instance[MOCKABLE]

  return { ...instance, ...mockable }
}
