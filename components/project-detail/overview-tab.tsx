"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const progressData = [
  { month: "Jan", physical: 0, financial: 0 },
  { month: "Feb", physical: 15, financial: 12 },
  { month: "Mar", physical: 35, financial: 28 },
  { month: "Apr", physical: 50, financial: 45 },
  { month: "May", physical: 65, financial: 58 },
  { month: "Jun", physical: 75, financial: 70 },
]

const costData = [
  { section: "Civil Work", budget: 180000, spent: 120000, savings: 15000 },
  { section: "Electrical", budget: 80000, spent: 65000, savings: 8000 },
  { section: "Design", budget: 45000, spent: 38000, savings: 3000 },
  { section: "Gas", budget: 35000, spent: 28000, savings: 2000 },
  { section: "HVAC", budget: 110000, spent: 85000, savings: 12000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface OverviewTabProps {
  projectData: {
    totalBudget: number
    spentAmount: number
    physicalProgress: number
    financialProgress: number
  }
}

export function OverviewTab({ projectData }: OverviewTabProps) {
  const totalSavings = costData.reduce((sum, item) => sum + item.savings, 0)
  const remainingBudget = projectData.totalBudget - projectData.spentAmount

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${projectData.totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Spent Amount</p>
                <p className="text-2xl font-bold">${projectData.spentAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Remaining Budget</p>
                <p className="text-2xl font-bold">${remainingBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progress vs Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="physical" stroke="#8884d8" strokeWidth={2} name="Physical Progress" />
                <Line type="monotone" dataKey="financial" stroke="#82ca9d" strokeWidth={2} name="Financial Progress" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost by Section</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="section" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spent" fill="#8884d8" name="Spent" />
                <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ section, percent }) => `${section} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="budget"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Section Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costData.map((section, index) => {
                const progress = (section.spent / section.budget) * 100
                return (
                  <div key={section.section} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{section.section}</span>
                      <Badge variant={progress > 90 ? "default" : progress > 50 ? "secondary" : "outline"}>
                        {progress.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${section.spent.toLocaleString()} spent</span>
                      <span>${section.savings.toLocaleString()} saved</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
