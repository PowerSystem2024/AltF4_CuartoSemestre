
export function Button({children, className, ...props}) {
  return (
    <button className={`relative inline-flex items-center gap-1.5 bg-yellow-400 rounded-md px-3 py-1.5 text-sm
    font-semibold text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}{...props}>
    {children}</button>
  )
}

export default Button