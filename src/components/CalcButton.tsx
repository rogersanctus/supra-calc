import { Button, ButtonProps } from './Button'

interface CalcButtonProps extends ButtonProps {
  label?: string
  value: string
  onProcess?: (value: string) => void
}

export function CalcButton({
  label,
  value,
  onProcess,
  ...rest
}: CalcButtonProps) {
  function doProcess(value: string) {
    if (onProcess && typeof onProcess === 'function') {
      onProcess(value)
    }
  }

  return (
    <Button {...rest} onClick={() => doProcess(value)}>
      {label ?? value}
    </Button>
  )
}
