"use client"

import { useState } from "react"
import {
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Download,
  Search,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const registrosAuditoria = [
  {
    id: 1,
    usuario: "Ana García",
    accion: "Inicio de Sesión",
    modulo: "Sistema",
    descripcion: "Usuario inició sesión exitosamente",
    fecha: "2024-03-10 09:15:23",
    ip: "192.168.1.100",
    resultado: "Exitoso",
    detalles: "Navegador: Chrome 122.0, SO: Windows 11",
  },
  {
    id: 2,
    usuario: "Carlos Ruiz",
    accion: "Modificar Proyecto",
    modulo: "Proyectos",
    descripcion: "Actualizó el progreso del proyecto 'Tienda Plaza Centro'",
    fecha: "2024-03-10 10:30:45",
    ip: "192.168.1.105",
    resultado: "Exitoso",
    detalles: "Cambió progreso físico de 70% a 75%",
  },
  {
    id: 3,
    usuario: "Sistema",
    accion: "Backup Automático",
    modulo: "Sistema",
    descripcion: "Backup automático de base de datos completado",
    fecha: "2024-03-10 02:00:00",
    ip: "127.0.0.1",
    resultado: "Exitoso",
    detalles: "Tamaño del backup: 2.4 GB, Duración: 15 minutos",
  },
  {
    id: 4,
    usuario: "María López",
    accion: "Intento de Acceso",
    modulo: "Seguridad",
    descripcion: "Intento de acceso con credenciales incorrectas",
    fecha: "2024-03-09 16:45:12",
    ip: "192.168.1.110",
    resultado: "Fallido",
    detalles: "3 intentos fallidos consecutivos",
  },
  {
    id: 5,
    usuario: "David Martín",
    accion: "Subir Documento",
    modulo: "Documentos",
    descripcion: "Subió nuevo documento al proyecto 'Oficina Regional Norte'",
    fecha: "2024-03-09 14:20:33",
    ip: "192.168.1.115",
    resultado: "Exitoso",
    detalles: "Archivo: planos_revision_v2.pdf, Tamaño: 1.8 MB",
  },
  {
    id: 6,
    usuario: "Ana García",
    accion: "Generar Reporte",
    modulo: "Reportes",
    descripcion: "Generó reporte financiero mensual",
    fecha: "2024-03-09 11:10:15",
    ip: "192.168.1.100",
    resultado: "Exitoso",
    detalles: "Reporte: Análisis Financiero Q1 2024, Formato: PDF",
  },
  {
    id: 7,
    usuario: "Sistema",
    accion: "Alerta de Seguridad",
    modulo: "Seguridad",
    descripcion: "Detectado acceso desde ubicación inusual",
    fecha: "2024-03-08 20:30:00",
    ip: "203.0.113.45",
    resultado: "Alerta",
    detalles: "Ubicación: Barcelona (inusual para usuario Ana García)",
  },
  {
    id: 8,
    usuario: "Carlos Ruiz",
    accion: "Aprobar Pago",
    modulo: "Finanzas",
    descripcion: "Aprobó pago a proveedor Construcciones García S.L.",
    fecha: "2024-03-08 15:45:20",
    ip: "192.168.1.105",
    resultado: "Exitoso",
    detalles: "Monto: €45,000, Concepto: Materiales de construcción",
  },
]

const alertasSeguridad = [
  {
    id: 1,
    tipo: "Acceso Sospechoso",
    descripcion: "Múltiples intentos de acceso fallidos desde IP externa",
    fecha: "2024-03-10 08:30:00",
    severidad: "Alta",
    estado: "Activa",
    ip: "203.0.113.25",
  },
  {
    id: 2,
    tipo: "Sesión Expirada",
    descripcion: "Usuario mantuvo sesión activa por más de 8 horas",
    fecha: "2024-03-09 18:00:00",
    severidad: "Media",
    estado: "Resuelta",
    usuario: "David Martín",
  },
  {
    id: 3,
    tipo: "Cambio de Configuración",
    descripcion: "Modificación en configuración de seguridad del sistema",
    fecha: "2024-03-08 14:15:00",
    severidad: "Media",
    estado: "Revisada",
    usuario: "Ana García",
  },
  {
    id: 4,
    tipo: "Backup Fallido",
    descripcion: "Error en backup automático de base de datos",
    fecha: "2024-03-07 02:00:00",
    severidad: "Alta",
    estado: "Resuelta",
    detalles: "Error de espacio en disco",
  },
]

const getResultadoColor = (resultado: string) => {
  switch (resultado) {
    case "Exitoso":
      return "bg-green-100 text-green-800 border-green-200"
    case "Fallido":
      return "bg-red-100 text-red-800 border-red-200"
    case "Alerta":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Pendiente":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getSeveridadColor = (severidad: string) => {
  switch (severidad) {
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

const getEstadoAlertaColor = (estado: string) => {
  switch (estado) {
    case "Activa":
      return "bg-red-100 text-red-800 border-red-200"
    case "Resuelta":
      return "bg-green-100 text-green-800 border-green-200"
    case "Revisada":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getResultadoIcon = (resultado: string) => {
  switch (resultado) {
    case "Exitoso":
      return <CheckCircle className="h-4 w-4" />
    case "Fallido":
      return <AlertTriangle className="h-4 w-4" />
    case "Alerta":
      return <AlertTriangle className="h-4 w-4" />
    case "Pendiente":
      return <Clock className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function AuditoriaPage() {
  const [tabActiva, setTabActiva] = useState("registros")
  const [moduloFiltro, setModuloFiltro] = useState("todos")
  const [resultadoFiltro, setResultadoFiltro] = useState("todos")
  const [usuarioFiltro, setUsuarioFiltro] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const { toast } = useToast()

  const registrosFiltrados = registrosAuditoria.filter((registro) => {
    if (moduloFiltro !== "todos" && registro.modulo !== moduloFiltro) return false
    if (resultadoFiltro !== "todos" && registro.resultado !== resultadoFiltro) return false
    if (usuarioFiltro !== "todos" && registro.usuario !== usuarioFiltro) return false
    if (
      busqueda &&
      !registro.descripcion.toLowerCase().includes(busqueda.toLowerCase()) &&
      !registro.accion.toLowerCase().includes(busqueda.toLowerCase())
    )
      return false
    return true
  })

  const estadisticas = {
    totalRegistros: registrosAuditoria.length,
    registrosHoy: registrosAuditoria.filter((r) => r.fecha.startsWith("2024-03-10")).length,
    alertasActivas: alertasSeguridad.filter((a) => a.estado === "Activa").length,
    accesosExitosos: registrosAuditoria.filter((r) => r.resultado === "Exitoso").length,
  }

  const actividadPorModulo = [
    { modulo: "Sistema", cantidad: 3, porcentaje: 37.5 },
    { modulo: "Proyectos", cantidad: 2, porcentaje: 25 },
    { modulo: "Documentos", cantidad: 1, porcentaje: 12.5 },
    { modulo: "Finanzas", cantidad: 1, porcentaje: 12.5 },
    { modulo: "Reportes", cantidad: 1, porcentaje: 12.5 },
  ]

  const handleExportarRegistros = () => {
    toast({
      title: "Exportando registros",
      description: "Se está generando el archivo con los registros de auditoría...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Auditoría</h2>
          <p className="text-muted-foreground mt-1">Monitoreo de actividades y seguridad del sistema</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportarRegistros}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Registros
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Shield className="h-4 w-4 mr-2" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Registros</p>
                <p className="text-2xl font-bold">{estadisticas.totalRegistros}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registros Hoy</p>
                <p className="text-2xl font-bold">{estadisticas.registrosHoy}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alertas Activas</p>
                <p className="text-2xl font-bold">{estadisticas.alertasActivas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accesos Exitosos</p>
                <p className="text-2xl font-bold">{estadisticas.accesosExitosos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="registros" className="data-[state=active]:bg-white">
            Registros de Auditoría
          </TabsTrigger>
          <TabsTrigger value="alertas" className="data-[state=active]:bg-white">
            Alertas de Seguridad
          </TabsTrigger>
          <TabsTrigger value="estadisticas" className="data-[state=active]:bg-white">
            Estadísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registros">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Registro de Actividades
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar actividades..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="w-64 pl-10"
                    />
                  </div>
                  <Select value={moduloFiltro} onValueChange={setModuloFiltro}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los Módulos</SelectItem>
                      <SelectItem value="Sistema">Sistema</SelectItem>
                      <SelectItem value="Proyectos">Proyectos</SelectItem>
                      <SelectItem value="Documentos">Documentos</SelectItem>
                      <SelectItem value="Finanzas">Finanzas</SelectItem>
                      <SelectItem value="Reportes">Reportes</SelectItem>
                      <SelectItem value="Seguridad">Seguridad</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={resultadoFiltro} onValueChange={setResultadoFiltro}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Resultado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Exitoso">Exitoso</SelectItem>
                      <SelectItem value="Fallido">Fallido</SelectItem>
                      <SelectItem value="Alerta">Alerta</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={usuarioFiltro} onValueChange={setUsuarioFiltro}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Ana García">Ana García</SelectItem>
                      <SelectItem value="Carlos Ruiz">Carlos Ruiz</SelectItem>
                      <SelectItem value="María López">María López</SelectItem>
                      <SelectItem value="David Martín">David Martín</SelectItem>
                      <SelectItem value="Sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Resultado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrosFiltrados.map((registro) => (
                    <TableRow key={registro.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{registro.usuario}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{registro.accion}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {registro.modulo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{registro.descripcion}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{registro.fecha}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{registro.ip}</TableCell>
                      <TableCell>
                        <Badge className={getResultadoColor(registro.resultado)}>
                          <div className="flex items-center gap-1">
                            {getResultadoIcon(registro.resultado)}
                            {registro.resultado}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasSeguridad.map((alerta) => (
                  <div key={alerta.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{alerta.tipo}</h3>
                          <Badge className={getSeveridadColor(alerta.severidad)}>{alerta.severidad}</Badge>
                          <Badge className={getEstadoAlertaColor(alerta.estado)}>{alerta.estado}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alerta.descripcion}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {alerta.fecha}
                          </div>
                          {alerta.usuario && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {alerta.usuario}
                            </div>
                          )}
                          {alerta.ip && (
                            <div className="flex items-center gap-1">
                              <span>IP:</span>
                              {alerta.ip}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {alerta.estado === "Activa" && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Resolver
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Actividad por Módulo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actividadPorModulo.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">{item.modulo}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.porcentaje}%` }}></div>
                        </div>
                        <span className="text-sm font-medium w-8">{item.cantidad}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Accesos Exitosos</p>
                      <p className="text-2xl font-bold text-green-600">95.2%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Intentos Fallidos</p>
                      <p className="text-2xl font-bold text-red-600">4.8%</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Sesiones Activas</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Alertas Pendientes</p>
                      <p className="text-2xl font-bold text-yellow-600">1</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
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
