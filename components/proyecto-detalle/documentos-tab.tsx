"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Upload,
  FileText,
  Download,
  Search,
  Eye,
  Trash2,
  Calendar,
  User,
  FileImage,
  FileSpreadsheet,
  File,
} from "lucide-react"

const documentos = [
  {
    id: 1,
    nombre: "Contrato Principal Firmado.pdf",
    tipo: "Contrato",
    categoria: "Legal",
    tamaño: "2.4 MB",
    fechaSubida: "2024-01-15",
    subidoPor: "Ana García",
    partida: "General",
    estado: "Aprobado",
    version: "v1.0",
  },
  {
    id: 2,
    nombre: "Planos Arquitectónicos Rev3.dwg",
    tipo: "Plano",
    categoria: "Técnico",
    tamaño: "15.2 MB",
    fechaSubida: "2024-01-20",
    subidoPor: "Carlos Ruiz",
    partida: "Obra Civil",
    estado: "En Revisión",
    version: "v3.0",
  },
  {
    id: 3,
    nombre: "Proforma Instalación Eléctrica - ElectroTech.pdf",
    tipo: "Proforma",
    categoria: "Comercial",
    tamaño: "1.8 MB",
    fechaSubida: "2024-02-01",
    subidoPor: "María López",
    partida: "Instalación Eléctrica",
    estado: "Pendiente",
    version: "v1.0",
  },
  {
    id: 4,
    nombre: "Especificaciones Técnicas HVAC.pdf",
    tipo: "Especificación",
    categoria: "Técnico",
    tamaño: "3.1 MB",
    fechaSubida: "2024-02-05",
    subidoPor: "José Martín",
    partida: "Sistema HVAC",
    estado: "Aprobado",
    version: "v2.1",
  },
  {
    id: 5,
    nombre: "Fotos Avance Semana 8.zip",
    tipo: "Fotografía",
    categoria: "Seguimiento",
    tamaño: "45.7 MB",
    fechaSubida: "2024-02-10",
    subidoPor: "Luis Fernández",
    partida: "Obra Civil",
    estado: "Archivado",
    version: "v1.0",
  },
  {
    id: 6,
    nombre: "Presupuesto Detallado Q1.xlsx",
    tipo: "Presupuesto",
    categoria: "Financiero",
    tamaño: "892 KB",
    fechaSubida: "2024-02-12",
    subidoPor: "Ana García",
    partida: "General",
    estado: "En Revisión",
    version: "v1.2",
  },
]

const obtenerIconoTipo = (tipo: string) => {
  switch (tipo) {
    case "Fotografía":
      return <FileImage className="h-4 w-4 text-green-600" />
    case "Presupuesto":
      return <FileSpreadsheet className="h-4 w-4 text-blue-600" />
    case "Plano":
      return <FileText className="h-4 w-4 text-purple-600" />
    default:
      return <File className="h-4 w-4 text-gray-600" />
  }
}

const obtenerColorEstado = (estado: string) => {
  switch (estado) {
    case "Aprobado":
      return "bg-green-100 text-green-800"
    case "En Revisión":
      return "bg-yellow-100 text-yellow-800"
    case "Pendiente":
      return "bg-blue-100 text-blue-800"
    case "Rechazado":
      return "bg-red-100 text-red-800"
    case "Archivado":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function DocumentosTab() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroPartida, setFiltroPartida] = useState("todas")
  const [busqueda, setBusqueda] = useState("")

  const documentosFiltrados = documentos.filter((doc) => {
    const coincideBusqueda = doc.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideTipo = filtroTipo === "todos" || doc.tipo === filtroTipo
    const coincidePartida = filtroPartida === "todas" || doc.partida === filtroPartida
    return coincideBusqueda && coincideTipo && coincidePartida
  })

  const estadisticas = {
    total: documentos.length,
    aprobados: documentos.filter((d) => d.estado === "Aprobado").length,
    enRevision: documentos.filter((d) => d.estado === "En Revisión").length,
    pendientes: documentos.filter((d) => d.estado === "Pendiente").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Gestión de Documentos</h3>
          <p className="text-muted-foreground">Administra todos los documentos del proyecto</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Subir Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Subir Nuevo Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="archivo">Seleccionar Archivo</Label>
                <Input id="archivo" type="file" multiple />
              </div>
              <div>
                <Label htmlFor="tipo-doc">Tipo de Documento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="proforma">Proforma</SelectItem>
                    <SelectItem value="plano">Plano</SelectItem>
                    <SelectItem value="especificacion">Especificación</SelectItem>
                    <SelectItem value="fotografia">Fotografía</SelectItem>
                    <SelectItem value="presupuesto">Presupuesto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="partida-doc">Partida Asociada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar partida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obra-civil">Obra Civil</SelectItem>
                    <SelectItem value="instalacion-electrica">Instalación Eléctrica</SelectItem>
                    <SelectItem value="sistema-hvac">Sistema HVAC</SelectItem>
                    <SelectItem value="diseno-interior">Diseño Interior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="categoria-doc">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="financiero">Financiero</SelectItem>
                    <SelectItem value="seguimiento">Seguimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Subir Documento</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Documentos</p>
                <p className="text-2xl font-bold">{estadisticas.total}</p>
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
                <p className="text-sm text-muted-foreground">Aprobados</p>
                <p className="text-2xl font-bold">{estadisticas.aprobados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Revisión</p>
                <p className="text-2xl font-bold">{estadisticas.enRevision}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
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
                  <SelectItem value="Contrato">Contratos</SelectItem>
                  <SelectItem value="Proforma">Proformas</SelectItem>
                  <SelectItem value="Plano">Planos</SelectItem>
                  <SelectItem value="Especificación">Especificaciones</SelectItem>
                  <SelectItem value="Fotografía">Fotografías</SelectItem>
                  <SelectItem value="Presupuesto">Presupuestos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroPartida} onValueChange={setFiltroPartida}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Partida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las partidas</SelectItem>
                  <SelectItem value="General">General</SelectItem>
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

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos del Proyecto ({documentosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Partida</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Subido por</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosFiltrados.map((documento) => (
                <TableRow key={documento.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {obtenerIconoTipo(documento.tipo)}
                      <div>
                        <div className="font-medium">{documento.nombre}</div>
                        <div className="text-sm text-muted-foreground">{documento.version}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{documento.tipo}</Badge>
                  </TableCell>
                  <TableCell>{documento.partida}</TableCell>
                  <TableCell>
                    <Badge className={obtenerColorEstado(documento.estado)}>{documento.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{new Date(documento.fechaSubida).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{documento.subidoPor}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{documento.tamaño}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
