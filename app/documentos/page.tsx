"use client"

import { useState } from "react"
import {
  Eye,
  Download,
  MoreHorizontal,
  FileText,
  ImageIcon,
  File,
  Upload,
  Filter,
  Search,
  Calendar,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const documentos = [
  {
    id: 1,
    nombre: "Planos Arquitectónicos - Mall San Miguel",
    tipo: "Planos",
    categoria: "Técnico",
    proyecto: "Tienda Mall San Miguel",
    version: "v2.1",
    estado: "Aprobado",
    fechaCreacion: "2024-01-15",
    fechaModificacion: "2024-02-20",
    autor: "Ana Quispe",
    tamaño: "2.4 MB",
    extension: "pdf",
    descripcion: "Planos arquitectónicos actualizados con las últimas modificaciones aprobadas por el cliente.",
  },
  {
    id: 2,
    nombre: "Contrato Proveedor - Constructora Andes",
    tipo: "Contrato",
    categoria: "Legal",
    proyecto: "Oficina Centro Empresarial",
    version: "v1.0",
    estado: "En Revisión",
    fechaCreacion: "2024-02-01",
    fechaModificacion: "2024-02-15",
    autor: "Carlos Mendoza",
    tamaño: "1.8 MB",
    extension: "pdf",
    descripcion: "Contrato de servicios con Constructora Andes para el proyecto Centro Empresarial.",
  },
  {
    id: 3,
    nombre: "Presupuesto Detallado Q1 2024",
    tipo: "Presupuesto",
    categoria: "Financiero",
    proyecto: "Tienda Plaza Norte",
    version: "v3.0",
    estado: "Aprobado",
    fechaCreacion: "2024-01-10",
    fechaModificacion: "2024-01-25",
    autor: "María Huamán",
    tamaño: "856 KB",
    extension: "xlsx",
    descripcion: "Presupuesto detallado para el primer trimestre con desglose por partidas.",
  },
  {
    id: 4,
    nombre: "Certificado de Calidad - Materiales",
    tipo: "Certificado",
    categoria: "Calidad",
    proyecto: "Oficina Regional Arequipa",
    version: "v1.0",
    estado: "Vigente",
    fechaCreacion: "2024-02-10",
    fechaModificacion: "2024-02-10",
    autor: "David Vargas",
    tamaño: "1.2 MB",
    extension: "pdf",
    descripcion: "Certificados de calidad de los materiales utilizados en la construcción.",
  },
  {
    id: 5,
    nombre: "Informe de Avance Semanal",
    tipo: "Informe",
    categoria: "Seguimiento",
    proyecto: "Tienda Real Plaza Trujillo",
    version: "v1.5",
    estado: "Borrador",
    fechaCreacion: "2024-02-18",
    fechaModificacion: "2024-02-22",
    autor: "Laura Castillo",
    tamaño: "3.1 MB",
    extension: "docx",
    descripcion: "Informe semanal de avance del proyecto con fotografías y métricas de progreso.",
  },
]

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Aprobado":
      return "bg-green-100 text-green-800 border-green-200"
    case "En Revisión":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Borrador":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Vigente":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Vencido":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getIconoTipo = (extension: string) => {
  switch (extension) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-600" />
    case "xlsx":
    case "xls":
      return <File className="h-5 w-5 text-green-600" />
    case "docx":
    case "doc":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "jpg":
    case "png":
    case "jpeg":
      return <ImageIcon className="h-5 w-5 text-purple-600" />
    default:
      return <File className="h-5 w-5 text-gray-600" />
  }
}

export default function DocumentosPage() {
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [estadoFiltro, setEstadoFiltro] = useState("todos")
  const [proyectoFiltro, setProyectoFiltro] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<any>(null)
  const { toast } = useToast()

  const documentosFiltrados = documentos.filter((documento) => {
    if (tipoFiltro !== "todos" && documento.tipo !== tipoFiltro) return false
    if (estadoFiltro !== "todos" && documento.estado !== estadoFiltro) return false
    if (proyectoFiltro !== "todos" && documento.proyecto !== proyectoFiltro) return false
    if (
      busqueda &&
      !documento.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      !documento.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    )
      return false
    return true
  })

  const estadisticas = {
    total: documentos.length,
    aprobados: documentos.filter((d) => d.estado === "Aprobado").length,
    enRevision: documentos.filter((d) => d.estado === "En Revisión").length,
    tamañoTotal: documentos.reduce(
      (sum, d) => sum + Number.parseFloat(d.tamaño.replace(" MB", "").replace(" KB", "")),
      0,
    ),
  }

  const handleVerDetalles = (documento: any) => {
    setDocumentoSeleccionado(documento)
  }

  const handleDescargar = (documento: any) => {
    toast({
      title: "Descargando documento",
      description: `Descargando ${documento.nombre}...`,
    })
  }

  const handleSubirDocumento = () => {
    toast({
      title: "Subiendo documento",
      description: "El documento se está procesando y será añadido a la biblioteca...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Documentos</h2>
          <p className="text-muted-foreground mt-1">Biblioteca centralizada de documentos del proyecto</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Lista
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Subir Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Subir Nuevo Documento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-sm text-muted-foreground">Soporta PDF, DOC, XLS, JPG, PNG (máx. 10MB)</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Seleccionar Archivos
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Documento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planos">Planos</SelectItem>
                        <SelectItem value="Contrato">Contrato</SelectItem>
                        <SelectItem value="Presupuesto">Presupuesto</SelectItem>
                        <SelectItem value="Certificado">Certificado</SelectItem>
                        <SelectItem value="Informe">Informe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proyecto">Proyecto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proyecto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tienda Mall San Miguel">Tienda Mall San Miguel</SelectItem>
                        <SelectItem value="Oficina Centro Empresarial">Oficina Centro Empresarial</SelectItem>
                        <SelectItem value="Tienda Plaza Norte">Tienda Plaza Norte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea id="descripcion" placeholder="Describe el contenido del documento..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubirDocumento}>
                  Subir Documento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
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

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Badge className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aprobados</p>
                <p className="text-2xl font-bold">{estadisticas.aprobados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Revisión</p>
                <p className="text-2xl font-bold">{estadisticas.enRevision}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <File className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Almacenamiento</p>
                <p className="text-2xl font-bold">{estadisticas.tamañoTotal.toFixed(1)} MB</p>
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
              Biblioteca de Documentos
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar documentos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Tipos</SelectItem>
                  <SelectItem value="Planos">Planos</SelectItem>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                  <SelectItem value="Presupuesto">Presupuesto</SelectItem>
                  <SelectItem value="Certificado">Certificado</SelectItem>
                  <SelectItem value="Informe">Informe</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  <SelectItem value="Aprobado">Aprobado</SelectItem>
                  <SelectItem value="En Revisión">En Revisión</SelectItem>
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="Vigente">Vigente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Versión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha Modificación</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosFiltrados.map((documento) => (
                <TableRow key={documento.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getIconoTipo(documento.extension)}
                      <div>
                        <div className="font-medium">{documento.nombre}</div>
                        <div className="text-sm text-muted-foreground">{documento.descripcion.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {documento.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{documento.proyecto}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-gray-200 text-gray-700">
                      {documento.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getEstadoColor(documento.estado)}>{documento.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {documento.autor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(documento.fechaModificacion).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{documento.tamaño}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerDetalles(documento)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDescargar(documento)}>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Upload className="h-4 w-4 mr-2" />
                          Nueva Versión
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

      {/* Modal de Detalles del Documento */}
      <Dialog open={!!documentoSeleccionado} onOpenChange={() => setDocumentoSeleccionado(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Documento</DialogTitle>
          </DialogHeader>
          {documentoSeleccionado && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">{getIconoTipo(documentoSeleccionado.extension)}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{documentoSeleccionado.nombre}</h3>
                  <p className="text-muted-foreground mt-1">{documentoSeleccionado.descripcion}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge className={getEstadoColor(documentoSeleccionado.estado)}>
                      {documentoSeleccionado.estado}
                    </Badge>
                    <Badge variant="outline">{documentoSeleccionado.version}</Badge>
                    <span className="text-sm text-muted-foreground">{documentoSeleccionado.tamaño}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleDescargar(documentoSeleccionado)}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Vista Previa
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información del Documento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
                      <p>{documentoSeleccionado.tipo}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Categoría</Label>
                      <p>{documentoSeleccionado.categoria}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Proyecto</Label>
                      <p className="font-medium">{documentoSeleccionado.proyecto}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Extensión</Label>
                      <p className="uppercase">{documentoSeleccionado.extension}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información de Versión</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Autor</Label>
                      <p className="font-medium">{documentoSeleccionado.autor}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Fecha de Creación</Label>
                      <p>{new Date(documentoSeleccionado.fechaCreacion).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Última Modificación</Label>
                      <p>{new Date(documentoSeleccionado.fechaModificacion).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Versión Actual</Label>
                      <p className="font-medium">{documentoSeleccionado.version}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historial de Versiones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <div className="font-medium">v2.1 (Actual)</div>
                        <div className="text-sm text-muted-foreground">
                          Actualizado el {new Date(documentoSeleccionado.fechaModificacion).toLocaleDateString()} por{" "}
                          {documentoSeleccionado.autor}
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Actual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">v2.0</div>
                        <div className="text-sm text-muted-foreground">
                          Actualizado el 10/02/2024 por {documentoSeleccionado.autor}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Restaurar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">v1.0</div>
                        <div className="text-sm text-muted-foreground">
                          Creado el {new Date(documentoSeleccionado.fechaCreacion).toLocaleDateString()} por{" "}
                          {documentoSeleccionado.autor}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Restaurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
