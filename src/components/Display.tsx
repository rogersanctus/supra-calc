interface DisplayProps {
  status?: string
  value: string
}

export function Display({ status = '', value }: DisplayProps) {
  return (
    <div>
      <div className="flex items-center bg-slate-900 border border-slate-400 text-white text-right p-4 text-2xl">
        <span>{status}</span>
        <span className="ml-auto font-bold">{value}</span>
      </div>
    </div>
  )
}
