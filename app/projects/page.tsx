"use client"

import { useState } from "react"
import { Plus, Eye, Edit, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "Store Downtown Plaza",
    location: "New York, NY",
    area: 250,
    type: "Store",
    responsible: "Sarah Johnson",
    status: "In Progress",
    physicalProgress: 65,
    financialProgress: 58,
  },
  {
    id: 2,
    name: "Office Tech Hub",
    location: "San Francisco, CA",
    area: 800,
    type: "Office",
    responsible: "Mike Chen",
    status: "Pending",
    physicalProgress: 0,
    financialProgress: 0,
  },
  {
    id: 3,
    name: "Store Mall Central",
    location: "Chicago, IL",
    area: 180,
    type: "Store",
    responsible: "Emma Davis",
    status: "Completed",
    physicalProgress: 100,
    financialProgress: 95,
  },
  {
    id: 4,
    name: "Regional Office",
    location: "Austin, TX",
    area: 1200,
    type: "Office",
    responsible: "David Wilson",
    status: "In Progress",
    physicalProgress: 35,
    financialProgress: 42,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Completed":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [responsibleFilter, setResponsibleFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    if (statusFilter !== "all" && project.status !== statusFilter) return false
    if (responsibleFilter !== "all" && project.responsible !== responsibleFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Projects</CardTitle>
            <div className="flex items-center gap-4">
              <Input placeholder="Search projects..." className="w-64" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Responsible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Responsible</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                  <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                  <SelectItem value="David Wilson">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Area (m²)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Responsible</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Physical Progress</TableHead>
                <TableHead>Financial Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.area}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>{project.responsible}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.physicalProgress} className="w-16" />
                      <span className="text-sm">{project.physicalProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.financialProgress} className="w-16" />
                      <span className="text-sm">{project.financialProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
