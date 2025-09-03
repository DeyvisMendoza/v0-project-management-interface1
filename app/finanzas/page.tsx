"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  LucidePieChart,
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
} from "recharts"

const datosFlujoCaja = [
  { mes: "Ene", ingresos: 180000, gastos: 152000, neto: 28000 },
  { mes: "Feb", ingresos: 208000, gastos: 168000, neto: 40000 },
  { mes: "Mar", ingresos: 192000, gastos: 180000, neto: 12000 },
  { mes: "Abr", ingresos: 240000, gastos: 192000, neto: 48000 },
  { mes: "May", ingresos: 232000, gastos: 208000, neto: 24000 },
  { mes: "Jun", ingresos: 260000, gastos: 220000, neto: 40000 },
]

const datosDistribucionCostos = [
  { nombre: "Materiales", valor: 45, color: "#3b82f6" },
  { nombre: "Mano de Obra", valor: 30, color: "#10b981" },
  { nombre: "Equipos", valor: 15, color: "#f59e0b" },
  { nombre: "Otros", valor: 10, color: "#ef4444" },
]

const datosPresupuestoPorProyecto = [
  { proyecto: "Mall San Miguel", presupuesto: 180000, ejecutado: 122400, porcentaje: 68 },
  { proyecto: "Centro Empresarial", presupuesto: 340000, ejecutado: 0, porcentaje: 0 },
  { proyecto: "Plaza Norte", presupuesto: 128000, ejecutado: 121600, porcentaje: 95 },
  { proyecto: "Regional Arequipa", presupuesto: 480000, ejecutado: 249600, porcentaje: 52 },
  { proyecto: "Real Plaza Trujillo", presupuesto: 152000, ejecutado: 38000, porcentaje: 25 },
]

const pagosProximos = [
  {
    id: 1,
    concepto: "Constructora Andes S.A.C.",
    proyecto: "Tienda Mall San Miguel",
    monto: 18000,
    fechaVencimiento: "2024-03-15",
    estado: "Pendiente",
    tipo: "Proveedor",
  },
  {
    id: 2,
    concepto: "Instalaciones Eléctricas Cusco",
    proyecto: "Oficina Centro Empresarial",
    monto: 11200,
    fechaVencimiento: "2024-03-20",
    estado: "Aprobado",
    tipo: "Proveedor",
  },
  {
    id: 3,
    concepto: "Nómina Febrero",
    proyecto: "General",
    monto: 34000,
    fechaVencimiento: "2024-03-01",
    estado: "Vencido",
    tipo: "Nómina",
  },
  {
    id: 4,
    concepto: "Alquiler Oficinas",
    proyecto: "General",
    monto: 4800,
    fechaVencimiento: "2024-03-05",
    estado: "Pagado",
    tipo: "Servicios",
  },
]

const getEstadoPagoColor = (estado: string) => {
  switch (estado) {
    case "Pagado":
      return "bg-green-100 text-green-800 border-green-200"
    case "Aprobado":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Vencido":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getEstadoPagoIcon = (estado: string) => {
  switch (estado) {
    case "Pagado":
      return <CheckCircle className="h-4 w-4" />
    case "Aprobado":
      return <Clock className="h-4 w-4" />
    case "Pendiente":
      return <Clock className="h-4 w-4" />
    case "Vencido":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function FinanzasPage() {
  const [tabActiva, setTabActiva] = useState("dashboard")

  const totalPresupuesto = datosPresupuestoPorProyecto.reduce((sum, p) => sum + p.presupuesto, 0)
  const totalEjecutado = datosPresupuestoPorProyecto.reduce((sum, p) => sum + p.ejecutado, 0)
  const porcentajeEjecucionGeneral = (totalEjecutado / totalPresupuesto) * 100

  const pagosVencidos = pagosProximos.filter((p) => p.estado === "Vencido").length
  const pagosPendientes = pagosProximos.filter((p) => p.estado === "Pendiente" || p.estado === "Aprobado").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Finanzas</h2>
          <p className="text-muted-foreground mt-1">Dashboard financiero y control presupuestal</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Nuevo Pago
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                <p className="text-2xl font-bold">S/{(totalPresupuesto / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs mes anterior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ejecutado</p>
                <p className="text-2xl font-bold">S/{(totalEjecutado / 1000).toFixed(0)}K</p>
                <p className="text-xs text-blue-600">{porcentajeEjecucionGeneral.toFixed(1)}% del presupuesto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagos Pendientes</p>
                <p className="text-2xl font-bold">{pagosPendientes}</p>
                <p className="text-xs text-yellow-600">S/63K por pagar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagos Vencidos</p>
                <p className="text-2xl font-bold">{pagosVencidos}</p>
                <p className="text-xs text-red-600">Requiere atención</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="presupuestos" className="data-[state=active]:bg-white">
            Presupuestos
          </TabsTrigger>
          <TabsTrigger value="pagos" className="data-[state=active]:bg-white">
            Pagos
          </TabsTrigger>
          <TabsTrigger value="reportes" className="data-[state=active]:bg-white">
            Reportes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Flujo de Caja Mensual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={datosFlujoCaja}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`S/${value.toLocaleString()}`, ""]} />
                    <Area
                      type="monotone"
                      dataKey="ingresos"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="gastos"
                      stackId="2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Line type="monotone" dataKey="neto" stroke="#3b82f6" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucidePieChart className="h-5 w-5" />
                  Distribución de Costos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={datosDistribucionCostos}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="valor"
                      label={({ nombre, valor }) => `${nombre}: ${valor}%`}
                    >
                      {datosDistribucionCostos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="presupuestos">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Presupuestal por Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datosPresupuestoPorProyecto.map((proyecto, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{proyecto.proyecto}</h3>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          S/{proyecto.ejecutado.toLocaleString()} / S/{proyecto.presupuesto.toLocaleString()}
                        </div>
                        <div className="text-sm font-medium">{proyecto.porcentaje}% ejecutado</div>
                      </div>
                    </div>
                    <Progress value={proyecto.porcentaje} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Restante: S/{(proyecto.presupuesto - proyecto.ejecutado).toLocaleString()}</span>
                      <span
                        className={
                          proyecto.porcentaje > 80
                            ? "text-red-600"
                            : proyecto.porcentaje > 60
                              ? "text-yellow-600"
                              : "text-green-600"
                        }
                      >
                        {proyecto.porcentaje > 80 ? "Alto" : proyecto.porcentaje > 60 ? "Medio" : "Bajo"} riesgo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagos">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha Vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagosProximos.map((pago) => (
                    <TableRow key={pago.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{pago.concepto}</TableCell>
                      <TableCell>{pago.proyecto}</TableCell>
                      <TableCell className="font-medium">S/{pago.monto.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(pago.fechaVencimiento).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoPagoColor(pago.estado)}>
                          <div className="flex items-center gap-1">
                            {getEstadoPagoIcon(pago.estado)}
                            {pago.estado}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{pago.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {pago.estado === "Pendiente" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Aprobar
                            </Button>
                          )}
                          {pago.estado === "Aprobado" && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Pagar
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reportes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia Presupuestal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={datosPresupuestoPorProyecto}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="proyecto" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`S/${value.toLocaleString()}`, ""]} />
                    <Bar dataKey="presupuesto" fill="#e5e7eb" name="Presupuesto" />
                    <Bar dataKey="ejecutado" fill="#3b82f6" name="Ejecutado" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPIs Financieros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">ROI Promedio</p>
                      <p className="text-2xl font-bold text-green-600">18.5%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Eficiencia de Costos</p>
                      <p className="text-2xl font-bold text-blue-600">92.3%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Tiempo de Pago Promedio</p>
                      <p className="text-2xl font-bold text-yellow-600">12 días</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Margen de Beneficio</p>
                      <p className="text-2xl font-bold text-purple-600">24.7%</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
