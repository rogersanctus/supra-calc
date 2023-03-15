interface DisplayProps {
  status?: string
  value: string
}

export function Display({ status = '', value }: DisplayProps) {
  return (
    <div data-testid="display">
      <div className="display__box flex items-center bg-slate-900 border border-slate-400 text-white text-right p-4 text-2xl">
        <span className="display__status">{status}</span>
        <span className="display__value ml-auto font-bold">{value}</span>
      </div>
    </div>
  )
}
