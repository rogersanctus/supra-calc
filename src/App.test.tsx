import { fireEvent, render } from '@testing-library/react'
import App from './App'

import * as calc from './calc'

const MIN_LENGTH_ACCEPTABLE = 12
const operations = ['+', '-', 'x', '/']
const numbers: string[] = ['.']
const leftNumbers = ['2', '8', '7']
const rightNumbers = ['5', '4']
const commands = ['AC', '+/-', '%', '=']
let buttons: HTMLElement[] = []

describe('App component', () => {
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      numbers.push(i.toString())
    }
  })

  test('if the calculator has all the buttons', () => {
    const { getAllByRole } = render(<App />)

    buttons = getAllByRole('button')

    const hasAllTheOperations = operations.every((op) =>
      buttons.some((button) => {
        return button.innerHTML === op
      })
    )

    const hasAllTheNumbers = numbers.every((num) =>
      buttons.some((button) => button.innerHTML === num)
    )

    const hasAllTheCommands = commands.every((cmd) =>
      buttons.some((button) => button.innerHTML === cmd)
    )

    expect(hasAllTheOperations).toBeTruthy()
    expect(hasAllTheNumbers).toBeTruthy()
    expect(hasAllTheCommands).toBeTruthy()
  })

  test('if number inputs updates the display', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const number1 = buttons.find((button) => button.innerHTML === '1')
    const number5 = buttons.find((button) => button.innerHTML === '5')
    const number9 = buttons.find((button) => button.innerHTML === '9')
    const number0 = buttons.find((button) => button.innerHTML === '0')
    const decSeparator = buttons.find((button) => button.innerHTML === '.')

    number1 && fireEvent.click(number1)
    number5 && fireEvent.click(number5)
    number0 && fireEvent.click(number0)
    decSeparator && fireEvent.click(decSeparator)
    number9 && fireEvent.click(number9)
    number1 && fireEvent.click(number1)

    expect(displayValue).not.toBeNull()
    expect(displayValue?.innerHTML).toBe('150.91')
  })

  test('if operations changes the display status', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayStatus = display.querySelector('.display__status')

    buttons = getAllByRole('button')
    const opButtons = buttons.filter((button) =>
      operations.some((op) => op === button.innerHTML)
    )

    opButtons.forEach((opButton) => {
      fireEvent.click(opButton)
      expect(displayStatus?.innerHTML).toBe(opButton.innerHTML)
    })
  })

  test('if the negate button (+/-) negates the current value on display', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')
    const negateButton = buttons.find((button) => button.innerHTML === '+/-')

    const descendingOrderNumbers = [...numbers].reverse()
    const numberButtons = descendingOrderNumbers
      .map((num) =>
        buttons.find(
          (button) => !isNaN(Number(num)) && button.innerHTML === num
        )
      )
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    numberButtons.forEach((numberButton) => {
      fireEvent.click(numberButton)
    })

    const numberBeforeNegate = Number(displayValue?.innerHTML)
    negateButton && fireEvent.click(negateButton)
    const numberAfterNegate = Number(displayValue?.innerHTML)

    expect(negateButton).not.toBeNull()
    expect(numberBeforeNegate).not.toBeNaN()
    expect(numberAfterNegate).toBe(numberBeforeNegate * -1)
  })

  test('if AC button clears the display', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayStatus = display.querySelector('.display__status')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')
    const button6 = buttons.find((button) => button.innerHTML === '6')
    const buttonSum = buttons.find((button) => button.innerHTML === '+')
    const acButton = buttons.find((button) => button.innerHTML === 'AC')

    if (button6 && buttonSum) {
      fireEvent.click(button6)
      fireEvent.click(buttonSum)
    }

    if (acButton) {
      fireEvent.click(acButton)
    }

    expect(displayStatus?.innerHTML).toBe('')
    expect(displayValue?.innerHTML).toBe('0')

    expect(button6).not.toBeNull()
    expect(buttonSum).not.toBeNull()
    expect(acButton).not.toBeNull()
  })

  test('if the equals command is ignored when there is no stacked operation', () => {
    const { getAllByRole } = render(<App />)
    const compute = jest.spyOn(calc, 'compute')

    buttons = getAllByRole('button')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    equalsButton && fireEvent.click(equalsButton)
    expect(compute).not.toBeCalled()
  })

  test('if the divide operation divides left value by the right value', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const divideButton = buttons.find((button) => button.innerHTML === '/')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    divideButton && fireEvent.click(divideButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(divideButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('5.3148148148')
  })

  test('if the multiplication operation multiplies the left value by the right value', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const multiplyButton = buttons.find((button) => button.innerHTML === 'x')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    multiplyButton && fireEvent.click(multiplyButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(multiplyButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('15498')
  })

  test('if the subtraction operation subtracts the right value from the left value', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const subtractButton = buttons.find((button) => button.innerHTML === '-')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    subtractButton && fireEvent.click(subtractButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(subtractButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('233')
  })

  test('if the sum operation sums the left value with the right value', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const sumButton = buttons.find((button) => button.innerHTML === '+')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    sumButton && fireEvent.click(sumButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(sumButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('341')
  })

  test('if the percentage operation works with the divide operation', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const divideButton = buttons.find((button) => button.innerHTML === '/')
    const percentageButton = buttons.find((button) => button.innerHTML === '%')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    divideButton && fireEvent.click(divideButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    percentageButton && fireEvent.click(percentageButton)
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(divideButton).not.toBeNull()
    expect(percentageButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('531.48148148')
  })

  test('if the percentage operation works with the sum operation', () => {
    const { getAllByRole, getByTestId } = render(<App />)
    const display = getByTestId('display')
    const displayValue = display.querySelector('.display__value')

    buttons = getAllByRole('button')

    const leftButtons = leftNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const rightButtons = rightNumbers
      .map((num) => buttons.find((button) => button.innerHTML === num))
      .filter(
        (button: HTMLElement | undefined): button is HTMLElement =>
          button !== undefined
      )

    const sumButton = buttons.find((button) => button.innerHTML === '+')
    const percentageButton = buttons.find((button) => button.innerHTML === '%')
    const equalsButton = buttons.find((button) => button.innerHTML === '=')

    leftButtons.forEach((button) => fireEvent.click(button))
    sumButton && fireEvent.click(sumButton)
    rightButtons.forEach((button) => fireEvent.click(button))
    percentageButton && fireEvent.click(percentageButton)
    equalsButton && fireEvent.click(equalsButton)

    const acceptableDisplay = displayValue?.innerHTML.substring(
      0,
      MIN_LENGTH_ACCEPTABLE
    )

    expect(sumButton).not.toBeNull()
    expect(percentageButton).not.toBeNull()
    expect(equalsButton).not.toBeNull()
    expect(acceptableDisplay).toBe('441.98')
  })
})
