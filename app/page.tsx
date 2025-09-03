"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"

const estadisticasPanel = {
  proyectosTotales: 15,
  proyectosActivos: 9,
  proyectosCompletados: 6,
  presupuestoTotal: 2720000,
  montoGastado: 1680000,
  pagosProximos: 232000,
  eficienciaPromedio: 92,
}

const proyectosRecientes = [
  {
    id: 1,
    nombre: "Tienda Mall San Miguel",
    ubicacion: "San Miguel, Lima",
    progreso: 75,
    estado: "En Progreso",
    presupuesto: 180000,
    gastado: 122400,
    responsable: "Ana Quispe",
    prioridad: "Alta",
  },
  {
    id: 2,
    nombre: "Oficina Centro Empresarial",
    ubicacion: "Miraflores, Lima",
    progreso: 0,
    estado: "Pendiente",
    presupuesto: 340000,
    gastado: 0,
    responsable: "Carlos Mendoza",
    prioridad: "Media",
  },
  {
    id: 3,
    nombre: "Tienda Plaza Norte",
    ubicacion: "Independencia, Lima",
    progreso: 100,
    estado: "Completado",
    presupuesto: 128000,
    gastado: 121600,
    responsable: "María Huamán",
    prioridad: "Baja",
  },
  {
    id: 4,
    nombre: "Oficina Regional Arequipa",
    ubicacion: "Cercado, Arequipa",
    progreso: 45,
    estado: "En Progreso",
    presupuesto: 480000,
    gastado: 216000,
    responsable: "David Vargas",
    prioridad: "Alta",
  },
]

const datosMensuales = [
  { mes: "Ene", proyectos: 3, presupuesto: 480000, gastado: 260000, completados: 1 },
  { mes: "Feb", proyectos: 5, presupuesto: 840000, gastado: 480000, completados: 2 },
  { mes: "Mar", proyectos: 7, presupuesto: 1360000, gastado: 840000, completados: 3 },
  { mes: "Abr", proyectos: 9, presupuesto: 1920000, gastado: 1160000, completados: 4 },
  { mes: "May", proyectos: 12, presupuesto: 2360000, gastado: 1440000, completados: 5 },
  { mes: "Jun", proyectos: 15, presupuesto: 2720000, gastado: 1680000, completados: 6 },
]

const tiposProyecto = [
  { nombre: "Tiendas", valor: 9, color: "#3B82F6", presupuesto: 1280000 },
  { nombre: "Oficinas", valor: 6, color: "#10B981", presupuesto: 1440000 },
]

const tareasProximas = [
  {
    id: 1,
    tarea: "Revisar propuestas eléctricas",
    proyecto: "Tienda Mall San Miguel",
    fechaVencimiento: "2024-03-20",
    prioridad: "Alta",
    responsable: "Ana Quispe",
  },
  {
    id: 2,
    tarea: "Programar inspección final",
    proyecto: "Tienda Plaza Norte",
    fechaVencimiento: "2024-03-22",
    prioridad: "Media",
    responsable: "María Huamán",
  },
  {
    id: 3,
    tarea: "Aprobar contrato HVAC",
    proyecto: "Oficina Centro Empresarial",
    fechaVencimiento: "2024-03-25",
    prioridad: "Alta",
    responsable: "Carlos Mendoza",
  },
  {
    id: 4,
    tarea: "Entrega de documentación",
    proyecto: "Oficina Regional Arequipa",
    fechaVencimiento: "2024-03-28",
    prioridad: "Media",
    responsable: "David Vargas",
  },
]

const alertasImportantes = [
  {
    tipo: "warning",
    mensaje: "3 proyectos con retrasos en cronograma",
    accion: "Ver detalles",
  },
  {
    tipo: "info",
    mensaje: "S/232,000 en pagos programados para esta semana",
    accion: "Revisar pagos",
  },
  {
    tipo: "success",
    mensaje: "2 proyectos completados este mes",
    accion: "Ver reportes",
  },
]

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case "Alta":
      return "bg-red-100 text-red-800 border-red-200"
    case "Media":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Baja":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-green-100 text-green-800 border-green-200"
    case "En Progreso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pendiente":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getAlertaIcon = (tipo: string) => {
  switch (tipo) {
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "info":
      return <TrendingUp className="h-4 w-4 text-blue-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />
  }
}

export default function PanelPrincipalPage() {
  const porcentajeEjecucion = (estadisticasPanel.montoGastado / estadisticasPanel.presupuestoTotal) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Panel Principal</h2>
          <p className="text-muted-foreground mt-1">Resumen ejecutivo de todos los proyectos</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/proyectos">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>

      {/* Alertas Importantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertasImportantes.map((alerta, index) => (
          <Card
            key={index}
            className={`border-l-4 ${
              alerta.tipo === "warning"
                ? "border-l-yellow-500"
                : alerta.tipo === "success"
                  ? "border-l-green-500"
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {getAlertaIcon(alerta.tipo)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alerta.mensaje}</p>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    {alerta.accion} →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proyectos Totales</p>
                <p className="text-2xl font-bold">{estadisticasPanel.proyectosTotales}</p>
                <p className="text-xs text-blue-600">+2 este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                <p className="text-2xl font-bold">{estadisticasPanel.proyectosActivos}</p>
                <p className="text-xs text-orange-600">{estadisticasPanel.eficienciaPromedio}% eficiencia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                <p className="text-2xl font-bold">S/{(estadisticasPanel.presupuestoTotal / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">{porcentajeEjecucion.toFixed(1)}% ejecutado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagos Próximos</p>
                <p className="text-2xl font-bold">S/{(estadisticasPanel.pagosProximos / 1000).toFixed(0)}K</p>
                <p className="text-xs text-purple-600">Esta semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progreso Mensual de Proyectos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={datosMensuales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "proyectos" ? value : `S/${((value as number) / 1000000).toFixed(1)}M`,
                    name === "proyectos"
                      ? "Proyectos"
                      : name === "presupuesto"
                        ? "Presupuesto"
                        : name === "gastado"
                          ? "Gastado"
                          : "Completados",
                  ]}
                />
                <Area type="monotone" dataKey="presupuesto" stackId="1" stroke="#E5E7EB" fill="#F3F4F6" />
                <Area type="monotone" dataKey="gastado" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Line type="monotone" dataKey="proyectos" stroke="#10B981" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Distribución por Tipo de Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tiposProyecto}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nombre, percent }) => `${nombre} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {tiposProyecto.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} proyectos`,
                    `S/${(props.payload.presupuesto / 1000000).toFixed(1)}M presupuesto`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Proyectos Recientes y Tareas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Proyectos Recientes
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/proyectos">
                  Ver Todos <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proyectosRecientes.map((proyecto) => (
                <div key={proyecto.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{proyecto.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{proyecto.ubicacion}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{proyecto.responsable}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                      <Badge variant="outline" className={getPrioridadColor(proyecto.prioridad)}>
                        {proyecto.prioridad}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progreso</span>
                      <span className="font-medium">{proyecto.progreso}%</span>
                    </div>
                    <Progress value={proyecto.progreso} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Presupuesto: S/{proyecto.presupuesto.toLocaleString()}</span>
                      <span>Gastado: S/{proyecto.gastado.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tareas Próximas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tareasProximas.map((tarea) => (
                <div key={tarea.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{tarea.tarea}</h4>
                      <p className="text-sm text-muted-foreground">{tarea.proyecto}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tarea.responsable}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPrioridadColor(tarea.prioridad)}>
                      {tarea.prioridad}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Vence: {new Date(tarea.fechaVencimiento).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Rendimiento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Rendimiento Mensual Comparativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={datosMensuales} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "proyectos" || name === "completados"
                    ? value
                    : `S/${((value as number) / 1000000).toFixed(1)}M`,
                  name === "proyectos"
                    ? "Proyectos Totales"
                    : name === "completados"
                      ? "Completados"
                      : name === "presupuesto"
                        ? "Presupuesto"
                        : "Gastado",
                ]}
              />
              <Bar dataKey="proyectos" fill="#3B82F6" name="proyectos" />
              <Bar dataKey="completados" fill="#10B981" name="completados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
