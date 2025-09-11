"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  Plus,
  Upload,
  Calendar,
  MapPin,
  User,
  Building,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  CreditCard,
  TrendingDown,
  FileText,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { ResumenTab } from "@/components/proyecto-detalle/resumen-tab"
import { PartidasTecnicasTab } from "@/components/proyecto-detalle/partidas-tecnicas-tab"
import { EntregablesTab } from "@/components/proyecto-detalle/entregables-tab"
import { DocumentosTab } from "@/components/proyecto-detalle/documentos-tab"
import { HistorialTab } from "@/components/proyecto-detalle/historial-tab"
import { AvanceFisicoTab } from "@/components/proyecto-detalle/avance-fisico-tab"
import { IndicadoresTab } from "@/components/proyecto-detalle/indicadores-tab"

const datosProyecto = {
  id: 1,
  nombre: "Tienda Plaza Centro",
  tipo: "Tienda",
  ubicacion: "Madrid, España",
  area: 250,
  responsable: "Ana García",
  fechaInicio: "2024-01-15",
  fechaFin: "2024-06-30",
  progresoFisico: 75,
  progresoFinanciero: 68,
  estado: "En Progreso",
  presupuestoTotal: 450000,
  montoGastado: 306000,
  prioridad: "Alta",
  descripcion:
    "Implementación de nueva tienda en el centro comercial Plaza Centro con diseño moderno y tecnología avanzada.",
  cliente: "Retail Corp España",
  contrato: "RC-2024-001",
}

const alertas = [
  {
    tipo: "warning",
    mensaje: "El progreso físico está por debajo del cronograma planificado",
  },
  {
    tipo: "info",
    mensaje: "Próximo hito: Instalación eléctrica - Fecha límite: 25 de Marzo",
  },
]

export default function ProyectoDetallePage({ params }: { params: { id: string } }) {
  const [tabActiva, setTabActiva] = useState("resumen")

  const porcentajeEjecucion = (datosProyecto.montoGastado / datosProyecto.presupuestoTotal) * 100
  const montoRestante = datosProyecto.presupuestoTotal - datosProyecto.montoGastado

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/proyectos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Detalles del Proyecto</h2>
            <p className="text-muted-foreground">Gestión completa del proyecto y seguimiento de progreso</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Reporte Negociación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Reporte de Negociación - Proformas</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Reporte de Negociación</h3>
                  <p className="text-muted-foreground mb-4">
                    Análisis detallado de las negociaciones realizadas con proveedores
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Generar Reporte</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <TrendingDown className="h-4 w-4 mr-2" />
                Cuadro Ahorros
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cuadro de Ahorros del Proyecto</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          €{(datosProyecto.presupuestoTotal * 1.15).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Presupuesto Inicial Estimado</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          €{datosProyecto.presupuestoTotal.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Presupuesto Final Negociado</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          €{(datosProyecto.presupuestoTotal * 0.15).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Ahorro Total (15%)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Reporte de Ahorros
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Cuadro Pagos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cuadro de Pagos del Proyecto</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="text-lg font-semibold">Cronograma de Pagos</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Anticipo (30%)</div>
                            <div className="text-sm text-muted-foreground">Al firmar contrato</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€{(datosProyecto.presupuestoTotal * 0.3).toLocaleString()}</div>
                            <Badge className="bg-green-100 text-green-800">Pagado</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Avance 50% (40%)</div>
                            <div className="text-sm text-muted-foreground">Al 50% de avance físico</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€{(datosProyecto.presupuestoTotal * 0.4).toLocaleString()}</div>
                            <Badge className="bg-blue-100 text-blue-800">Pendiente</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Entrega Final (30%)</div>
                            <div className="text-sm text-muted-foreground">Al completar proyecto</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€{(datosProyecto.presupuestoTotal * 0.3).toLocaleString()}</div>
                            <Badge className="bg-gray-100 text-gray-800">Programado</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Cronograma de Pagos
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Cuadro Avances
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cuadro de Avances del Proyecto</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <div className="text-lg font-semibold">Avance Físico</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-2">{datosProyecto.progresoFisico}%</div>
                          <Progress value={datosProyecto.progresoFisico} className="h-3" />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Obra Civil:</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Instalaciones:</span>
                            <span className="font-medium">45%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Acabados:</span>
                            <span className="font-medium">20%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="text-lg font-semibold">Avance Financiero</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {datosProyecto.progresoFinanciero}%
                          </div>
                          <Progress value={datosProyecto.progresoFinanciero} className="h-3" />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Gastado:</span>
                            <span className="font-medium">€{datosProyecto.montoGastado.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Restante:</span>
                            <span className="font-medium">
                              €{(datosProyecto.presupuestoTotal - datosProyecto.montoGastado).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Reporte de Avances
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Alertas */}
      <div className="space-y-2">
        {alertas.map((alerta, index) => (
          <Alert
            key={index}
            className={alerta.tipo === "warning" ? "border-yellow-200 bg-yellow-50" : "border-blue-200 bg-blue-50"}
          >
            <AlertTriangle className={`h-4 w-4 ${alerta.tipo === "warning" ? "text-yellow-600" : "text-blue-600"}`} />
            <AlertDescription className={alerta.tipo === "warning" ? "text-yellow-800" : "text-blue-800"}>
              {alerta.mensaje}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Header del Proyecto */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{datosProyecto.nombre}</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">{datosProyecto.estado}</Badge>
                  <Badge variant="outline" className="border-red-200 text-red-700">
                    {datosProyecto.prioridad}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{datosProyecto.descripcion}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Tipo:</strong> {datosProyecto.tipo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Ubicación:</strong> {datosProyecto.ubicacion}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 text-muted-foreground">m²</span>
                  <span>
                    <strong>Área:</strong> {datosProyecto.area} m²
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Responsable:</strong> {datosProyecto.responsable}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Inicio:</strong> {new Date(datosProyecto.fechaInicio).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Fin:</strong> {new Date(datosProyecto.fechaFin).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 text-muted-foreground">#</span>
                  <span>
                    <strong>Contrato:</strong> {datosProyecto.contrato}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Cliente:</strong> {datosProyecto.cliente}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar Proyecto
              </Button>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Partida
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Subir Documento
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Progreso Físico
                </span>
                <span className="text-sm text-muted-foreground">{datosProyecto.progresoFisico}%</span>
              </div>
              <Progress value={datosProyecto.progresoFisico} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Progreso Financiero
                </span>
                <span className="text-sm text-muted-foreground">{datosProyecto.progresoFinanciero}%</span>
              </div>
              <Progress value={datosProyecto.progresoFinanciero} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ejecución Presupuestal</span>
                <span className="text-sm text-muted-foreground">{porcentajeEjecucion.toFixed(1)}%</span>
              </div>
              <Progress value={porcentajeEjecucion} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Gastado: €{datosProyecto.montoGastado.toLocaleString()}</span>
                <span>Restante: €{montoRestante.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="resumen" className="data-[state=active]:bg-white">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="partidas" className="data-[state=active]:bg-white">
            Partidas
          </TabsTrigger>
          <TabsTrigger value="entregables" className="data-[state=active]:bg-white">
            Entregables
          </TabsTrigger>
          <TabsTrigger value="avance" className="data-[state=active]:bg-white">
            Avance Físico
          </TabsTrigger>
          <TabsTrigger value="indicadores" className="data-[state=active]:bg-white">
            Indicadores
          </TabsTrigger>
          <TabsTrigger value="documentos" className="data-[state=active]:bg-white">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="historial" className="data-[state=active]:bg-white">
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <ResumenTab datosProyecto={datosProyecto} />
        </TabsContent>

        <TabsContent value="partidas">
          <PartidasTecnicasTab />
        </TabsContent>

        <TabsContent value="entregables">
          <EntregablesTab />
        </TabsContent>

        <TabsContent value="avance">
          <AvanceFisicoTab />
        </TabsContent>

        <TabsContent value="indicadores">
          <IndicadoresTab />
        </TabsContent>

        <TabsContent value="documentos">
          <DocumentosTab />
        </TabsContent>

        <TabsContent value="historial">
          <HistorialTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
