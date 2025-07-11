export default function InvoicingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-slate-700/50 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-slate-700/50 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-5 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="p-6 border-b border-slate-700/50">
            <div className="h-6 w-48 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
