"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Euro,
  Calendar,
  Star,
  Download,
  Eye,
  ContrastIcon as Compare,
} from "lucide-react"

const partidasTecnicas = [
  {
    id: 1,
    nombre: "Obra Civil",
    descripcion: "Cimentación, muros, pisos y trabajo estructural completo",
    estado: "En Progreso",
    progreso: 85,
    presupuestoEstimado: 200000,
    requerimientos: {
      descripcionDetallada:
        "Excavación de 2m de profundidad, cimentación de concreto armado, muros de mampostería, losa de entrepiso y acabados estructurales básicos.",
      especificacionesTecnicas:
        "Concreto f'c=210 kg/cm², acero de refuerzo fy=4200 kg/cm², mampostería con bloque de 15cm.",
      cronogramaRequerido: "8 semanas",
      condicionesEspeciales: "Trabajo en horario diurno únicamente, acceso limitado por construcciones adyacentes.",
      entregables: ["Planos as-built", "Certificados de calidad de materiales", "Pruebas de resistencia del concreto"],
    },
    proformas: [
      {
        id: 1,
        proveedor: "Constructora Madrid SL",
        contacto: "juan.martinez@constructoramadrid.es",
        telefono: "+34 91 123 4567",
        precio: 180000,
        tiempoEntrega: "8 semanas",
        condiciones: "Pago neto 30 días",
        experiencia: "15 años",
        calificacion: 4.8,
        notas: "Excelente historial de proyectos similares",
        fechaEnvio: "2024-01-10",
        validez: "30 días",
        incluye: ["Materiales", "Mano de obra", "Herramientas", "Supervisión técnica"],
        excluye: ["Permisos municipales", "Conexiones de servicios"],
        garantia: "12 meses",
        formaPago: "30% anticipo, 40% avance de obra, 30% entrega",
        archivo: "proforma_constructora_madrid.pdf",
        seleccionado: true,
      },
      {
        id: 2,
        proveedor: "Obras y Construcciones BCN",
        contacto: "maria.lopez@obrasbcn.es",
        telefono: "+34 93 456 7890",
        precio: 195000,
        tiempoEntrega: "10 semanas",
        condiciones: "50% anticipo",
        experiencia: "12 años",
        calificacion: 4.5,
        notas: "Materiales de alta calidad, mayor tiempo de ejecución",
        fechaEnvio: "2024-01-12",
        validez: "45 días",
        incluye: ["Materiales premium", "Mano de obra especializada", "Herramientas", "Control de calidad"],
        excluye: ["Permisos", "Servicios temporales"],
        garantia: "18 meses",
        formaPago: "50% anticipo, 30% avance, 20% entrega",
        archivo: "proforma_obras_bcn.pdf",
        seleccionado: false,
      },
      {
        id: 3,
        proveedor: "Edificaciones Levante",
        contacto: "carlos.ruiz@edificacioneslevante.es",
        telefono: "+34 96 789 0123",
        precio: 175000,
        tiempoEntrega: "9 semanas",
        condiciones: "Pago neto 15 días",
        experiencia: "10 años",
        calificacion: 4.2,
        notas: "Precio más competitivo, menor experiencia",
        fechaEnvio: "2024-01-15",
        validez: "20 días",
        incluye: ["Materiales estándar", "Mano de obra", "Herramientas básicas"],
        excluye: ["Permisos", "Supervisión especializada", "Pruebas adicionales"],
        garantia: "6 meses",
        formaPago: "20% anticipo, 60% avance, 20% entrega",
        archivo: "proforma_edificaciones_levante.pdf",
        seleccionado: false,
      },
    ],
    contrato: "contrato_obra_civil_firmado.pdf",
    fechaInicio: "2024-01-20",
    fechaFinPrevista: "2024-03-15",
  },
  {
    id: 2,
    nombre: "Instalación Eléctrica",
    descripcion: "Cableado, iluminación, tomas de corriente y paneles eléctricos",
    estado: "Pendiente",
    progreso: 0,
    presupuestoEstimado: 90000,
    requerimientos: {
      descripcionDetallada:
        "Instalación eléctrica completa incluyendo tablero principal, circuitos de iluminación y fuerza, puntos de datos y sistema de tierra física.",
      especificacionesTecnicas:
        "Cable THHN calibre según cálculo, tubería EMT, tableros Square D, interruptores y tomacorrientes Leviton.",
      cronogramaRequerido: "6 semanas",
      condicionesEspeciales: "Certificación por ingeniero eléctrico colegiado, cumplimiento RETIE.",
      entregables: ["Planos eléctricos finales", "Certificado RETIE", "Manual de operación", "Garantías de equipos"],
    },
    proformas: [
      {
        id: 4,
        proveedor: "ElectroTech Profesional",
        contacto: "ana.garcia@electrotech.es",
        telefono: "+34 91 234 5678",
        precio: 85000,
        tiempoEntrega: "6 semanas",
        condiciones: "Pago neto 15 días",
        experiencia: "10 años",
        calificacion: 4.6,
        notas: "Especializado en instalaciones comerciales",
        fechaEnvio: "2024-02-01",
        validez: "30 días",
        incluye: ["Materiales certificados", "Mano de obra especializada", "Pruebas y certificaciones"],
        excluye: ["Excavaciones", "Obra civil para canalizaciones"],
        garantia: "24 meses",
        formaPago: "25% anticipo, 50% avance, 25% entrega",
        archivo: "proforma_electrotech.pdf",
        seleccionado: false,
      },
      {
        id: 5,
        proveedor: "Instalaciones Eléctricas Sur",
        contacto: "pedro.sanchez@electricassur.es",
        telefono: "+34 95 345 6789",
        precio: 78000,
        tiempoEntrega: "7 semanas",
        condiciones: "Pago neto 30 días",
        experiencia: "8 años",
        calificacion: 4.3,
        notas: "Precio competitivo, mayor tiempo de ejecución",
        fechaEnvio: "2024-02-03",
        validez: "25 días",
        incluye: ["Materiales estándar", "Instalación", "Pruebas básicas"],
        excluye: ["Certificaciones especiales", "Materiales premium"],
        garantia: "12 meses",
        formaPago: "30% anticipo, 40% avance, 30% entrega",
        archivo: "proforma_electricas_sur.pdf",
        seleccionado: false,
      },
      {
        id: 6,
        proveedor: "Sistemas Eléctricos Avanzados",
        contacto: "luis.fernandez@sistemasavanzados.es",
        telefono: "+34 96 456 7890",
        precio: 92000,
        tiempoEntrega: "5 semanas",
        condiciones: "40% anticipo",
        experiencia: "12 años",
        calificacion: 4.7,
        notas: "Tecnología de vanguardia, mayor costo",
        fechaEnvio: "2024-02-05",
        validez: "40 días",
        incluye: ["Materiales premium", "Tecnología smart", "Certificaciones completas", "Capacitación"],
        excluye: ["Mantenimiento posterior"],
        garantia: "36 meses",
        formaPago: "40% anticipo, 35% avance, 25% entrega",
        archivo: "proforma_sistemas_avanzados.pdf",
        seleccionado: false,
      },
    ],
    contrato: null,
    fechaInicio: null,
    fechaFinPrevista: "2024-04-30",
  },
]

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case "Completado":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "En Progreso":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Pendiente":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />
  }
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-green-100 text-green-800 border-green-200"
    case "En Progreso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ))
}

export function PartidasTecnicasTab() {
  const [partidaSeleccionada, setPartidaSeleccionada] = useState<number | null>(null)
  const [mostrarComparacion, setMostrarComparacion] = useState<number | null>(null)

  const estadisticas = {
    completadas: partidasTecnicas.filter((p) => p.estado === "Completado").length,
    enProgreso: partidasTecnicas.filter((p) => p.estado === "En Progreso").length,
    pendientes: partidasTecnicas.filter((p) => p.estado === "Pendiente").length,
    presupuestoTotal: partidasTecnicas.reduce((sum, p) => sum + p.presupuestoEstimado, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Partidas Técnicas</h3>
          <p className="text-muted-foreground">Gestión de requerimientos, proformas y proveedores</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Partida
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Partida Técnica</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-partida">Nombre de la Partida</Label>
                  <Input id="nombre-partida" placeholder="Ej: Sistema de Seguridad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presupuesto-estimado">Presupuesto Estimado (€)</Label>
                  <Input id="presupuesto-estimado" type="number" placeholder="50000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion-partida">Descripción General</Label>
                <Textarea id="descripcion-partida" placeholder="Descripción general de la partida..." />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Requerimientos Detallados</h4>

                <div className="space-y-2">
                  <Label htmlFor="descripcion-detallada">Descripción Detallada</Label>
                  <Textarea
                    id="descripcion-detallada"
                    placeholder="Descripción técnica completa de los trabajos a realizar..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especificaciones-tecnicas">Especificaciones Técnicas</Label>
                  <Textarea
                    id="especificaciones-tecnicas"
                    placeholder="Materiales, normas, estándares de calidad requeridos..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cronograma-requerido">Cronograma Requerido</Label>
                    <Input id="cronograma-requerido" placeholder="Ej: 6 semanas" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsable-partida">Responsable</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar responsable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ana">Ana García</SelectItem>
                        <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                        <SelectItem value="maria">María López</SelectItem>
                        <SelectItem value="jose">José Martín</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condiciones-especiales">Condiciones Especiales</Label>
                  <Textarea
                    id="condiciones-especiales"
                    placeholder="Restricciones de horario, acceso, condiciones ambientales..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entregables">Entregables Requeridos</Label>
                  <Textarea
                    id="entregables"
                    placeholder="Lista de documentos, certificaciones, garantías requeridas..."
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha-inicio-estimada">Fecha Inicio Estimada</Label>
                  <Input id="fecha-inicio-estimada" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-fin-estimada">Fecha Fin Estimada</Label>
                  <Input id="fecha-fin-estimada" type="date" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Crear Partida</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completadas</p>
                <p className="text-2xl font-bold">{estadisticas.completadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
                <p className="text-2xl font-bold">{estadisticas.enProgreso}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Euro className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                <p className="text-xl font-bold">€{(estadisticas.presupuestoTotal / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Partidas */}
      <Accordion type="single" collapsible className="space-y-4">
        {partidasTecnicas.map((partida) => (
          <AccordionItem key={partida.id} value={`partida-${partida.id}`}>
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-4">
                    {getEstadoIcon(partida.estado)}
                    <div className="text-left">
                      <h4 className="font-semibold">{partida.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{partida.descripcion}</p>
                      {partida.fechaInicio && (
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Inicio: {new Date(partida.fechaInicio).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getEstadoColor(partida.estado)}>{partida.estado}</Badge>
                    <div className="flex items-center gap-2 min-w-32">
                      <Progress value={partida.progreso} className="w-20" />
                      <span className="text-sm font-medium">{partida.progreso}%</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">€{partida.presupuestoEstimado.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{partida.proformas.length} proformas</div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <Tabs defaultValue="requerimientos" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="requerimientos">Requerimientos</TabsTrigger>
                      <TabsTrigger value="proformas">Proformas ({partida.proformas.length})</TabsTrigger>
                      <TabsTrigger value="comparacion">Comparación</TabsTrigger>
                      <TabsTrigger value="contrato">Contrato</TabsTrigger>
                    </TabsList>

                    <TabsContent value="requerimientos" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Requerimientos Técnicos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">Descripción Detallada</h5>
                            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                              {partida.requerimientos.descripcionDetallada}
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Especificaciones Técnicas</h5>
                            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                              {partida.requerimientos.especificacionesTecnicas}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium mb-2">Cronograma Requerido</h5>
                              <p className="text-sm text-muted-foreground">
                                {partida.requerimientos.cronogramaRequerido}
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Presupuesto Estimado</h5>
                              <p className="text-sm font-medium">€{partida.presupuestoEstimado.toLocaleString()}</p>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Condiciones Especiales</h5>
                            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                              {partida.requerimientos.condicionesEspeciales}
                            </p>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Entregables Requeridos</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {partida.requerimientos.entregables.map((entregable, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  {entregable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="proformas" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Proformas Recibidas</h5>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Subir Proforma
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {partida.proformas.map((proforma) => (
                          <Card
                            key={proforma.id}
                            className={proforma.seleccionado ? "border-green-200 bg-green-50" : ""}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h6 className="font-semibold flex items-center gap-2">
                                    {proforma.proveedor}
                                    {proforma.seleccionado && (
                                      <Badge className="bg-green-100 text-green-800 border-green-200">
                                        Seleccionado
                                      </Badge>
                                    )}
                                  </h6>
                                  <div className="flex items-center gap-1 mt-1">
                                    {renderStars(proforma.calificacion)}
                                    <span className="text-sm ml-1">({proforma.calificacion})</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">€{proforma.precio.toLocaleString()}</div>
                                  <div className="text-sm text-muted-foreground">{proforma.tiempoEntrega}</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p>
                                    <strong>Contacto:</strong> {proforma.contacto}
                                  </p>
                                  <p>
                                    <strong>Teléfono:</strong> {proforma.telefono}
                                  </p>
                                  <p>
                                    <strong>Experiencia:</strong> {proforma.experiencia}
                                  </p>
                                  <p>
                                    <strong>Condiciones:</strong> {proforma.condiciones}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <strong>Fecha Envío:</strong> {new Date(proforma.fechaEnvio).toLocaleDateString()}
                                  </p>
                                  <p>
                                    <strong>Validez:</strong> {proforma.validez}
                                  </p>
                                  <p>
                                    <strong>Garantía:</strong> {proforma.garantia}
                                  </p>
                                  <p>
                                    <strong>Forma de Pago:</strong> {proforma.formaPago}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 space-y-2">
                                <div>
                                  <strong className="text-sm">Incluye:</strong>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {proforma.incluye.map((item, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <strong className="text-sm">Excluye:</strong>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {proforma.excluye.map((item, index) => (
                                      <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm">{proforma.archivo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  {!proforma.seleccionado && (
                                    <Button variant="outline" size="sm">
                                      Seleccionar
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {proforma.notas && (
                                <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                                  <strong>Notas:</strong> {proforma.notas}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="comparacion" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Comparación de Proformas</h5>
                        <Button variant="outline" size="sm">
                          <Compare className="h-4 w-4 mr-2" />
                          Exportar Comparación
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Proveedor</TableHead>
                              <TableHead>Precio</TableHead>
                              <TableHead>Tiempo</TableHead>
                              <TableHead>Calificación</TableHead>
                              <TableHead>Garantía</TableHead>
                              <TableHead>Condiciones</TableHead>
                              <TableHead>Experiencia</TableHead>
                              <TableHead>Estado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {partida.proformas.map((proforma) => (
                              <TableRow key={proforma.id} className={proforma.seleccionado ? "bg-green-50" : ""}>
                                <TableCell className="font-medium">{proforma.proveedor}</TableCell>
                                <TableCell className="font-bold">€{proforma.precio.toLocaleString()}</TableCell>
                                <TableCell>{proforma.tiempoEntrega}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    {renderStars(proforma.calificacion)}
                                    <span className="text-sm ml-1">{proforma.calificacion}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{proforma.garantia}</TableCell>
                                <TableCell>{proforma.condiciones}</TableCell>
                                <TableCell>{proforma.experiencia}</TableCell>
                                <TableCell>
                                  {proforma.seleccionado ? (
                                    <Badge className="bg-green-100 text-green-800 border-green-200">Seleccionado</Badge>
                                  ) : (
                                    <Button variant="outline" size="sm">
                                      Seleccionar
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Análisis de Comparación */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Análisis de Comparación</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                €{Math.min(...partida.proformas.map((p) => p.precio)).toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">Precio Más Bajo</div>
                              <div className="text-xs mt-1">
                                {
                                  partida.proformas.find(
                                    (p) => p.precio === Math.min(...partida.proformas.map((pr) => pr.precio)),
                                  )?.proveedor
                                }
                              </div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.max(...partida.proformas.map((p) => p.calificacion))}
                              </div>
                              <div className="text-sm text-muted-foreground">Mejor Calificación</div>
                              <div className="text-xs mt-1">
                                {
                                  partida.proformas.find(
                                    (p) =>
                                      p.calificacion === Math.max(...partida.proformas.map((pr) => pr.calificacion)),
                                  )?.proveedor
                                }
                              </div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">
                                €
                                {(
                                  partida.proformas.reduce((sum, p) => sum + p.precio, 0) / partida.proformas.length
                                ).toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">Precio Promedio</div>
                              <div className="text-xs mt-1">
                                Diferencia: €
                                {(
                                  Math.max(...partida.proformas.map((p) => p.precio)) -
                                  Math.min(...partida.proformas.map((p) => p.precio))
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="contrato" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Gestión de Contrato</h5>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Subir Contrato
                        </Button>
                      </div>

                      {partida.contrato ? (
                        <Card className="border-green-200 bg-green-50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-green-600" />
                                <div>
                                  <h6 className="font-medium">{partida.contrato}</h6>
                                  <p className="text-sm text-muted-foreground">Contrato firmado y vigente</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Firmado</Badge>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {partida.proformas.find((p) => p.seleccionado) && (
                              <div className="mt-4 pt-4 border-t border-green-200">
                                <h6 className="font-medium mb-2">Detalles del Contrato</h6>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p>
                                      <strong>Proveedor:</strong>{" "}
                                      {partida.proformas.find((p) => p.seleccionado)?.proveedor}
                                    </p>
                                    <p>
                                      <strong>Valor:</strong> €
                                      {partida.proformas.find((p) => p.seleccionado)?.precio.toLocaleString()}
                                    </p>
                                    <p>
                                      <strong>Plazo:</strong>{" "}
                                      {partida.proformas.find((p) => p.seleccionado)?.tiempoEntrega}
                                    </p>
                                  </div>
                                  <div>
                                    <p>
                                      <strong>Garantía:</strong>{" "}
                                      {partida.proformas.find((p) => p.seleccionado)?.garantia}
                                    </p>
                                    <p>
                                      <strong>Forma de Pago:</strong>{" "}
                                      {partida.proformas.find((p) => p.seleccionado)?.formaPago}
                                    </p>
                                    <p>
                                      <strong>Inicio:</strong>{" "}
                                      {partida.fechaInicio
                                        ? new Date(partida.fechaInicio).toLocaleDateString()
                                        : "Por definir"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="border-dashed border-2 border-gray-200">
                          <CardContent className="p-8 text-center">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h6 className="font-medium mb-2">No hay contrato subido</h6>
                            <p className="text-sm text-muted-foreground mb-4">
                              Selecciona un proveedor y sube el contrato firmado para continuar
                            </p>
                            <Button variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              Subir Contrato
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
