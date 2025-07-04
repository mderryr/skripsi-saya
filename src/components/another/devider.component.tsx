// NeonDivider.tsx
export const NeonDivider = () => {
  return (
    <div className="relative my-8 mb-12">
      <div className="h-px bg-gray-300 shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] dark:hidden"></div>
      <div className="hidden h-px dark:block bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent 
        shadow-[0_0_15px_2px_rggba(99,102,241,0.3)] 
        backdrop-blur-sm"></div>
    </div>
  )
}

