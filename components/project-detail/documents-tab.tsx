"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, ImageIcon, File, Download, Eye, Trash2, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const documents = [
  {
    id: 1,
    name: "Architectural Plans - Floor 1",
    type: "Architectural Plans",
    section: "Design",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-15",
    fileSize: "2.4 MB",
    fileType: "PDF",
    description: "Detailed floor plan for the first level",
  },
  {
    id: 2,
    name: "Electrical Contract - Main",
    type: "Contracts",
    section: "Electrical",
    uploadedBy: "Mike Chen",
    uploadDate: "2024-02-03",
    fileSize: "856 KB",
    fileType: "PDF",
    description: "Signed contract with ElectroTech Pro",
  },
  {
    id: 3,
    name: "Foundation Invoice #001",
    type: "Invoices",
    section: "Civil Work",
    uploadedBy: "Emma Davis",
    uploadDate: "2024-02-16",
    fileSize: "124 KB",
    fileType: "PDF",
    description: "Invoice for foundation completion milestone",
  },
  {
    id: 4,
    name: "Building Permit",
    type: "Licenses",
    section: "General",
    uploadedBy: "David Wilson",
    uploadDate: "2024-01-08",
    fileSize: "445 KB",
    fileType: "PDF",
    description: "Official building permit from city hall",
  },
  {
    id: 5,
    name: "Progress Photos - Week 8",
    type: "Photos",
    section: "Civil Work",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-03-15",
    fileSize: "15.2 MB",
    fileType: "ZIP",
    description: "Weekly progress photos of construction site",
  },
  {
    id: 6,
    name: "HVAC System Specifications",
    type: "Technical Specs",
    section: "HVAC",
    uploadedBy: "Mike Chen",
    uploadDate: "2024-02-28",
    fileSize: "1.8 MB",
    fileType: "PDF",
    description: "Detailed specifications for HVAC installation",
  },
]

const documentTypes = [
  "All Types",
  "Architectural Plans",
  "Contracts",
  "Invoices",
  "Licenses",
  "Photos",
  "Technical Specs",
]

const sections = ["All Sections", "General", "Civil Work", "Electrical", "Design", "HVAC", "Gas"]

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-600" />
    case "zip":
      return <File className="h-5 w-5 text-gray-600" />
    case "jpg":
    case "png":
    case "jpeg":
      return <ImageIcon className="h-5 w-5 text-blue-600" />
    default:
      return <File className="h-5 w-5 text-gray-600" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Architectural Plans":
      return "bg-blue-100 text-blue-800"
    case "Contracts":
      return "bg-green-100 text-green-800"
    case "Invoices":
      return "bg-yellow-100 text-yellow-800"
    case "Licenses":
      return "bg-purple-100 text-purple-800"
    case "Photos":
      return "bg-pink-100 text-pink-800"
    case "Technical Specs":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function DocumentsTab() {
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [sectionFilter, setSectionFilter] = useState("All Sections")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter((doc) => {
    if (typeFilter !== "All Types" && doc.type !== typeFilter) return false
    if (sectionFilter !== "All Sections" && doc.section !== sectionFilter) return false
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const documentStats = {
    total: documents.length,
    byType: documentTypes.slice(1).reduce(
      (acc, type) => {
        acc[type] = documents.filter((doc) => doc.type === type).length
        return acc
      },
      {} as Record<string, number>,
    ),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Documents</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="document-name">Document Name</Label>
                <Input id="document-name" placeholder="Enter document name" />
              </div>
              <div>
                <Label htmlFor="document-type">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.slice(1).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="document-section">Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.slice(1).map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="document-description">Description</Label>
                <Textarea id="document-description" placeholder="Enter description" />
              </div>
              <div>
                <Label htmlFor="document-file">File</Label>
                <Input id="document-file" type="file" />
              </div>
              <Button className="w-full">Upload Document</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{documentStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{documentStats.byType["Contracts"] || 0}</div>
              <div className="text-sm text-muted-foreground">Contracts</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{documentStats.byType["Invoices"] || 0}</div>
              <div className="text-sm text-muted-foreground">Invoices</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{documentStats.byType["Licenses"] || 0}</div>
              <div className="text-sm text-muted-foreground">Licenses</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Documents</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.fileType)}
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                  </TableCell>
                  <TableCell>{doc.section}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.fileSize}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
