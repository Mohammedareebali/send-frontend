import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Upload, Eye, Calendar, CheckCircle, AlertTriangle, Clock } from "lucide-react"

interface StaffDetailDocumentsProps {
  id: string
  type: "driver" | "pa"
}

export function StaffDetailDocuments({ id, type }: StaffDetailDocumentsProps) {
  // Mock data for documents
  const documents =
    type === "driver"
      ? [
          {
            id: "doc1",
            name: "DBS Certificate",
            type: "verification",
            issueDate: "2022-06-01",
            expiryDate: "2025-05-31",
            status: "valid",
            fileType: "pdf",
            fileSize: "2.4 MB",
            lastUpdated: "2022-06-05",
          },
          {
            id: "doc2",
            name: "Driving License",
            type: "license",
            issueDate: "2010-03-20",
            expiryDate: "2030-03-19",
            status: "valid",
            fileType: "pdf",
            fileSize: "1.8 MB",
            lastUpdated: "2022-01-10",
          },
          {
            id: "doc3",
            name: "PCO License",
            type: "license",
            issueDate: "2022-01-01",
            expiryDate: "2025-12-31",
            status: "valid",
            fileType: "pdf",
            fileSize: "3.2 MB",
            lastUpdated: "2022-01-05",
          },
          {
            id: "doc4",
            name: "Vehicle Insurance",
            type: "insurance",
            issueDate: "2023-01-01",
            expiryDate: "2023-12-31",
            status: "expiring",
            fileType: "pdf",
            fileSize: "4.1 MB",
            lastUpdated: "2023-01-03",
          },
          {
            id: "doc5",
            name: "Vehicle MOT Certificate",
            type: "certification",
            issueDate: "2023-03-15",
            expiryDate: "2024-03-14",
            status: "valid",
            fileType: "pdf",
            fileSize: "1.5 MB",
            lastUpdated: "2023-03-16",
          },
        ]
      : [
          {
            id: "doc1",
            name: "DBS Certificate",
            type: "verification",
            issueDate: "2022-04-15",
            expiryDate: "2025-04-14",
            status: "valid",
            fileType: "pdf",
            fileSize: "2.2 MB",
            lastUpdated: "2022-04-20",
          },
          {
            id: "doc2",
            name: "ID Verification",
            type: "identification",
            issueDate: "2021-05-01",
            expiryDate: "2031-05-01",
            status: "valid",
            fileType: "pdf",
            fileSize: "1.5 MB",
            lastUpdated: "2021-05-05",
          },
          {
            id: "doc3",
            name: "Training Certificate",
            type: "certification",
            issueDate: "2022-06-15",
            expiryDate: "2025-06-14",
            status: "valid",
            fileType: "pdf",
            fileSize: "2.8 MB",
            lastUpdated: "2022-06-20",
          },
          {
            id: "doc4",
            name: "First Aid Certificate",
            type: "certification",
            issueDate: "2022-01-10",
            expiryDate: "2024-01-09",
            status: "valid",
            fileType: "pdf",
            fileSize: "1.9 MB",
            lastUpdated: "2022-01-15",
          },
        ]

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="mr-2 h-5 w-5 text-yellow-500" />
          Documents & Certifications
        </CardTitle>
        <Button size="sm" className="gap-1 bg-yellow-500 hover:bg-yellow-600">
          <Upload className="h-4 w-4" />
          <span>Upload New</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface DocumentCardProps {
  document: {
    id: string
    name: string
    type: string
    issueDate: string
    expiryDate: string
    status: string
    fileType: string
    fileSize: string
    lastUpdated: string
  }
}

function DocumentCard({ document }: DocumentCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" /> Valid
          </Badge>
        )
      case "expiring":
        return (
          <Badge variant="warning" className="gap-1">
            <AlertTriangle className="h-3 w-3" /> Expiring Soon
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" /> Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getDocumentIcon = (fileType: string) => {
    return <FileText className="h-10 w-10 text-blue-500" />
  }

  const daysUntilExpiry = () => {
    const today = new Date()
    const expiry = new Date(document.expiryDate)
    const diffTime = Math.abs(expiry.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="mr-4 p-2 bg-blue-50 rounded-lg">{getDocumentIcon(document.fileType)}</div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-medium">{document.name}</h3>
            {getStatusBadge(document.status)}
          </div>
          <p className="text-sm text-gray-500 capitalize mt-1">{document.type}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-600">Issue Date: </span>
              <span className="ml-1 font-medium">{new Date(document.issueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-600">Expiry Date: </span>
              <span className="ml-1 font-medium">{new Date(document.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-600">Last Updated: </span>
              <span className="ml-1">{new Date(document.lastUpdated).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-gray-600">File Size: </span>
              <span className="ml-1">{document.fileSize}</span>
            </div>
          </div>

          {document.status === "expiring" && (
            <div className="mt-3 p-2 bg-yellow-50 text-yellow-800 text-sm rounded flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Expires in {daysUntilExpiry()} days. Please renew soon.</span>
            </div>
          )}

          <div className="flex mt-4 space-x-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Eye className="h-4 w-4" />
              <span>View</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 ml-auto">
              <Upload className="h-4 w-4" />
              <span>Update</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
