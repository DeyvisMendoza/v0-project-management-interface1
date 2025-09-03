"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Plus, Upload, Calendar, MapPin, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { OverviewTab } from "@/components/project-detail/overview-tab"
import { TechnicalSectionsTab } from "@/components/project-detail/technical-sections-tab"
import { DeliverablesTab } from "@/components/project-detail/deliverables-tab"
import { DocumentsTab } from "@/components/project-detail/documents-tab"
import { HistoryTab } from "@/components/project-detail/history-tab"

const projectData = {
  id: 1,
  name: "Store Downtown Plaza",
  type: "Store",
  location: "New York, NY",
  area: 250,
  responsible: "Sarah Johnson",
  startDate: "2024-01-15",
  endDate: "2024-06-30",
  physicalProgress: 65,
  financialProgress: 58,
  status: "In Progress",
  totalBudget: 450000,
  spentAmount: 261000,
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold">Project Details</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{projectData.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{projectData.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{projectData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{projectData.area} m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{projectData.responsible}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(projectData.startDate).toLocaleDateString()} -{" "}
                    {new Date(projectData.endDate).toLocaleDateString()}
                  </span>
                </div>
                <Badge className="bg-blue-100 text-blue-800">{projectData.status}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Technical Section
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Physical Progress</span>
                <span className="text-sm text-muted-foreground">{projectData.physicalProgress}%</span>
              </div>
              <Progress value={projectData.physicalProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Financial Progress</span>
                <span className="text-sm text-muted-foreground">{projectData.financialProgress}%</span>
              </div>
              <Progress value={projectData.financialProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Sections</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables & Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History & Observations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab projectData={projectData} />
        </TabsContent>

        <TabsContent value="technical">
          <TechnicalSectionsTab />
        </TabsContent>

        <TabsContent value="deliverables">
          <DeliverablesTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
