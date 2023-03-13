import { useState } from 'react'
import { Button } from './components/Button'
import { Display } from './components/Display'

const operations = {
  '/': (left: number, right: number) => left / right,
  x: (left: number, right: number) => left * right,
  '-': (left: number, right: number) => left - right,
  '+': (left: number, right: number) => left + right,
  '%': (left: number, right: number) => (right / 100) * left,
}

type OperationKey = keyof typeof operations

function App() {
  const [currentValue, setCurrentValue] = useState(0)
  const [label, setLabel] = useState('0')
  const [status, setStatus] = useState('')
  const [preClear, setPreClear] = useState(false)
  const [operation, setOperation] = useState<string | null>(null)

  function processInput(input: string) {
    console.log('processInput: ' + input)

    if (label === '0' || preClear) {
      setCurrentValue(Number(label))
      setLabel(input)
      setPreClear(false)
    } else {
      setLabel(label + input)
    }
  }

  function processCommand(command: string) {
    console.log('processCommand: ' + command)

    if (command === '=') {
      if (operation === null) {
        return
      }

      console.log('doing: ' + operation)
      const newValue = Number(label)
      console.log('values => left = ' + currentValue + '; right = ' + newValue)
      const computed = compute(
        currentValue,
        newValue,
        operation as OperationKey
      )

      console.log(computed)
      setCurrentValue(computed)
      console.log(currentValue)
      setLabel(computed.toString())

      setOperation(null)
      setStatus('')
      setPreClear(true)
    } else {
      if (command === 'negate') {
        const value = Number(label)
        console.log('negating... ' + value)
        const negatedValue = value * -1
        setLabel(negatedValue.toString())
      } else {
        setOperation(command)
        setStatus(command)
        setPreClear(true)
      }
    }
  }

  function clear() {
    console.log('clear')

    setCurrentValue(0)
    setOperation(null)
    setLabel('0')
    setStatus('')
    setPreClear(false)
  }

  function compute(left: number, right: number, operation: OperationKey) {
    if (operation in operations) {
      return operations[operation](left, right)
    }

    return 0
  }

  return (
    <div className="bg-slate-800 border border-slate-400 p-6">
      <Display status={status} value={label} />
      <div className="grid grid-cols-4 gap-1 mt-4">
        <Button onClick={clear}>AC</Button>
        <Button onClick={() => processCommand('negate')}>+/-</Button>
        <Button onClick={() => processCommand('%')}>%</Button>
        <Button onClick={() => processCommand('/')}>/</Button>
        <Button onClick={() => processInput('7')}>7</Button>
        <Button onClick={() => processInput('8')}>8</Button>
        <Button onClick={() => processInput('9')}>9</Button>
        <Button onClick={() => processCommand('x')}>x</Button>
        <Button onClick={() => processInput('4')}>4</Button>
        <Button onClick={() => processInput('5')}>5</Button>
        <Button onClick={() => processInput('6')}>6</Button>
        <Button onClick={() => processCommand('-')}>-</Button>
        <Button onClick={() => processInput('1')}>1</Button>
        <Button onClick={() => processInput('2')}>2</Button>
        <Button onClick={() => processInput('3')}>3</Button>
        <Button onClick={() => processCommand('+')}>+</Button>
        <Button className="col-span-2" onClick={() => processInput('0')}>
          0
        </Button>
        <Button onClick={() => processInput('.')}>.</Button>
        <Button onClick={() => processCommand('=')}> =</Button>
      </div>
    </div>
  )
}

export default App
