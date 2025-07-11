import { CommunicationHub } from "@/components/communication-hub"

export default function CommunicationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Communication Hub</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-slate-400">Incident reporting and contact management</p>
        </div>
      </div>
      <CommunicationHub />
    </div>
  )
}
