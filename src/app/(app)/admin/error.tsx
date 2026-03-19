'use client'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-[#CC6222] mb-4">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error.message || 'An unexpected error occurred'}</p>
        <button onClick={reset} className="px-6 py-3 bg-[#CC6222] text-white rounded-lg hover:bg-[#CC6222]/90">
          Try Again
        </button>
      </div>
    </div>
  )
}
