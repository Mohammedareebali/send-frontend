export default function PerformanceLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto space-y-6">
        <div className="animate-pulse space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 bg-slate-700 rounded w-64"></div>
              <div className="h-4 bg-slate-700 rounded w-96"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-slate-700 rounded w-32"></div>
              <div className="h-10 bg-slate-700 rounded w-24"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-700 rounded w-20"></div>
                    <div className="h-8 bg-slate-700 rounded w-24"></div>
                    <div className="h-3 bg-slate-700 rounded w-32"></div>
                  </div>
                  <div className="h-12 w-12 bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="space-y-6">
            <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg w-fit">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-700 rounded w-32"></div>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 bg-slate-700 rounded flex-1"></div>
                <div className="h-10 bg-slate-700 rounded w-48"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-slate-700 rounded w-32"></div>
                        <div className="h-6 bg-slate-700 rounded w-20"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="space-y-1">
                            <div className="h-3 bg-slate-700 rounded w-16"></div>
                            <div className="h-5 bg-slate-700 rounded w-12"></div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-3 bg-slate-700 rounded w-24"></div>
                          <div className="h-3 bg-slate-700 rounded w-12"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
