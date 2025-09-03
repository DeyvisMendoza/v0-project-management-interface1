"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, FileText, Phone, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react"

const technicalSections = [
  {
    id: 1,
    name: "Civil Work",
    description: "Foundation, walls, flooring, and structural work",
    status: "In Progress",
    progress: 75,
    selectedProvider: {
      name: "BuildCorp Solutions",
      contact: "john@buildcorp.com",
      phone: "+1 (555) 123-4567",
      price: 180000,
      deliveryTime: "8 weeks",
    },
    providers: [
      {
        name: "BuildCorp Solutions",
        price: 180000,
        deliveryTime: "8 weeks",
        conditions: "Net 30 payment terms",
        experience: "15 years",
        notes: "Excellent track record",
        selected: true,
      },
      {
        name: "Metro Construction",
        price: 195000,
        deliveryTime: "10 weeks",
        conditions: "50% upfront",
        experience: "12 years",
        notes: "Higher quality materials",
        selected: false,
      },
    ],
    proformas: ["civil_proforma_1.pdf", "civil_proforma_2.pdf"],
    contract: "civil_contract_signed.pdf",
  },
  {
    id: 2,
    name: "Electrical Installation",
    description: "Wiring, lighting, power outlets, and electrical panels",
    status: "Not Started",
    progress: 0,
    selectedProvider: null,
    providers: [
      {
        name: "ElectroTech Pro",
        price: 85000,
        deliveryTime: "6 weeks",
        conditions: "Net 15 payment terms",
        experience: "10 years",
        notes: "Specialized in commercial",
        selected: false,
      },
      {
        name: "PowerLine Services",
        price: 78000,
        deliveryTime: "7 weeks",
        conditions: "Net 30 payment terms",
        experience: "8 years",
        notes: "Competitive pricing",
        selected: false,
      },
    ],
    proformas: ["electrical_proforma_1.pdf"],
    contract: null,
  },
  {
    id: 3,
    name: "Interior Design",
    description: "Space planning, furniture, fixtures, and decorative elements",
    status: "Done",
    progress: 100,
    selectedProvider: {
      name: "Design Studio Plus",
      contact: "sarah@designstudio.com",
      phone: "+1 (555) 987-6543",
      price: 45000,
      deliveryTime: "4 weeks",
    },
    providers: [
      {
        name: "Design Studio Plus",
        price: 45000,
        deliveryTime: "4 weeks",
        conditions: "50% upfront, 50% on completion",
        experience: "12 years",
        notes: "Award-winning designs",
        selected: true,
      },
    ],
    proformas: ["design_proforma_1.pdf"],
    contract: "design_contract_signed.pdf",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Done":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Not Started":
      return <AlertCircle className="h-4 w-4 text-gray-400" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Not Started":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function TechnicalSectionsTab() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Technical Sections</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">1</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {technicalSections.map((section) => (
          <AccordionItem key={section.id} value={`section-${section.id}`}>
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(section.status)}
                    <div className="text-left">
                      <h4 className="font-semibold">{section.name}</h4>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(section.status)}>{section.status}</Badge>
                    <div className="flex items-center gap-2 min-w-24">
                      <Progress value={section.progress} className="w-16" />
                      <span className="text-sm">{section.progress}%</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-6">
                  {/* Requirements */}
                  <div>
                    <h5 className="font-medium mb-2">Requirements</h5>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>

                  {/* Proformas */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Proformas</h5>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Proforma
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {section.proformas.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Provider Comparison */}
                  <div>
                    <h5 className="font-medium mb-2">Provider Comparison</h5>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Provider</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Delivery Time</TableHead>
                          <TableHead>Conditions</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {section.providers.map((provider, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{provider.name}</TableCell>
                            <TableCell>${provider.price.toLocaleString()}</TableCell>
                            <TableCell>{provider.deliveryTime}</TableCell>
                            <TableCell>{provider.conditions}</TableCell>
                            <TableCell>{provider.experience}</TableCell>
                            <TableCell>{provider.notes}</TableCell>
                            <TableCell>
                              {provider.selected ? (
                                <Badge className="bg-green-100 text-green-800">Selected</Badge>
                              ) : (
                                <Button variant="outline" size="sm">
                                  Select
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Selected Provider Info */}
                  {section.selectedProvider && (
                    <div>
                      <h5 className="font-medium mb-2">Selected Provider</h5>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-medium">{section.selectedProvider.name}</h6>
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">{section.selectedProvider.contact}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">{section.selectedProvider.phone}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm">
                                <strong>Price:</strong> ${section.selectedProvider.price.toLocaleString()}
                              </p>
                              <p className="text-sm">
                                <strong>Delivery:</strong> {section.selectedProvider.deliveryTime}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Contract */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Contract</h5>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Contract
                      </Button>
                    </div>
                    {section.contract ? (
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{section.contract}</span>
                        <Badge className="bg-green-100 text-green-800 ml-auto">Signed</Badge>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No contract uploaded</p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
