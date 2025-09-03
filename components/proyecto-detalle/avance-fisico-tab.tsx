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
import {
  Plus,
  Camera,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin,
  Cloud,
  Eye,
  Download,
} from "lucide-react"

const registrosAvance = [
  {
    id: 1,
    fecha: "2024-02-15",
    partida: "Obra Civil",
    actividad: "Instalación de losa de entrepiso",
    progresoAnterior: 75,
    progresoNuevo: 85,
    trabajadores: 8,
    horasTrabajadas: 64,
    condicionesClimaticas: "Soleado, 22°C",
    responsable: "José Martín",
    observaciones: "Trabajo completado según cronograma. Calidad de acabados excelente.",
    incidentes: [],
    fotos: ["losa_entrepiso_1.jpg", "losa_entrepiso_2.jpg", "losa_entrepiso_3.jpg"],
    ubicacion: "Área principal - Segundo piso",
  },
  {
    id: 2,
    fecha: "2024-02-14",
    partida: "Obra Civil",
    actividad: "Levantamiento de muros divisorios",
    progresoAnterior: 65,
    progresoNuevo: 75,
    trabajadores: 6,
    horasTrabajadas: 48,
    condicionesClimaticas: "Parcialmente nublado, 20°C",
    responsable: "José Martín",
    observaciones: "Avance normal. Se completaron 3 de 4 muros programados.",
    incidentes: [
      {
        tipo: "Menor",
        descripcion: "Retraso de 1 hora por llegada tardía de materiales",
        accionTomada: "Coordinación con proveedor para entregas futuras",
      },
    ],
    fotos: ["muros_divisorios_1.jpg", "muros_divisorios_2.jpg"],
    ubicacion: "Área norte - Primer piso",
  },
  {
    id: 3,
    fecha: "2024-02-13",
    partida: "Instalación Eléctrica",
    actividad: "Instalación de canaletas y cableado",
    progresoAnterior: 45,
    progresoNuevo: 60,
    trabajadores: 4,
    horasTrabajadas: 32,
    condicionesClimaticas: "Lluvioso, 18°C",
    responsable: "Carlos Ruiz",
    observaciones: "Trabajo realizado en interiores. Instalación de canaletas completada en área este.",
    incidentes: [],
    fotos: ["canaletas_1.jpg", "cableado_1.jpg", "cableado_2.jpg"],
    ubicacion: "Área este - Ambos pisos",
  },
  {
    id: 4,
    fecha: "2024-02-12",
    partida: "Obra Civil",
    actividad: "Acabados en muros exteriores",
    progresoAnterior: 55,
    progresoNuevo: 65,
    trabajadores: 5,
    horasTrabajadas: 40,
    condicionesClimaticas: "Soleado, 25°C",
    responsable: "José Martín",
    observaciones: "Aplicación de primera capa de acabado en fachada principal.",
    incidentes: [
      {
        tipo: "Calidad",
        descripcion: "Irregularidades menores en acabado de muro norte",
        accionTomada: "Repaso programado para el día siguiente",
      },
    ],
    fotos: ["acabados_exteriores_1.jpg", "acabados_exteriores_2.jpg"],
    ubicacion: "Fachada principal y norte",
  },
]

const estadisticasGenerales = {
  progresoPromedio: 72,
  totalTrabajadores: 23,
  horasAcumuladas: 1840,
  diasTrabajados: 25,
  incidentesTotales: 3,
  fotosRegistradas: 45,
}

const obtenerIconoIncidente = (tipo: string) => {
  switch (tipo) {
    case "Menor":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "Calidad":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "Seguridad":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />
  }
}

const obtenerColorIncidente = (tipo: string) => {
  switch (tipo) {
    case "Menor":
      return "bg-yellow-100 text-yellow-800"
    case "Calidad":
      return "bg-orange-100 text-orange-800"
    case "Seguridad":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AvanceFisicoTab() {
  const [registroSeleccionado, setRegistroSeleccionado] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Avance Físico del Proyecto</h3>
          <p className="text-muted-foreground">Registro detallado del progreso diario y evidencias fotográficas</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Registro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Avance Físico</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha-registro">Fecha del Registro</Label>
                  <Input id="fecha-registro" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partida-registro">Partida</Label>
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
                <Label htmlFor="actividad-registro">Actividad Realizada</Label>
                <Input id="actividad-registro" placeholder="Ej: Instalación de cableado eléctrico" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="progreso-anterior">Progreso Anterior (%)</Label>
                  <Input id="progreso-anterior" type="number" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progreso-nuevo">Progreso Actual (%)</Label>
                  <Input id="progreso-nuevo" type="number" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trabajadores">Número de Trabajadores</Label>
                  <Input id="trabajadores" type="number" min="1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horas-trabajadas">Horas Trabajadas</Label>
                  <Input id="horas-trabajadas" type="number" min="0" step="0.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condiciones-climaticas">Condiciones Climáticas</Label>
                  <Input id="condiciones-climaticas" placeholder="Ej: Soleado, 22°C" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsable-registro">Responsable</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="ubicacion-registro">Ubicación</Label>
                  <Input id="ubicacion-registro" placeholder="Ej: Área norte - Primer piso" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones-registro">Observaciones</Label>
                <Textarea
                  id="observaciones-registro"
                  placeholder="Descripción detallada del trabajo realizado, calidad, observaciones generales..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Incidentes (Opcional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-incidente">Tipo de Incidente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menor">Menor</SelectItem>
                        <SelectItem value="calidad">Calidad</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                        <SelectItem value="retraso">Retraso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descripcion-incidente">Descripción del Incidente</Label>
                    <Input id="descripcion-incidente" placeholder="Descripción breve del incidente" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accion-tomada">Acción Tomada</Label>
                  <Textarea
                    id="accion-tomada"
                    placeholder="Descripción de las acciones correctivas tomadas..."
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fotos-evidencia">Fotos de Evidencia</Label>
                <Input id="fotos-evidencia" type="file" multiple accept="image/*" />
                <p className="text-sm text-muted-foreground">Sube múltiples fotos del avance realizado</p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Registrar Avance</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Progreso Promedio</p>
                <p className="text-xl font-bold">{estadisticasGenerales.progresoPromedio}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Trabajadores</p>
                <p className="text-xl font-bold">{estadisticasGenerales.totalTrabajadores}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Horas Acumuladas</p>
                <p className="text-xl font-bold">{estadisticasGenerales.horasAcumuladas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Días Trabajados</p>
                <p className="text-xl font-bold">{estadisticasGenerales.diasTrabajados}</p>
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
                <p className="text-xs text-muted-foreground">Incidentes</p>
                <p className="text-xl font-bold">{estadisticasGenerales.incidentesTotales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Camera className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fotos Registradas</p>
                <p className="text-xl font-bold">{estadisticasGenerales.fotosRegistradas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registros de Avance */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Avance Físico</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Actividad</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Trabajadores</TableHead>
                <TableHead>Horas</TableHead>
                <TableHead>Clima</TableHead>
                <TableHead>Incidentes</TableHead>
                <TableHead>Fotos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosAvance.map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(registro.fecha).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{registro.partida}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{registro.actividad}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {registro.ubicacion}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {registro.progresoAnterior}% → {registro.progresoNuevo}%
                      </div>
                      <Progress value={registro.progresoNuevo} className="h-2 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{registro.trabajadores}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{registro.horasTrabajadas}h</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Cloud className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{registro.condicionesClimaticas}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {registro.incidentes.length > 0 ? (
                      <div className="space-y-1">
                        {registro.incidentes.map((incidente, index) => (
                          <Badge key={index} className={obtenerColorIncidente(incidente.tipo)}>
                            {incidente.tipo}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Ninguno</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Camera className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{registro.fotos.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detalle del Registro Seleccionado */}
      {registroSeleccionado && (
        <Card>
          <CardHeader>
            <CardTitle>Detalle del Registro</CardTitle>
          </CardHeader>
          <CardContent>{/* Aquí iría el detalle expandido del registro seleccionado */}</CardContent>
        </Card>
      )}
    </div>
  )
}
