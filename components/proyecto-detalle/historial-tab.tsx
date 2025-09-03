"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Edit,
  Building,
  DollarSign,
} from "lucide-react"

const actividades = [
  {
    id: 1,
    tipo: "documento",
    titulo: "Contrato firmado - Obra Civil",
    descripcion: "Se ha subido y firmado el contrato con Constructora Madrid SL",
    usuario: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "AG",
    fecha: "2024-02-15T10:30:00",
    partida: "Obra Civil",
    detalles: {
      archivo: "contrato_obra_civil_firmado.pdf",
      proveedor: "Constructora Madrid SL",
      monto: 180000,
    },
  },
  {
    id: 2,
    tipo: "progreso",
    titulo: "Actualización de progreso físico",
    descripcion: "Progreso de Obra Civil actualizado al 85%",
    usuario: "José Martín",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "JM",
    fecha: "2024-02-14T16:45:00",
    partida: "Obra Civil",
    detalles: {
      progresoAnterior: 75,
      progresoNuevo: 85,
      observaciones: "Completada instalación de losa de entrepiso",
    },
  },
  {
    id: 3,
    tipo: "pago",
    titulo: "Pago procesado",
    descripcion: "Pago de avance 50% Obra Civil procesado exitosamente",
    usuario: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "AG",
    fecha: "2024-02-12T09:15:00",
    partida: "Obra Civil",
    detalles: {
      concepto: "Avance Obra Civil 50%",
      monto: 90000,
      numeroFactura: "FC-2024-015",
      proveedor: "Constructora Madrid SL",
    },
  },
  {
    id: 4,
    tipo: "proforma",
    titulo: "Nueva proforma recibida",
    descripcion: "Proforma de Sistemas Eléctricos Avanzados para Instalación Eléctrica",
    usuario: "Carlos Ruiz",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "CR",
    fecha: "2024-02-10T14:20:00",
    partida: "Instalación Eléctrica",
    detalles: {
      proveedor: "Sistemas Eléctricos Avanzados",
      monto: 92000,
      tiempoEntrega: "5 semanas",
      archivo: "proforma_sistemas_avanzados.pdf",
    },
  },
  {
    id: 5,
    tipo: "observacion",
    titulo: "Observación de calidad",
    descripcion: "Se registró observación sobre calidad de acabados en muros",
    usuario: "María López",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "ML",
    fecha: "2024-02-08T11:30:00",
    partida: "Obra Civil",
    detalles: {
      severidad: "Media",
      descripcionCompleta:
        "Los acabados en muros del área norte presentan irregularidades menores que requieren corrección",
      accionRequerida: "Repaso de acabados en muros norte",
      fechaLimite: "2024-02-15",
    },
  },
  {
    id: 6,
    tipo: "entregable",
    titulo: "Entregable completado",
    descripcion: "Diseño Arquitectónico Preliminar marcado como entregado",
    usuario: "María López",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "ML",
    fecha: "2024-02-05T17:00:00",
    partida: "Diseño Interior",
    detalles: {
      entregable: "Diseño Arquitectónico Preliminar",
      documentos: ["planos_preliminares.dwg", "renders_3d.pdf"],
      aprobadoPor: "Cliente",
    },
  },
  {
    id: 7,
    tipo: "inicio",
    titulo: "Inicio de partida técnica",
    descripcion: "Inicio oficial de trabajos de Obra Civil",
    usuario: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "AG",
    fecha: "2024-01-20T08:00:00",
    partida: "Obra Civil",
    detalles: {
      fechaInicioReal: "2024-01-20",
      fechaInicioPlaneada: "2024-01-20",
      proveedor: "Constructora Madrid SL",
      responsable: "José Martín",
    },
  },
  {
    id: 8,
    tipo: "modificacion",
    titulo: "Modificación de cronograma",
    descripcion: "Ajuste en fechas de Sistema HVAC por disponibilidad de materiales",
    usuario: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    iniciales: "AG",
    fecha: "2024-01-18T13:45:00",
    partida: "Sistema HVAC",
    detalles: {
      fechaAnterior: "2024-03-15",
      fechaNueva: "2024-04-01",
      motivo: "Retraso en disponibilidad de equipos HVAC",
      impacto: "Retraso de 2 semanas en cronograma general",
    },
  },
]

const obtenerIconoTipo = (tipo: string) => {
  switch (tipo) {
    case "documento":
      return <FileText className="h-4 w-4 text-blue-600" />
    case "progreso":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pago":
      return <DollarSign className="h-4 w-4 text-purple-600" />
    case "proforma":
      return <Upload className="h-4 w-4 text-orange-600" />
    case "observacion":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "entregable":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "inicio":
      return <Building className="h-4 w-4 text-blue-600" />
    case "modificacion":
      return <Edit className="h-4 w-4 text-red-600" />
    default:
      return <MessageSquare className="h-4 w-4 text-gray-600" />
  }
}

const obtenerColorTipo = (tipo: string) => {
  switch (tipo) {
    case "documento":
      return "bg-blue-100 text-blue-800"
    case "progreso":
      return "bg-green-100 text-green-800"
    case "pago":
      return "bg-purple-100 text-purple-800"
    case "proforma":
      return "bg-orange-100 text-orange-800"
    case "observacion":
      return "bg-yellow-100 text-yellow-800"
    case "entregable":
      return "bg-green-100 text-green-800"
    case "inicio":
      return "bg-blue-100 text-blue-800"
    case "modificacion":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const obtenerNombreTipo = (tipo: string) => {
  switch (tipo) {
    case "documento":
      return "Documento"
    case "progreso":
      return "Progreso"
    case "pago":
      return "Pago"
    case "proforma":
      return "Proforma"
    case "observacion":
      return "Observación"
    case "entregable":
      return "Entregable"
    case "inicio":
      return "Inicio"
    case "modificacion":
      return "Modificación"
    default:
      return "Actividad"
  }
}

export function HistorialTab() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroPartida, setFiltroPartida] = useState("todas")
  const [busqueda, setBusqueda] = useState("")

  const actividadesFiltradas = actividades.filter((actividad) => {
    const coincideBusqueda =
      actividad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      actividad.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    const coincideTipo = filtroTipo === "todos" || actividad.tipo === filtroTipo
    const coincidePartida = filtroPartida === "todas" || actividad.partida === filtroPartida
    return coincideBusqueda && coincideTipo && coincidePartida
  })

  const estadisticas = {
    totalActividades: actividades.length,
    documentos: actividades.filter((a) => a.tipo === "documento").length,
    pagos: actividades.filter((a) => a.tipo === "pago").length,
    observaciones: actividades.filter((a) => a.tipo === "observacion").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Historial de Actividades</h3>
          <p className="text-muted-foreground">Registro completo de todas las actividades del proyecto</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Actividades</p>
                <p className="text-2xl font-bold">{estadisticas.totalActividades}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documentos</p>
                <p className="text-2xl font-bold">{estadisticas.documentos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pagos</p>
                <p className="text-2xl font-bold">{estadisticas.pagos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Observaciones</p>
                <p className="text-2xl font-bold">{estadisticas.observaciones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar actividades..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="documento">Documentos</SelectItem>
                  <SelectItem value="progreso">Progreso</SelectItem>
                  <SelectItem value="pago">Pagos</SelectItem>
                  <SelectItem value="proforma">Proformas</SelectItem>
                  <SelectItem value="observacion">Observaciones</SelectItem>
                  <SelectItem value="entregable">Entregables</SelectItem>
                  <SelectItem value="inicio">Inicios</SelectItem>
                  <SelectItem value="modificacion">Modificaciones</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroPartida} onValueChange={setFiltroPartida}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Partida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las partidas</SelectItem>
                  <SelectItem value="Obra Civil">Obra Civil</SelectItem>
                  <SelectItem value="Instalación Eléctrica">Instalación Eléctrica</SelectItem>
                  <SelectItem value="Sistema HVAC">Sistema HVAC</SelectItem>
                  <SelectItem value="Diseño Interior">Diseño Interior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline de Actividades */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline de Actividades ({actividadesFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {actividadesFiltradas.map((actividad, index) => (
              <div key={actividad.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200">
                    {obtenerIconoTipo(actividad.tipo)}
                  </div>
                  {index < actividadesFiltradas.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                </div>

                <div className="flex-1 pb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{actividad.titulo}</h4>
                            <Badge className={obtenerColorTipo(actividad.tipo)}>
                              {obtenerNombreTipo(actividad.tipo)}
                            </Badge>
                            <Badge variant="outline">{actividad.partida}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{actividad.descripcion}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={actividad.avatar || "/placeholder.svg"} alt={actividad.usuario} />
                            <AvatarFallback className="text-xs">{actividad.iniciales}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{actividad.usuario}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(actividad.fecha).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Detalles específicos por tipo */}
                      {actividad.detalles && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-sm space-y-1">
                            {actividad.tipo === "documento" && (
                              <>
                                <p>
                                  <strong>Archivo:</strong> {actividad.detalles.archivo}
                                </p>
                                <p>
                                  <strong>Proveedor:</strong> {actividad.detalles.proveedor}
                                </p>
                                <p>
                                  <strong>Monto:</strong> €{actividad.detalles.monto?.toLocaleString()}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "progreso" && (
                              <>
                                <p>
                                  <strong>Progreso:</strong> {actividad.detalles.progresoAnterior}% →{" "}
                                  {actividad.detalles.progresoNuevo}%
                                </p>
                                <p>
                                  <strong>Observaciones:</strong> {actividad.detalles.observaciones}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "pago" && (
                              <>
                                <p>
                                  <strong>Concepto:</strong> {actividad.detalles.concepto}
                                </p>
                                <p>
                                  <strong>Monto:</strong> €{actividad.detalles.monto?.toLocaleString()}
                                </p>
                                <p>
                                  <strong>Factura:</strong> {actividad.detalles.numeroFactura}
                                </p>
                                <p>
                                  <strong>Proveedor:</strong> {actividad.detalles.proveedor}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "proforma" && (
                              <>
                                <p>
                                  <strong>Proveedor:</strong> {actividad.detalles.proveedor}
                                </p>
                                <p>
                                  <strong>Monto:</strong> €{actividad.detalles.monto?.toLocaleString()}
                                </p>
                                <p>
                                  <strong>Tiempo de entrega:</strong> {actividad.detalles.tiempoEntrega}
                                </p>
                                <p>
                                  <strong>Archivo:</strong> {actividad.detalles.archivo}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "observacion" && (
                              <>
                                <p>
                                  <strong>Severidad:</strong> {actividad.detalles.severidad}
                                </p>
                                <p>
                                  <strong>Descripción:</strong> {actividad.detalles.descripcionCompleta}
                                </p>
                                <p>
                                  <strong>Acción requerida:</strong> {actividad.detalles.accionRequerida}
                                </p>
                                <p>
                                  <strong>Fecha límite:</strong>{" "}
                                  {new Date(actividad.detalles.fechaLimite).toLocaleDateString()}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "entregable" && (
                              <>
                                <p>
                                  <strong>Entregable:</strong> {actividad.detalles.entregable}
                                </p>
                                <p>
                                  <strong>Documentos:</strong> {actividad.detalles.documentos?.join(", ")}
                                </p>
                                <p>
                                  <strong>Aprobado por:</strong> {actividad.detalles.aprobadoPor}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "inicio" && (
                              <>
                                <p>
                                  <strong>Fecha inicio real:</strong>{" "}
                                  {new Date(actividad.detalles.fechaInicioReal).toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Fecha planeada:</strong>{" "}
                                  {new Date(actividad.detalles.fechaInicioPlaneada).toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Proveedor:</strong> {actividad.detalles.proveedor}
                                </p>
                                <p>
                                  <strong>Responsable:</strong> {actividad.detalles.responsable}
                                </p>
                              </>
                            )}
                            {actividad.tipo === "modificacion" && (
                              <>
                                <p>
                                  <strong>Fecha anterior:</strong>{" "}
                                  {new Date(actividad.detalles.fechaAnterior).toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Fecha nueva:</strong>{" "}
                                  {new Date(actividad.detalles.fechaNueva).toLocaleDateString()}
                                </p>
                                <p>
                                  <strong>Motivo:</strong> {actividad.detalles.motivo}
                                </p>
                                <p>
                                  <strong>Impacto:</strong> {actividad.detalles.impacto}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
