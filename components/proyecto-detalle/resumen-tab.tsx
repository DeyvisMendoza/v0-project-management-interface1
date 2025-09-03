"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Building,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
} from "lucide-react"

interface DatosProyecto {
  id: number
  nombre: string
  tipo: string
  ubicacion: string
  area: number
  responsable: string
  fechaInicio: string
  fechaFin: string
  progresoFisico: number
  progresoFinanciero: number
  estado: string
  presupuestoTotal: number
  montoGastado: number
  prioridad: string
  descripcion: string
  cliente: string
  contrato: string
}

interface ResumenTabProps {
  datosProyecto: DatosProyecto
}

const equipoTrabajo = [
  {
    nombre: "Ana García",
    rol: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciales: "AG",
    estado: "activo",
  },
  {
    nombre: "Carlos Ruiz",
    rol: "Ingeniero Eléctrico",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciales: "CR",
    estado: "activo",
  },
  {
    nombre: "María López",
    rol: "Arquitecta",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciales: "ML",
    estado: "activo",
  },
  {
    nombre: "José Martín",
    rol: "Especialista HVAC",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciales: "JM",
    estado: "inactivo",
  },
]

const hitos = [
  {
    nombre: "Inicio de Obra Civil",
    fecha: "2024-01-15",
    estado: "completado",
    descripcion: "Excavación y cimentación",
  },
  {
    nombre: "Instalación Eléctrica",
    fecha: "2024-03-01",
    estado: "en-progreso",
    descripcion: "Cableado y puntos de luz",
  },
  {
    nombre: "Sistema HVAC",
    fecha: "2024-04-15",
    estado: "pendiente",
    descripcion: "Climatización y ventilación",
  },
  {
    nombre: "Acabados Finales",
    fecha: "2024-05-30",
    estado: "pendiente",
    descripcion: "Pintura y detalles finales",
  },
  {
    nombre: "Entrega Final",
    fecha: "2024-06-30",
    estado: "pendiente",
    descripcion: "Inspección y entrega al cliente",
  },
]

const obtenerIconoHito = (estado: string) => {
  switch (estado) {
    case "completado":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "en-progreso":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "pendiente":
      return <AlertTriangle className="h-4 w-4 text-gray-400" />
    default:
      return <Clock className="h-4 w-4 text-gray-400" />
  }
}

const obtenerColorHito = (estado: string) => {
  switch (estado) {
    case "completado":
      return "bg-green-100 text-green-800"
    case "en-progreso":
      return "bg-blue-100 text-blue-800"
    case "pendiente":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ResumenTab({ datosProyecto }: ResumenTabProps) {
  const porcentajeEjecucion = (datosProyecto.montoGastado / datosProyecto.presupuestoTotal) * 100
  const montoRestante = datosProyecto.presupuestoTotal - datosProyecto.montoGastado
  const diasTranscurridos = Math.floor(
    (new Date().getTime() - new Date(datosProyecto.fechaInicio).getTime()) / (1000 * 60 * 60 * 24),
  )
  const diasTotales = Math.floor(
    (new Date(datosProyecto.fechaFin).getTime() - new Date(datosProyecto.fechaInicio).getTime()) /
      (1000 * 60 * 60 * 24),
  )
  const porcentajeTiempo = (diasTranscurridos / diasTotales) * 100

  return (
    <div className="space-y-6">
      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progreso Físico</p>
                <p className="text-2xl font-bold">{datosProyecto.progresoFisico}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progreso Financiero</p>
                <p className="text-2xl font-bold">{datosProyecto.progresoFinanciero}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tiempo Transcurrido</p>
                <p className="text-2xl font-bold">{Math.round(porcentajeTiempo)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Días Restantes</p>
                <p className="text-2xl font-bold">{diasTotales - diasTranscurridos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información del Proyecto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                <p className="font-medium">{datosProyecto.cliente}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contrato</p>
                <p className="font-medium">{datosProyecto.contrato}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Área Total</p>
                <p className="font-medium">{datosProyecto.area} m²</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                <p className="font-medium">{datosProyecto.tipo}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Progreso General</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Físico</span>
                    <span>{datosProyecto.progresoFisico}%</span>
                  </div>
                  <Progress value={datosProyecto.progresoFisico} className="h-2" />
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Financiero</span>
                    <span>{datosProyecto.progresoFinanciero}%</span>
                  </div>
                  <Progress value={datosProyecto.progresoFinanciero} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Presupuesto</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Total:</span>
                  <span className="font-medium">€{datosProyecto.presupuestoTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gastado:</span>
                  <span className="font-medium">€{datosProyecto.montoGastado.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Restante:</span>
                  <span className="font-medium text-green-600">€{montoRestante.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipo de Trabajo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Equipo de Trabajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipoTrabajo.map((miembro, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={miembro.avatar || "/placeholder.svg"} alt={miembro.nombre} />
                    <AvatarFallback>{miembro.iniciales}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{miembro.nombre}</p>
                    <p className="text-sm text-muted-foreground">{miembro.rol}</p>
                  </div>
                  <Badge
                    className={
                      miembro.estado === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {miembro.estado === "activo" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline de Hitos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline de Hitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hitos.map((hito, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">{obtenerIconoHito(hito.estado)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium">{hito.nombre}</h4>
                    <Badge className={obtenerColorHito(hito.estado)}>
                      {hito.estado === "completado"
                        ? "Completado"
                        : hito.estado === "en-progreso"
                          ? "En Progreso"
                          : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{hito.descripcion}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(hito.fecha).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
