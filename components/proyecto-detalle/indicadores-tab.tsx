"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Users,
  Star,
  Shield,
} from "lucide-react"

const indicadoresKPI = {
  rendimiento: {
    spi: 0.92, // Schedule Performance Index
    cpi: 1.05, // Cost Performance Index
    eficienciaRecursos: 87,
    productividad: 94,
  },
  financieros: {
    presupuestoTotal: 450000, // Updated from € to S/
    gastado: 306000, // Updated from € to S/
    comprometido: 85000, // Updated from € to S/
    disponible: 59000, // Updated from € to S/
    variacionCosto: 15000, // Ahorro, Updated from € to S/
    variacionCronograma: -8000, // Retraso en valor, Updated from € to S/
  },
  cronograma: {
    diasPlanificados: 165,
    diasTranscurridos: 45,
    diasRestantes: 120,
    hitosCompletados: 3,
    hitosTotales: 8,
    retrasoPromedio: 2.5, // días
  },
  calidad: {
    inspeccionesPasadas: 12,
    inspeccionesTotales: 15,
    defectosEncontrados: 3,
    defectosCorregidos: 2,
    satisfaccionCliente: 4.2,
  },
}

const ahorrosDetallados = [
  {
    partida: "Obra Civil",
    presupuestoOriginal: 200000, // Updated from € to S/
    costoReal: 180000, // Updated from € to S/
    ahorro: 20000, // Updated from € to S/
    porcentajeAhorro: 10,
    motivo: "Negociación exitosa con proveedor seleccionado",
  },
  {
    partida: "Instalación Eléctrica",
    presupuestoOriginal: 90000, // Updated from € to S/
    costoReal: 85000, // Updated from € to S/
    ahorro: 5000, // Updated from € to S/
    porcentajeAhorro: 5.6,
    motivo: "Optimización en especificaciones técnicas",
  },
  {
    partida: "Sistema HVAC",
    presupuestoOriginal: 110000, // Updated from € to S/
    costoReal: 110000, // Updated from € to S/
    ahorro: 0, // Updated from € to S/
    porcentajeAhorro: 0,
    motivo: "Sin variación respecto al presupuesto",
  },
  {
    partida: "Diseño Interior",
    presupuestoOriginal: 50000, // Updated from € to S/
    costoReal: 45000, // Updated from € to S/
    ahorro: 5000, // Updated from € to S/
    porcentajeAhorro: 10,
    motivo: "Descuento por volumen en mobiliario",
  },
]

const riesgos = [
  {
    id: 1,
    descripcion: "Retraso en entrega de materiales HVAC",
    probabilidad: "Alta",
    impacto: "Alto",
    nivel: "Crítico",
    estado: "Activo",
    responsable: "Ana García",
    fechaIdentificacion: "2024-02-10",
    mitigacion: "Contacto con proveedores alternativos, adelanto de otras actividades",
  },
  {
    id: 2,
    descripcion: "Condiciones climáticas adversas",
    probabilidad: "Media",
    impacto: "Medio",
    nivel: "Moderado",
    estado: "Monitoreando",
    responsable: "José Martín",
    fechaIdentificacion: "2024-02-05",
    mitigacion: "Planificación de actividades interiores como contingencia",
  },
  {
    id: 3,
    descripcion: "Incremento en costos de materiales",
    probabilidad: "Baja",
    impacto: "Alto",
    nivel: "Moderado",
    estado: "Mitigado",
    responsable: "Ana García",
    fechaIdentificacion: "2024-01-20",
    mitigacion: "Contratos con precios fijos ya negociados",
  },
]

const obtenerColorRiesgo = (nivel: string) => {
  switch (nivel) {
    case "Crítico":
      return "bg-red-100 text-red-800 border-red-200"
    case "Alto":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Moderado":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Bajo":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const obtenerColorEstadoRiesgo = (estado: string) => {
  switch (estado) {
    case "Activo":
      return "bg-red-100 text-red-800"
    case "Monitoreando":
      return "bg-yellow-100 text-yellow-800"
    case "Mitigado":
      return "bg-green-100 text-green-800"
    case "Cerrado":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function IndicadoresTab() {
  const [tabActiva, setTabActiva] = useState("kpis")

  const porcentajeEjecucion = (indicadoresKPI.financieros.gastado / indicadoresKPI.financieros.presupuestoTotal) * 100
  const porcentajeTiempo =
    (indicadoresKPI.cronograma.diasTranscurridos / indicadoresKPI.cronograma.diasPlanificados) * 100
  const ahorroTotal = ahorrosDetallados.reduce((sum, item) => sum + item.ahorro, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Indicadores y KPIs</h3>
          <p className="text-muted-foreground">Dashboard de métricas clave y análisis de rendimiento</p>
        </div>
      </div>

      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="kpis">KPIs Principales</TabsTrigger>
          <TabsTrigger value="ahorros">Análisis de Ahorros</TabsTrigger>
          <TabsTrigger value="riesgos">Gestión de Riesgos</TabsTrigger>
          <TabsTrigger value="calidad">Indicadores de Calidad</TabsTrigger>
        </TabsList>

        <TabsContent value="kpis" className="space-y-6">
          {/* KPIs Principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SPI (Cronograma)</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.rendimiento.spi}</p>
                    <p className="text-xs text-red-600">8% retraso</p>
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
                    <p className="text-sm text-muted-foreground">CPI (Costos)</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.rendimiento.cpi}</p>
                    <p className="text-xs text-green-600">5% bajo presupuesto</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eficiencia Recursos</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.rendimiento.eficienciaRecursos}%</p>
                    <p className="text-xs text-green-600">Buena eficiencia</p>
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
                    <p className="text-sm text-muted-foreground">Productividad</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.rendimiento.productividad}%</p>
                    <p className="text-xs text-green-600">Excelente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análisis Financiero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Análisis Financiero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Presupuesto Total</span>
                    <span className="font-bold">S/{indicadoresKPI.financieros.presupuestoTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gastado</span>
                    <span className="font-bold text-blue-600">
                      S/{indicadoresKPI.financieros.gastado.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Comprometido</span>
                    <span className="font-bold text-yellow-600">
                      S/{indicadoresKPI.financieros.comprometido.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Disponible</span>
                    <span className="font-bold text-green-600">
                      S/{indicadoresKPI.financieros.disponible.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ejecución Presupuestal</span>
                    <span>{porcentajeEjecucion.toFixed(1)}%</span>
                  </div>
                  <Progress value={porcentajeEjecucion} className="h-3" />
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Variación de Costo:</span>
                    <span className="font-bold text-green-600">
                      +S/{indicadoresKPI.financieros.variacionCosto.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Análisis de Cronograma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Días Planificados</span>
                    <span className="font-bold">{indicadoresKPI.cronograma.diasPlanificados}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Días Transcurridos</span>
                    <span className="font-bold text-blue-600">{indicadoresKPI.cronograma.diasTranscurridos}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Días Restantes</span>
                    <span className="font-bold text-green-600">{indicadoresKPI.cronograma.diasRestantes}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso Temporal</span>
                    <span>{porcentajeTiempo.toFixed(1)}%</span>
                  </div>
                  <Progress value={porcentajeTiempo} className="h-3" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hitos Completados</span>
                    <span>
                      {indicadoresKPI.cronograma.hitosCompletados}/{indicadoresKPI.cronograma.hitosTotales}
                    </span>
                  </div>
                  <Progress
                    value={(indicadoresKPI.cronograma.hitosCompletados / indicadoresKPI.cronograma.hitosTotales) * 100}
                    className="h-3"
                  />
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Retraso Promedio:</span>
                    <span className="font-bold text-red-600">{indicadoresKPI.cronograma.retrasoPromedio} días</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ahorros" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ahorro Total</p>
                    <p className="text-2xl font-bold text-green-600">S/{ahorroTotal.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">% Ahorro Promedio</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(
                        (ahorroTotal / ahorrosDetallados.reduce((sum, item) => sum + item.presupuestoOriginal, 0)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Partidas con Ahorro</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {ahorrosDetallados.filter((item) => item.ahorro > 0).length}/{ahorrosDetallados.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análisis Detallado de Ahorros por Partida</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partida</TableHead>
                    <TableHead>Presupuesto Original</TableHead>
                    <TableHead>Costo Real</TableHead>
                    <TableHead>Ahorro</TableHead>
                    <TableHead>% Ahorro</TableHead>
                    <TableHead>Motivo del Ahorro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ahorrosDetallados.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.partida}</TableCell>
                      <TableCell>S/{item.presupuestoOriginal.toLocaleString()}</TableCell>
                      <TableCell>S/{item.costoReal.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.ahorro > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <span className="h-4 w-4" />
                          )}
                          <span className={item.ahorro > 0 ? "text-green-600 font-bold" : "text-gray-600"}>
                            S/{item.ahorro.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.porcentajeAhorro > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.porcentajeAhorro.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="riesgos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Riesgos Críticos</p>
                    <p className="text-2xl font-bold">{riesgos.filter((r) => r.nivel === "Crítico").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Riesgos Activos</p>
                    <p className="text-2xl font-bold">{riesgos.filter((r) => r.estado === "Activo").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Riesgos Mitigados</p>
                    <p className="text-2xl font-bold">{riesgos.filter((r) => r.estado === "Mitigado").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Riesgos</p>
                    <p className="text-2xl font-bold">{riesgos.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Matriz de Riesgos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Probabilidad</TableHead>
                    <TableHead>Impacto</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Mitigación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riesgos.map((riesgo) => (
                    <TableRow key={riesgo.id}>
                      <TableCell className="font-medium">{riesgo.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{riesgo.probabilidad}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{riesgo.impacto}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={obtenerColorRiesgo(riesgo.nivel)}>{riesgo.nivel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={obtenerColorEstadoRiesgo(riesgo.estado)}>{riesgo.estado}</Badge>
                      </TableCell>
                      <TableCell>{riesgo.responsable}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{new Date(riesgo.fechaIdentificacion).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm max-w-xs">{riesgo.mitigacion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calidad" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inspecciones Pasadas</p>
                    <p className="text-2xl font-bold">
                      {indicadoresKPI.calidad.inspeccionesPasadas}/{indicadoresKPI.calidad.inspeccionesTotales}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Defectos Encontrados</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.calidad.defectosEncontrados}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Defectos Corregidos</p>
                    <p className="text-2xl font-bold">
                      {indicadoresKPI.calidad.defectosCorregidos}/{indicadoresKPI.calidad.defectosEncontrados}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfacción Cliente</p>
                    <p className="text-2xl font-bold">{indicadoresKPI.calidad.satisfaccionCliente}/5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Índice de Calidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasa de Inspecciones Exitosas</span>
                      <span>
                        {(
                          (indicadoresKPI.calidad.inspeccionesPasadas / indicadoresKPI.calidad.inspeccionesTotales) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (indicadoresKPI.calidad.inspeccionesPasadas / indicadoresKPI.calidad.inspeccionesTotales) * 100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasa de Corrección de Defectos</span>
                      <span>
                        {(
                          (indicadoresKPI.calidad.defectosCorregidos / indicadoresKPI.calidad.defectosEncontrados) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (indicadoresKPI.calidad.defectosCorregidos / indicadoresKPI.calidad.defectosEncontrados) * 100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Satisfacción del Cliente</span>
                      <span>{((indicadoresKPI.calidad.satisfaccionCliente / 5) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(indicadoresKPI.calidad.satisfaccionCliente / 5) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Calidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Estándares Cumplidos</span>
                    </div>
                    <span className="font-bold text-green-600">80%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Observaciones Pendientes</span>
                    </div>
                    <span className="font-bold text-yellow-600">1</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Calificación General</span>
                    </div>
                    <span className="font-bold text-blue-600">Excelente</span>
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
