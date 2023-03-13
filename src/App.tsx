import { useState } from 'react'
import { compute, OperationKey } from './calc'
import { Button } from './components/Button'
import { CalcButton } from './components/CalcButton'
import { Display } from './components/Display'

function App() {
  const [currentValue, setCurrentValue] = useState(0)
  const [label, setLabel] = useState('0')
  const [status, setStatus] = useState('')
  const [preClear, setPreClear] = useState(false)
  const [operation, setOperation] = useState<string | null>(null)

  function processInput(input: string) {
    if (label === '0' || preClear) {
      setCurrentValue(Number(label))
      setLabel(input)
      setPreClear(false)
    } else {
      setLabel(label + input)
    }
  }

  function processCommand(command: string) {
    if (command === '=') {
      if (operation === null) {
        return
      }

      const newValue = Number(label)

      const computed = compute(
        currentValue,
        newValue,
        operation as OperationKey
      )

      setCurrentValue(computed)

      setLabel(computed.toString())

      setOperation(null)
      setStatus('')
      setPreClear(true)
    } else {
      if (command === 'negate') {
        const value = Number(label)

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
    setCurrentValue(0)
    setOperation(null)
    setLabel('0')
    setStatus('')
    setPreClear(false)
  }

  return (
    <div className="bg-slate-800 border border-slate-400 p-6">
      <Display status={status} value={label} />
      <div className="grid grid-cols-4 gap-1 mt-4">
        <Button onClick={clear}>AC</Button>
        <CalcButton onProcess={processCommand} value="negate" label="+/-" />
        <CalcButton onProcess={processCommand} value="%" />
        <CalcButton onProcess={processCommand} value="/" />
        <CalcButton onProcess={processInput} value="7" />
        <CalcButton onProcess={processInput} value="8" />
        <CalcButton onProcess={processInput} value="9" />
        <CalcButton onProcess={processCommand} value="x" />
        <CalcButton onProcess={processInput} value="4" />
        <CalcButton onProcess={processInput} value="5" />
        <CalcButton onProcess={processInput} value="6" />
        <CalcButton onProcess={processCommand} value="-" />
        <CalcButton onProcess={processInput} value="1" />
        <CalcButton onProcess={processInput} value="2" />
        <CalcButton onProcess={processInput} value="3" />
        <CalcButton onProcess={processCommand} value="+" />
        <CalcButton className="col-span-2" onProcess={processInput} value="0" />
        <CalcButton onProcess={processInput} value="." />
        <CalcButton onProcess={processCommand} value="=" />
      </div>
    </div>
  )
}

export default App
