"use client"

import { useState } from "react"
import { BarChart3, Download, FileText, TrendingUp, PieChartIcon as PieIcon, Calendar, Eye, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  LineChart,
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
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts"

const reportesDisponibles = [
  {
    id: 1,
    nombre: "Reporte Ejecutivo Mensual",
    tipo: "Ejecutivo",
    descripcion: "Resumen ejecutivo del rendimiento de todos los proyectos",
    fechaGeneracion: "2024-03-01",
    formato: "PDF",
    estado: "Disponible",
    tamaño: "2.4 MB",
  },
  {
    id: 2,
    nombre: "Análisis Financiero Q1 2024",
    tipo: "Financiero",
    descripcion: "Análisis detallado de costos, presupuestos y rentabilidad",
    fechaGeneracion: "2024-02-28",
    formato: "Excel",
    estado: "Disponible",
    tamaño: "1.8 MB",
  },
  {
    id: 3,
    nombre: "Reporte de Progreso por Proyecto",
    tipo: "Operativo",
    descripcion: "Estado actual y progreso de cada proyecto activo",
    fechaGeneracion: "2024-03-05",
    formato: "PDF",
    estado: "Generando",
    tamaño: "-",
  },
  {
    id: 4,
    nombre: "Análisis de Proveedores",
    tipo: "Operativo",
    descripcion: "Evaluación de rendimiento y calificación de proveedores",
    fechaGeneracion: "2024-02-25",
    formato: "Excel",
    estado: "Disponible",
    tamaño: "956 KB",
  },
]

const datosRendimientoProyectos = [
  { proyecto: "Mall San Miguel", planificado: 75, real: 68, eficiencia: 91 },
  { proyecto: "Centro Empresarial", planificado: 45, real: 52, eficiencia: 116 },
  { proyecto: "Plaza Norte", planificado: 95, real: 98, eficiencia: 103 },
  { proyecto: "Regional Arequipa", planificado: 60, real: 55, eficiencia: 92 },
  { proyecto: "Real Plaza Trujillo", planificado: 30, real: 25, eficiencia: 83 },
]

const datosDistribucionCostos = [
  { categoria: "Materiales", valor: 500000, porcentaje: 45, color: "#3b82f6" },
  { categoria: "Mano de Obra", valor: 333200, porcentaje: 30, color: "#10b981" },
  { categoria: "Equipos", valor: 166800, porcentaje: 15, color: "#f59e0b" },
  { categoria: "Otros", valor: 111200, porcentaje: 10, color: "#ef4444" },
]

const kpisPorProyecto = [
  {
    proyecto: "Tienda Mall San Miguel",
    presupuesto: 180000,
    ejecutado: 122400,
    progresoFisico: 75,
    progresoFinanciero: 68,
    eficiencia: 91,
    riesgo: "Medio",
  },
  {
    proyecto: "Oficina Centro Empresarial",
    presupuesto: 340000,
    ejecutado: 176800,
    progresoFisico: 45,
    progresoFinanciero: 52,
    eficiencia: 116,
    riesgo: "Bajo",
  },
  {
    proyecto: "Tienda Plaza Norte",
    presupuesto: 128000,
    ejecutado: 125440,
    progresoFisico: 95,
    progresoFinanciero: 98,
    eficiencia: 103,
    riesgo: "Bajo",
  },
]

const datosTendencias = [
  { mes: "Oct", proyectos: 8, presupuesto: 840000, eficiencia: 89 },
  { mes: "Nov", proyectos: 10, presupuesto: 980000, eficiencia: 92 },
  { mes: "Dic", proyectos: 12, presupuesto: 1120000, eficiencia: 88 },
  { mes: "Ene", proyectos: 11, presupuesto: 1060000, eficiencia: 94 },
  { mes: "Feb", proyectos: 13, presupuesto: 1240000, eficiencia: 91 },
  { mes: "Mar", proyectos: 15, presupuesto: 1280000, eficiencia: 93 },
]

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Disponible":
      return "bg-green-100 text-green-800 border-green-200"
    case "Generando":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Error":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getRiesgoColor = (riesgo: string) => {
  switch (riesgo) {
    case "Bajo":
      return "bg-green-100 text-green-800 border-green-200"
    case "Medio":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Alto":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ReportesPage() {
  const [tabActiva, setTabActiva] = useState("dashboard")
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const { toast } = useToast()

  const reportesFiltrados = reportesDisponibles.filter((reporte) => {
    if (tipoFiltro !== "todos" && reporte.tipo !== tipoFiltro) return false
    return true
  })

  const handleDescargarReporte = (reporte: any) => {
    toast({
      title: "Descargando reporte",
      description: `Descargando ${reporte.nombre}...`,
    })
  }

  const handleGenerarReporte = () => {
    toast({
      title: "Generando reporte",
      description: "El reporte se está generando y estará disponible en unos minutos...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reportes</h2>
          <p className="text-muted-foreground mt-1">Centro de reportes ejecutivos y análisis de datos</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Compartir Dashboard
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerarReporte}>
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="rendimiento" className="data-[state=active]:bg-white">
            Rendimiento
          </TabsTrigger>
          <TabsTrigger value="financiero" className="data-[state=active]:bg-white">
            Financiero
          </TabsTrigger>
          <TabsTrigger value="reportes" className="data-[state=active]:bg-white">
            Reportes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-xs text-blue-600">+3 este mes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eficiencia Promedio</p>
                    <p className="text-2xl font-bold">93%</p>
                    <p className="text-xs text-green-600">+2% vs mes anterior</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-lg font-bold text-purple-600">S/</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                    <p className="text-2xl font-bold">1.3M</p>
                    <p className="text-xs text-purple-600">68% ejecutado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reportes Generados</p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-orange-600">Este mes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendencias de Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={datosTendencias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="eficiencia" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieIcon className="h-5 w-5" />
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
                      label={({ categoria, porcentaje }) => `${categoria}: ${porcentaje}%`}
                    >
                      {datosDistribucionCostos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`S/${value.toLocaleString()}`, ""]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rendimiento">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={datosRendimientoProyectos}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="proyecto" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planificado" fill="#e5e7eb" name="Planificado" />
                    <Bar dataKey="real" fill="#3b82f6" name="Real" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPIs por Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Presupuesto</TableHead>
                      <TableHead>Ejecutado</TableHead>
                      <TableHead>Progreso Físico</TableHead>
                      <TableHead>Progreso Financiero</TableHead>
                      <TableHead>Eficiencia</TableHead>
                      <TableHead>Riesgo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kpisPorProyecto.map((proyecto, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{proyecto.proyecto}</TableCell>
                        <TableCell>S/{proyecto.presupuesto.toLocaleString()}</TableCell>
                        <TableCell>S/{proyecto.ejecutado.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={proyecto.progresoFisico} className="w-16" />
                            <span className="text-sm">{proyecto.progresoFisico}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={proyecto.progresoFinanciero} className="w-16" />
                            <span className="text-sm">{proyecto.progresoFinanciero}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              proyecto.eficiencia >= 100
                                ? "border-green-200 text-green-700"
                                : proyecto.eficiencia >= 90
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            }
                          >
                            {proyecto.eficiencia}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiesgoColor(proyecto.riesgo)}>{proyecto.riesgo}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financiero">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Distribución de Costos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie data={datosDistribucionCostos} cx="50%" cy="50%" outerRadius={100} dataKey="valor">
                          {datosDistribucionCostos.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`S/${value.toLocaleString()}`, ""]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {datosDistribucionCostos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium">{item.categoria}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">S/{item.valor.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{item.porcentaje}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolución del Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={datosTendencias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`S/${value.toLocaleString()}`, ""]} />
                    <Area type="monotone" dataKey="presupuesto" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reportes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Reportes Disponibles
                </CardTitle>
                <div className="flex items-center gap-4">
                  <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los Tipos</SelectItem>
                      <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                      <SelectItem value="Financiero">Financiero</SelectItem>
                      <SelectItem value="Operativo">Operativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Reporte</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha Generación</TableHead>
                    <TableHead>Formato</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportesFiltrados.map((reporte) => (
                    <TableRow key={reporte.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{reporte.nombre}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {reporte.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-muted-foreground truncate">{reporte.descripcion}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(reporte.fechaGeneracion).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{reporte.formato}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoColor(reporte.estado)}>{reporte.estado}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{reporte.tamaño}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {reporte.estado === "Disponible" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleDescargarReporte(reporte)}>
                                <Download className="h-4 w-4 mr-1" />
                                Descargar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                            </>
                          )}
                          {reporte.estado === "Generando" && (
                            <Badge className="bg-yellow-100 text-yellow-800">Procesando...</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
