"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, FileText, User, Calendar, MessageSquare, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const historyEvents = [
  {
    id: 1,
    type: "milestone_completed",
    title: "Foundation Completion Milestone Achieved",
    description: "Foundation work has been completed and approved by the inspector.",
    user: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-02-16T10:30:00Z",
    details: {
      milestone: "Foundation Completion",
      paymentAmount: 90000,
    },
  },
  {
    id: 2,
    type: "document_uploaded",
    title: "Contract Uploaded",
    description: "Electrical installation contract has been uploaded and signed.",
    user: "Mike Chen",
    userAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-02-03T14:15:00Z",
    details: {
      documentName: "Electrical Contract - Main",
      documentType: "Contract",
    },
  },
  {
    id: 3,
    type: "provider_selected",
    title: "Provider Selected for Civil Work",
    description: "BuildCorp Solutions has been selected as the provider for civil work section.",
    user: "Emma Davis",
    userAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-25T09:45:00Z",
    details: {
      section: "Civil Work",
      provider: "BuildCorp Solutions",
      amount: 180000,
    },
  },
  {
    id: 4,
    type: "comment",
    title: "Project Update Comment",
    description:
      "Weather conditions have been favorable, allowing us to stay ahead of schedule on the foundation work.",
    user: "David Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-20T16:20:00Z",
    details: {},
  },
  {
    id: 5,
    type: "project_created",
    title: "Project Created",
    description: "Store Downtown Plaza project has been created and initialized.",
    user: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    timestamp: "2024-01-15T08:00:00Z",
    details: {
      projectType: "Store",
      location: "New York, NY",
      area: 250,
    },
  },
]

const observations = [
  {
    id: 1,
    content:
      "The foundation work is progressing exceptionally well. The contractor has been very professional and the quality of work exceeds expectations.",
    author: "Sarah Johnson",
    timestamp: "2024-02-16T11:00:00Z",
    type: "positive",
  },
  {
    id: 2,
    content:
      "We need to coordinate better with the electrical team to ensure they can start their rough-in work as soon as the structural framework is complete.",
    author: "Mike Chen",
    timestamp: "2024-02-10T15:30:00Z",
    type: "action_required",
  },
  {
    id: 3,
    content:
      "Budget tracking is on point. We're currently 3% under budget which gives us some flexibility for any unexpected costs.",
    author: "Emma Davis",
    timestamp: "2024-02-05T13:45:00Z",
    type: "neutral",
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case "milestone_completed":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "document_uploaded":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "provider_selected":
      return <User className="h-5 w-5 text-purple-600" />
    case "comment":
      return <MessageSquare className="h-5 w-5 text-gray-600" />
    case "project_created":
      return <Calendar className="h-5 w-5 text-indigo-600" />
    default:
      return <Clock className="h-5 w-5 text-gray-400" />
  }
}

const getObservationType = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-green-100 text-green-800"
    case "action_required":
      return "bg-yellow-100 text-yellow-800"
    case "neutral":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getObservationIcon = (type: string) => {
  switch (type) {
    case "positive":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "action_required":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "neutral":
      return <MessageSquare className="h-4 w-4 text-gray-600" />
    default:
      return <MessageSquare className="h-4 w-4 text-gray-600" />
  }
}

export function HistoryTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {historyEvents.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      {getEventIcon(event.type)}
                    </div>
                    {index < historyEvents.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>

                        {Object.keys(event.details).length > 0 && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                            {event.details.milestone && (
                              <div>
                                <strong>Milestone:</strong> {event.details.milestone}
                              </div>
                            )}
                            {event.details.paymentAmount && (
                              <div>
                                <strong>Payment:</strong> ${event.details.paymentAmount.toLocaleString()}
                              </div>
                            )}
                            {event.details.documentName && (
                              <div>
                                <strong>Document:</strong> {event.details.documentName}
                              </div>
                            )}
                            {event.details.provider && (
                              <div>
                                <strong>Provider:</strong> {event.details.provider}
                              </div>
                            )}
                            {event.details.amount && (
                              <div>
                                <strong>Amount:</strong> ${event.details.amount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground ml-4">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {event.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{event.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Observations & Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {observations.map((observation) => (
                <div key={observation.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      {getObservationIcon(observation.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{observation.author}</span>
                          <Badge className={getObservationType(observation.type)}>
                            {observation.type.replace("_", " ")}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(observation.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{observation.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Add New Observation</h4>
              <div className="space-y-3">
                <Textarea placeholder="Enter your observation or comment about the project..." className="min-h-20" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                  </div>
                  <Button size="sm">Add Comment</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
