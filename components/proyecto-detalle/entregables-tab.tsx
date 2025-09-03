"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  Edit,
  Download,
} from "lucide-react"

const entregables = [
  {
    id: 1,
    nombre: "Diseño Arquitectónico Preliminar",
    descripcion: "Planos arquitectónicos iniciales y renders 3D",
    partida: "Diseño Interior",
    fechaEntrega: "2024-02-15",
    estado: "Entregado",
    porcentajeAvance: 100,
    responsable: "María López",
    documentos: ["planos_preliminares.dwg", "renders_3d.pdf"],
    observaciones: "Entregado según cronograma, aprobado por el cliente",
  },
  {
    id: 2,
    nombre: "Instalación Eléctrica Fase 1",
    descripcion: "Cableado principal y tablero de distribución",
    partida: "Instalación Eléctrica",
    fechaEntrega: "2024-03-10",
    estado: "En Progreso",
    porcentajeAvance: 75,
    responsable: "Carlos Ruiz",
    documentos: ["certificado_materiales.pdf"],
    observaciones: "Avance según cronograma, pendiente inspección final",
  },
  {
    id: 3,
    nombre: "Estructura de Concreto",
    descripcion: "Cimentación y estructura principal completada",
    partida: "Obra Civil",
    fechaEntrega: "2024-03-25",
    estado: "En Progreso",
    porcentajeAvance: 60,
    responsable: "José Martín",
    documentos: ["pruebas_concreto.pdf", "planos_estructurales.dwg"],
    observaciones: "Retraso de 3 días por condiciones climáticas",
  },
  {
    id: 4,
    nombre: "Sistema HVAC Completo",
    descripcion: "Instalación y puesta en marcha del sistema de climatización",
    partida: "Sistema HVAC",
    fechaEntrega: "2024-04-20",
    estado: "Pendiente",
    porcentajeAvance: 0,
    responsable: "Ana García",
    documentos: [],
    observaciones: "Pendiente inicio, esperando materiales",
  },
  {
    id: 5,
    nombre: "Acabados Finales",
    descripcion: "Pintura, pisos y detalles decorativos",
    partida: "Diseño Interior",
    fechaEntrega: "2024-05-30",
    estado: "Pendiente",
    porcentajeAvance: 0,
    responsable: "María López",
    documentos: [],
    observaciones: "Programado para iniciar después de HVAC",
  },
]

const cronogramaPagos = [
  {
    id: 1,
    concepto: "Anticipo Obra Civil",
    monto: 54000,
    fechaProgramada: "2024-01-20",
    fechaPago: "2024-01-20",
    estado: "Pagado",
    partida: "Obra Civil",
    proveedor: "Constructora Madrid SL",
    numeroFactura: "FC-2024-001",
  },
  {
    id: 2,
    concepto: "Avance Obra Civil 50%",
    monto: 90000,
    fechaProgramada: "2024-02-20",
    fechaPago: "2024-02-22",
    estado: "Pagado",
    partida: "Obra Civil",
    proveedor: "Constructora Madrid SL",
    numeroFactura: "FC-2024-015",
  },
  {
    id: 3,
    concepto: "Finalización Obra Civil",
    monto: 36000,
    fechaProgramada: "2024-03-15",
    fechaPago: null,
    estado: "Pendiente",
    partida: "Obra Civil",
    proveedor: "Constructora Madrid SL",
    numeroFactura: null,
  },
  {
    id: 4,
    concepto: "Anticipo Instalación Eléctrica",
    monto: 21250,
    fechaProgramada: "2024-03-01",
    fechaPago: null,
    estado: "Programado",
    partida: "Instalación Eléctrica",
    proveedor: "ElectroTech Profesional",
    numeroFactura: null,
  },
  {
    id: 5,
    concepto: "Avance Instalación Eléctrica",
    monto: 42500,
    fechaProgramada: "2024-03-20",
    fechaPago: null,
    estado: "Programado",
    partida: "Instalación Eléctrica",
    proveedor: "ElectroTech Profesional",
    numeroFactura: null,
  },
  {
    id: 6,
    concepto: "Anticipo Sistema HVAC",
    monto: 36800,
    fechaProgramada: "2024-04-01",
    fechaPago: null,
    estado: "Programado",
    partida: "Sistema HVAC",
    proveedor: "Climate Solutions",
    numeroFactura: null,
  },
]

const obtenerColorEstado = (estado: string) => {
  switch (estado) {
    case "Entregado":
      return "bg-green-100 text-green-800"
    case "En Progreso":
      return "bg-blue-100 text-blue-800"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "Retrasado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const obtenerColorEstadoPago = (estado: string) => {
  switch (estado) {
    case "Pagado":
      return "bg-green-100 text-green-800"
    case "Programado":
      return "bg-blue-100 text-blue-800"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "Vencido":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const obtenerIconoEstado = (estado: string) => {
  switch (estado) {
    case "Entregado":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "En Progreso":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Pendiente":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "Retrasado":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export function EntregablesTab() {
  const [tabActiva, setTabActiva] = useState("entregables")

  const estadisticas = {
    entregados: entregables.filter((e) => e.estado === "Entregado").length,
    enProgreso: entregables.filter((e) => e.estado === "En Progreso").length,
    pendientes: entregables.filter((e) => e.estado === "Pendiente").length,
    totalPagado: cronogramaPagos.filter((p) => p.estado === "Pagado").reduce((sum, p) => sum + p.monto, 0),
    totalProgramado: cronogramaPagos.reduce((sum, p) => sum + p.monto, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Entregables y Pagos</h3>
          <p className="text-muted-foreground">Seguimiento de entregables y cronograma de pagos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Entregable
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Entregable</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-entregable">Nombre del Entregable</Label>
                  <Input id="nombre-entregable" placeholder="Ej: Instalación de Pisos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partida-entregable">Partida Asociada</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar partida" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="obra-civil">Obra Civil</SelectItem>
                      <SelectItem value="instalacion-electrica">Instalación Eléctrica</SelectItem>
                      <SelectItem value="sistema-hvac">Sistema HVAC</SelectItem>
                      <SelectItem value="diseno-interior">Diseño Interior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion-entregable">Descripción</Label>
                <Textarea id="descripcion-entregable" placeholder="Descripción detallada del entregable..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha-entrega">Fecha de Entrega</Label>
                  <Input id="fecha-entrega" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable-entregable">Responsable</Label>
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

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Crear Entregable</Button>
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
                <p className="text-sm text-muted-foreground">Entregados</p>
                <p className="text-2xl font-bold">{estadisticas.entregados}</p>
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
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
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
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pagado</p>
                <p className="text-xl font-bold">€{(estadisticas.totalPagado / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entregables">Entregables</TabsTrigger>
          <TabsTrigger value="cronograma-pagos">Cronograma de Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="entregables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Entregables</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entregable</TableHead>
                    <TableHead>Partida</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Fecha Entrega</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entregables.map((entregable) => (
                    <TableRow key={entregable.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{entregable.nombre}</div>
                          <div className="text-sm text-muted-foreground">{entregable.descripcion}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{entregable.partida}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {obtenerIconoEstado(entregable.estado)}
                          <Badge className={obtenerColorEstado(entregable.estado)}>{entregable.estado}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{entregable.porcentajeAvance}%</span>
                          </div>
                          <Progress value={entregable.porcentajeAvance} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{new Date(entregable.fechaEntrega).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{entregable.responsable}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{entregable.documentos.length} docs</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="cronograma-pagos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Partida</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha Programada</TableHead>
                    <TableHead>Fecha Pago</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Factura</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronogramaPagos.map((pago) => (
                    <TableRow key={pago.id}>
                      <TableCell className="font-medium">{pago.concepto}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pago.partida}</Badge>
                      </TableCell>
                      <TableCell>{pago.proveedor}</TableCell>
                      <TableCell className="font-bold">€{pago.monto.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{new Date(pago.fechaProgramada).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {pago.fechaPago ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-green-600" />
                            <span className="text-sm">{new Date(pago.fechaPago).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Pendiente</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={obtenerColorEstadoPago(pago.estado)}>{pago.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        {pago.numeroFactura ? (
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span className="text-sm">{pago.numeroFactura}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {pago.numeroFactura && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
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
