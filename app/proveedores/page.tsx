"use client"

import { useState } from "react"
import { Plus, Eye, Edit, MoreHorizontal, Star, Phone, Mail, MapPin, Building, Filter, Download } from "lucide-react"
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

const proveedores = [
  {
    id: 1,
    nombre: "Constructora Andes S.A.C.",
    categoria: "Construcción",
    contacto: "Juan Mamani",
    telefono: "+51 1 234 5678",
    email: "contacto@constructoraandes.pe",
    direccion: "Av. Javier Prado 1234, San Isidro, Lima",
    calificacion: 4.8,
    estado: "Activo",
    proyectosActivos: 3,
    facturacionAnual: 680000,
    especialidades: ["Obra Civil", "Reformas", "Instalaciones"],
    fechaRegistro: "2023-01-15",
  },
  {
    id: 2,
    nombre: "Instalaciones Eléctricas Cusco E.I.R.L.",
    categoria: "Electricidad",
    contacto: "Carlos Quispe",
    telefono: "+51 84 987 6543",
    email: "info@electricascusco.pe",
    direccion: "Av. El Sol 456, Cusco",
    calificacion: 4.6,
    estado: "Activo",
    proyectosActivos: 5,
    facturacionAnual: 168000,
    especialidades: ["Instalaciones Eléctricas", "Domótica", "Mantenimiento"],
    fechaRegistro: "2023-03-22",
  },
  {
    id: 3,
    nombre: "Fontanería Arequipa Hermanos S.R.L.",
    categoria: "Fontanería",
    contacto: "María Condori",
    telefono: "+51 54 555 7890",
    email: "contacto@fontaneriaarequipa.pe",
    direccion: "Calle Mercaderes 789, Arequipa",
    calificacion: 4.2,
    estado: "Inactivo",
    proyectosActivos: 0,
    facturacionAnual: 72000,
    especialidades: ["Fontanería", "Calefacción", "Climatización"],
    fechaRegistro: "2022-11-08",
  },
  {
    id: 4,
    nombre: "Pinturas y Acabados Trujillo S.A.C.",
    categoria: "Pintura",
    contacto: "David Flores",
    telefono: "+51 44 444 3210",
    email: "info@pinturastru.pe",
    direccion: "Jr. Pizarro 12, Trujillo",
    calificacion: 4.9,
    estado: "Activo",
    proyectosActivos: 2,
    facturacionAnual: 128000,
    especialidades: ["Pintura", "Decoración", "Revestimientos"],
    fechaRegistro: "2023-05-10",
  },
  {
    id: 5,
    nombre: "Carpintería Lima Norte E.I.R.L.",
    categoria: "Carpintería",
    contacto: "Laura Huamán",
    telefono: "+51 1 333 2109",
    email: "taller@carpinterialima.pe",
    direccion: "Av. Túpac Amaru 34, Los Olivos, Lima",
    calificacion: 4.4,
    estado: "Activo",
    proyectosActivos: 1,
    facturacionAnual: 112000,
    especialidades: ["Carpintería", "Mobiliario", "Puertas y Ventanas"],
    fechaRegistro: "2023-02-18",
  },
]

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Activo":
      return "bg-green-100 text-green-800 border-green-200"
    case "Inactivo":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Suspendido":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
    />
  ))
}

export default function ProveedoresPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas")
  const [estadoFiltro, setEstadoFiltro] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<any>(null)
  const { toast } = useToast()

  const proveedoresFiltrados = proveedores.filter((proveedor) => {
    if (categoriaFiltro !== "todas" && proveedor.categoria !== categoriaFiltro) return false
    if (estadoFiltro !== "todos" && proveedor.estado !== estadoFiltro) return false
    if (
      busqueda &&
      !proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      !proveedor.contacto.toLowerCase().includes(busqueda.toLowerCase())
    )
      return false
    return true
  })

  const estadisticas = {
    total: proveedores.length,
    activos: proveedores.filter((p) => p.estado === "Activo").length,
    proyectosActivos: proveedores.reduce((sum, p) => sum + p.proyectosActivos, 0),
    facturacionTotal: proveedores.reduce((sum, p) => sum + p.facturacionAnual, 0),
  }

  const handleVerDetalles = (proveedor: any) => {
    setProveedorSeleccionado(proveedor)
  }

  const handleExportar = () => {
    toast({
      title: "Exportando proveedores",
      description: "Se está generando el archivo Excel con todos los proveedores...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Proveedores</h2>
          <p className="text-muted-foreground mt-1">Gestiona tu red de proveedores y contratistas</p>
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
                Nuevo Proveedor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Proveedor</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Empresa</Label>
                  <Input id="nombre" placeholder="Ej: Constructora Lima S.A.C." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Construcción">Construcción</SelectItem>
                      <SelectItem value="Electricidad">Electricidad</SelectItem>
                      <SelectItem value="Fontanería">Fontanería</SelectItem>
                      <SelectItem value="Pintura">Pintura</SelectItem>
                      <SelectItem value="Carpintería">Carpintería</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto">Persona de Contacto</Label>
                  <Input id="contacto" placeholder="Nombre del contacto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+51 1 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contacto@empresa.pe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" placeholder="Dirección completa" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="especialidades">Especialidades</Label>
                  <Textarea id="especialidades" placeholder="Describe las especialidades del proveedor..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Registrar Proveedor</Button>
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
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Proveedores</p>
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
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold">{estadisticas.activos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                <p className="text-2xl font-bold">{estadisticas.proyectosActivos}</p>
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
                <p className="text-sm text-muted-foreground">Facturación Anual</p>
                <p className="text-xl font-bold">S/{(estadisticas.facturacionTotal / 1000).toFixed(0)}K</p>
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
              Directorio de Proveedores
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Buscar proveedores..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las Categorías</SelectItem>
                  <SelectItem value="Construcción">Construcción</SelectItem>
                  <SelectItem value="Electricidad">Electricidad</SelectItem>
                  <SelectItem value="Fontanería">Fontanería</SelectItem>
                  <SelectItem value="Pintura">Pintura</SelectItem>
                  <SelectItem value="Carpintería">Carpintería</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Proyectos Activos</TableHead>
                <TableHead>Facturación Anual</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proveedoresFiltrados.map((proveedor) => (
                <TableRow key={proveedor.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{proveedor.nombre}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {proveedor.direccion}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {proveedor.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proveedor.contacto}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {proveedor.telefono}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {proveedor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(proveedor.calificacion)}</div>
                      <span className="text-sm font-medium">{proveedor.calificacion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getEstadoColor(proveedor.estado)}>{proveedor.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium">{proveedor.proyectosActivos}</TableCell>
                  <TableCell className="font-medium">S/{proveedor.facturacionAnual.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerDetalles(proveedor)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Proveedor
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

      {/* Modal de Detalles del Proveedor */}
      <Dialog open={!!proveedorSeleccionado} onOpenChange={() => setProveedorSeleccionado(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
          </DialogHeader>
          {proveedorSeleccionado && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información General</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nombre de la Empresa</Label>
                      <p className="font-medium">{proveedorSeleccionado.nombre}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Categoría</Label>
                      <p>{proveedorSeleccionado.categoria}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                      <Badge className={getEstadoColor(proveedorSeleccionado.estado)}>
                        {proveedorSeleccionado.estado}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Fecha de Registro</Label>
                      <p>{new Date(proveedorSeleccionado.fechaRegistro).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Persona de Contacto</Label>
                      <p className="font-medium">{proveedorSeleccionado.contacto}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
                      <p>{proveedorSeleccionado.telefono}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p>{proveedorSeleccionado.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Dirección</Label>
                      <p>{proveedorSeleccionado.direccion}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{proveedorSeleccionado.calificacion}</div>
                    <div className="flex justify-center mt-1">{renderStars(proveedorSeleccionado.calificacion)}</div>
                    <div className="text-sm text-muted-foreground">Calificación</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{proveedorSeleccionado.proyectosActivos}</div>
                    <div className="text-sm text-muted-foreground">Proyectos Activos</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      S/{(proveedorSeleccionado.facturacionAnual / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Facturación Anual</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Especialidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {proveedorSeleccionado.especialidades.map((especialidad: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                        {especialidad}
                      </Badge>
                    ))}
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
