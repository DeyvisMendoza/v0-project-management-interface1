"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, FileText, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react"

const milestones = [
  {
    id: 1,
    name: "Foundation Completion",
    dueDate: "2024-02-15",
    status: "Completed",
    paymentAmount: 90000,
    completed: true,
    evidence: ["foundation_photos.zip", "inspection_report.pdf"],
    notes: "Foundation completed ahead of schedule with excellent quality.",
  },
  {
    id: 2,
    name: "Structural Framework",
    dueDate: "2024-03-30",
    status: "Completed",
    paymentAmount: 75000,
    completed: true,
    evidence: ["framework_photos.zip", "structural_cert.pdf"],
    notes: "All structural elements installed and certified.",
  },
  {
    id: 3,
    name: "Electrical Rough-in",
    dueDate: "2024-04-15",
    status: "In Progress",
    paymentAmount: 45000,
    completed: false,
    evidence: [],
    notes: "Electrical work 80% complete, on schedule.",
  },
  {
    id: 4,
    name: "Interior Finishing",
    dueDate: "2024-05-30",
    status: "Pending",
    paymentAmount: 85000,
    completed: false,
    evidence: [],
    notes: "Waiting for electrical completion before starting.",
  },
  {
    id: 5,
    name: "Final Inspection",
    dueDate: "2024-06-15",
    status: "Pending",
    paymentAmount: 35000,
    completed: false,
    evidence: [],
    notes: "Final milestone before project completion.",
  },
]

const paymentSchedule = [
  {
    id: 1,
    milestone: "Foundation Completion",
    amount: 90000,
    dueDate: "2024-02-15",
    paidDate: "2024-02-16",
    status: "Paid",
  },
  {
    id: 2,
    milestone: "Structural Framework",
    amount: 75000,
    dueDate: "2024-03-30",
    paidDate: "2024-04-02",
    status: "Paid",
  },
  {
    id: 3,
    milestone: "Electrical Rough-in",
    amount: 45000,
    dueDate: "2024-04-15",
    paidDate: null,
    status: "Pending",
  },
  {
    id: 4,
    milestone: "Interior Finishing",
    amount: 85000,
    dueDate: "2024-05-30",
    paidDate: null,
    status: "Scheduled",
  },
  {
    id: 5,
    milestone: "Final Inspection",
    amount: 35000,
    dueDate: "2024-06-15",
    paidDate: null,
    status: "Scheduled",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Pending":
      return "bg-gray-100 text-gray-800"
    case "Paid":
      return "bg-green-100 text-green-800"
    case "Scheduled":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
    case "Paid":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "In Progress":
    case "Pending":
    case "Scheduled":
      return <Clock className="h-4 w-4 text-blue-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-400" />
  }
}

export function DeliverablesTab() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)

  const totalPayments = paymentSchedule.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = paymentSchedule
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Deliverables & Payments</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Contract Value</p>
                <p className="text-2xl font-bold">${totalPayments.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Paid Amount</p>
                <p className="text-2xl font-bold">${paidAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold">${(totalPayments - paidAmount).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={milestone.completed} disabled={milestone.status === "Pending"} />
                      <div>
                        <h4 className="font-medium">{milestone.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      <p className="text-sm font-medium mt-1">${milestone.paymentAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {milestone.notes && <p className="text-sm text-muted-foreground mb-3">{milestone.notes}</p>}

                  {milestone.evidence.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Evidence:</p>
                      <div className="flex gap-2">
                        {milestone.evidence.map((file, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                            <FileText className="h-3 w-3" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Evidence
                    </Button>
                    {milestone.completed && (
                      <Button variant="outline" size="sm">
                        Record Payment
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentSchedule.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.milestone}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(payment.dueDate).toLocaleDateString()}
                      {payment.paidDate && (
                        <div className="text-xs text-muted-foreground">
                          Paid: {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
