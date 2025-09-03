"use client"

import { useState } from "react"
import { Plus, Eye, Edit, MoreHorizontal, Filter, Download, MapPin, Calendar, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const proyectos = [
  {
    id: 1,
    nombre: "Tienda Mall San Miguel",
    ubicacion: "San Miguel, Lima",
    area: 250,
    tipo: "Tienda",
    responsable: "Ana Quispe",
    estado: "En Progreso",
    progresoFisico: 75,
    progresoFinanciero: 68,
    fechaInicio: "2024-01-15",
    fechaFin: "2024-06-30",
    presupuesto: 180000,
    gastado: 122400,
    prioridad: "Alta",
  },
  {
    id: 2,
    nombre: "Oficina Centro Empresarial",
    ubicacion: "Miraflores, Lima",
    area: 800,
    tipo: "Oficina",
    responsable: "Carlos Mendoza",
    estado: "Pendiente",
    progresoFisico: 0,
    progresoFinanciero: 0,
    fechaInicio: "2024-03-01",
    fechaFin: "2024-09-15",
    presupuesto: 340000,
    gastado: 0,
    prioridad: "Media",
  },
  {
    id: 3,
    nombre: "Tienda Plaza Norte",
    ubicacion: "Independencia, Lima",
    area: 180,
    tipo: "Tienda",
    responsable: "María Huamán",
    estado: "Completado",
    progresoFisico: 100,
    progresoFinanciero: 95,
    fechaInicio: "2023-10-01",
    fechaFin: "2024-02-28",
    presupuesto: 128000,
    gastado: 121600,
    prioridad: "Baja",
  },
  {
    id: 4,
    nombre: "Oficina Regional Arequipa",
    ubicacion: "Cercado, Arequipa",
    area: 1200,
    tipo: "Oficina",
    responsable: "David Vargas",
    estado: "En Progreso",
    progresoFisico: 45,
    progresoFinanciero: 52,
    fechaInicio: "2024-02-01",
    fechaFin: "2024-08-30",
    presupuesto: 480000,
    gastado: 249600,
    prioridad: "Alta",
  },
  {
    id: 5,
    nombre: "Tienda Real Plaza Trujillo",
    ubicacion: "La Esperanza, Trujillo",
    area: 300,
    tipo: "Tienda",
    responsable: "Laura Castillo",
    estado: "En Progreso",
    progresoFisico: 30,
    progresoFinanciero: 25,
    fechaInicio: "2024-02-15",
    fechaFin: "2024-07-15",
    presupuesto: 152000,
    gastado: 38000,
    prioridad: "Media",
  },
]

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "En Progreso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Completado":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pausado":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Cancelado":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

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

export default function ProyectosPage() {
  const [estadoFiltro, setEstadoFiltro] = useState("todos")
  const [responsableFiltro, setResponsableFiltro] = useState("todos")
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const { toast } = useToast()

  const proyectosFiltrados = proyectos.filter((proyecto) => {
    if (estadoFiltro !== "todos" && proyecto.estado !== estadoFiltro) return false
    if (responsableFiltro !== "todos" && proyecto.responsable !== responsableFiltro) return false
    if (tipoFiltro !== "todos" && proyecto.tipo !== tipoFiltro) return false
    if (
      busqueda &&
      !proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      !proyecto.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
    )
      return false
    return true
  })

  const estadisticas = {
    total: proyectos.length,
    pendientes: proyectos.filter((p) => p.estado === "Pendiente").length,
    enProgreso: proyectos.filter((p) => p.estado === "En Progreso").length,
    completados: proyectos.filter((p) => p.estado === "Completado").length,
    presupuestoTotal: proyectos.reduce((sum, p) => sum + p.presupuesto, 0),
    gastadoTotal: proyectos.reduce((sum, p) => sum + p.gastado, 0),
  }

  const handleExportar = () => {
    toast({
      title: "Exportando proyectos",
      description: "Se está generando el archivo Excel con todos los proyectos...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Proyectos</h2>
          <p className="text-muted-foreground mt-1">Gestiona todos los proyectos de tiendas y oficinas</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportar}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Proyecto *</Label>
                  <Input id="nombre" placeholder="Ej: Tienda Mall del Sur" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Local *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tienda">Tienda</SelectItem>
                      <SelectItem value="Oficina">Oficina</SelectItem>
                      <SelectItem value="Restaurante">Restaurante</SelectItem>
                      <SelectItem value="Almacén">Almacén</SelectItem>
                      <SelectItem value="Local Comercial">Local Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación Completa *</Label>
                  <Input id="ubicacion" placeholder="Dirección completa del proyecto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metraje">Metraje (m²) *</Label>
                  <Input id="metraje" type="number" placeholder="250" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato del Local</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuevo">Local Nuevo</SelectItem>
                      <SelectItem value="Remodelación">Remodelación</SelectItem>
                      <SelectItem value="Ampliación">Ampliación</SelectItem>
                      <SelectItem value="Traslado">Traslado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable del Proyecto *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ana Quispe">Ana Quispe</SelectItem>
                      <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                      <SelectItem value="María Huamán">María Huamán</SelectItem>
                      <SelectItem value="David Vargas">David Vargas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto Total (S/) *</Label>
                  <Input id="presupuesto" type="number" placeholder="180000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
                  <Input id="fechaInicio" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de Finalización *</Label>
                  <Input id="fechaFin" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nombre del cliente" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descripcion">Descripción del Proyecto</Label>
                  <Textarea id="descripcion" placeholder="Descripción detallada del proyecto, objetivos y alcance..." />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="observaciones">Observaciones Iniciales</Label>
                  <Textarea
                    id="observaciones"
                    placeholder="Observaciones, restricciones o consideraciones especiales..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Crear Proyecto</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{estadisticas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
                <p className="text-2xl font-bold">{estadisticas.enProgreso}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Badge className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completados</p>
                <p className="text-2xl font-bold">{estadisticas.completados}</p>
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
                <p className="text-sm text-muted-foreground">Presupuesto</p>
                <p className="text-xl font-bold">S/{(estadisticas.presupuestoTotal / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-lg font-bold text-orange-600">S/</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ejecutado</p>
                <p className="text-xl font-bold">S/{(estadisticas.gastadoTotal / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Tabla */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Todos los Proyectos
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Buscar proyectos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Tipos</SelectItem>
                  <SelectItem value="Tienda">Tienda</SelectItem>
                  <SelectItem value="Oficina">Oficina</SelectItem>
                </SelectContent>
              </Select>
              <Select value={responsableFiltro} onValueChange={setResponsableFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Ana Quispe">Ana Quispe</SelectItem>
                  <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                  <SelectItem value="María Huamán">María Huamán</SelectItem>
                  <SelectItem value="David Vargas">David Vargas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Área (m²)</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Progreso Físico</TableHead>
                <TableHead>Progreso Financiero</TableHead>
                <TableHead>Presupuesto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proyectosFiltrados.map((proyecto) => (
                <TableRow key={proyecto.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{proyecto.nombre}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(proyecto.fechaInicio).toLocaleDateString()} -{" "}
                        {new Date(proyecto.fechaFin).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {proyecto.ubicacion}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{proyecto.area}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        proyecto.tipo === "Tienda" ? "border-blue-200 text-blue-700" : "border-green-200 text-green-700"
                      }
                    >
                      {proyecto.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{proyecto.responsable}</TableCell>
                  <TableCell>
                    <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPrioridadColor(proyecto.prioridad)}>
                      {proyecto.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={proyecto.progresoFisico} className="w-16" />
                      <span className="text-sm font-medium">{proyecto.progresoFisico}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={proyecto.progresoFinanciero} className="w-16" />
                      <span className="text-sm font-medium">{proyecto.progresoFinanciero}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">S/{proyecto.presupuesto.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Gastado: S/{proyecto.gastado.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/proyectos/${proyecto.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Proyecto
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Exportar Datos
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
