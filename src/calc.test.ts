import { compute, OperationKey } from './calc'

const left = 31
const right = 70

describe('Calc module', () => {
  test('if compute function returns 0 after calling it with non existing operation', () => {
    const value = compute(left, right, 'NON_EXISTING' as OperationKey)

    expect(value).toBe(0)
  })

  test('the divide operation', () => {
    const value = compute(left, right, '/')

    expect(value).toBe(left / right)
  })

  test('the multiply operation', () => {
    const value = compute(left, right, 'x')

    expect(value).toBe(left * right)
  })

  test('the subtraction operation', () => {
    const value = compute(left, right, '-')

    expect(value).toBe(left - right)
  })

  test('the sum operation', () => {
    const value = compute(left, right, '+')

    expect(value).toBe(left + right)
  })
})
