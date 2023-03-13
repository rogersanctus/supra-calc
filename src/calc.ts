const operations = {
  '/': (left: number, right: number) => left / right,
  x: (left: number, right: number) => left * right,
  '-': (left: number, right: number) => left - right,
  '+': (left: number, right: number) => left + right,
}

export type OperationKey = keyof typeof operations

export function compute(left: number, right: number, operation: OperationKey) {
  if (operation in operations) {
    return operations[operation](left, right)
  }

  return 0
}
