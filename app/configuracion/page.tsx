"use client"

import { useState } from "react"
import { Building, Bell, Users, Shield, Database, Mail, Globe, Save, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const usuarios = [
  {
    id: 1,
    nombre: "Ana Quispe",
    email: "ana.quispe@empresa.pe",
    rol: "Administrador",
    estado: "Activo",
    ultimoAcceso: "2024-03-10",
    proyectosAsignados: 3,
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@empresa.pe",
    rol: "Gerente de Proyecto",
    estado: "Activo",
    ultimoAcceso: "2024-03-09",
    proyectosAsignados: 5,
  },
  {
    id: 3,
    nombre: "María Huamán",
    email: "maria.huaman@empresa.pe",
    rol: "Supervisor",
    estado: "Activo",
    ultimoAcceso: "2024-03-08",
    proyectosAsignados: 2,
  },
  {
    id: 4,
    nombre: "David Vargas",
    email: "david.vargas@empresa.pe",
    rol: "Técnico",
    estado: "Inactivo",
    ultimoAcceso: "2024-02-28",
    proyectosAsignados: 1,
  },
]

const getRolColor = (rol: string) => {
  switch (rol) {
    case "Administrador":
      return "bg-red-100 text-red-800 border-red-200"
    case "Gerente de Proyecto":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Supervisor":
      return "bg-green-100 text-green-800 border-green-200"
    case "Técnico":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

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

export default function ConfiguracionPage() {
  const [tabActiva, setTabActiva] = useState("general")
  const [configuracion, setConfiguracion] = useState({
    // Configuración General
    nombreEmpresa: "Constructora Perú S.A.C.",
    direccion: "Av. Javier Prado 1234, San Isidro, Lima",
    telefono: "+51 1 234 5678",
    email: "info@constructoraperu.pe",
    sitioWeb: "www.constructoraperu.pe",
    moneda: "PEN",
    idioma: "es",
    zonaHoraria: "America/Lima",

    // Notificaciones
    emailNotificaciones: true,
    notificacionesProyecto: true,
    notificacionesFinanzas: true,
    reportesAutomaticos: true,
    frecuenciaReportes: "semanal",

    // Seguridad
    autenticacionDosFactor: false,
    sesionExpiracion: 480, // minutos
    backupAutomatico: true,
    frecuenciaBackup: "diario",
  })

  const { toast } = useToast()

  const handleGuardarConfiguracion = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados correctamente.",
    })
  }

  const handleExportarConfiguracion = () => {
    toast({
      title: "Exportando configuración",
      description: "Se está generando el archivo de configuración...",
    })
  }

  const handleImportarConfiguracion = () => {
    toast({
      title: "Importando configuración",
      description: "Se está procesando el archivo de configuración...",
    })
  }

  const handleReiniciarSistema = () => {
    toast({
      title: "Reiniciando sistema",
      description: "El sistema se reiniciará en unos momentos...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Configuración</h2>
          <p className="text-muted-foreground mt-1">Configuración general del sistema y administración</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportarConfiguracion}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Config
          </Button>
          <Button variant="outline" onClick={handleImportarConfiguracion}>
            <Upload className="h-4 w-4 mr-2" />
            Importar Config
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGuardarConfiguracion}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs value={tabActiva} onValueChange={setTabActiva} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">
            General
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="data-[state=active]:bg-white">
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="data-[state=active]:bg-white">
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="data-[state=active]:bg-white">
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="sistema" className="data-[state=active]:bg-white">
            Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Información de la Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
                  <Input
                    id="nombreEmpresa"
                    value={configuracion.nombreEmpresa}
                    onChange={(e) => setConfiguracion({ ...configuracion, nombreEmpresa: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Textarea
                    id="direccion"
                    value={configuracion.direccion}
                    onChange={(e) => setConfiguracion({ ...configuracion, direccion: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={configuracion.telefono}
                      onChange={(e) => setConfiguracion({ ...configuracion, telefono: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={configuracion.email}
                      onChange={(e) => setConfiguracion({ ...configuracion, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitioWeb">Sitio Web</Label>
                  <Input
                    id="sitioWeb"
                    value={configuracion.sitioWeb}
                    onChange={(e) => setConfiguracion({ ...configuracion, sitioWeb: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configuración Regional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="moneda">Moneda</Label>
                  <Select
                    value={configuracion.moneda}
                    onValueChange={(value) => setConfiguracion({ ...configuracion, moneda: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PEN">Sol Peruano (PEN)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select
                    value={configuracion.idioma}
                    onValueChange={(value) => setConfiguracion({ ...configuracion, idioma: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="qu">Quechua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zonaHoraria">Zona Horaria</Label>
                  <Select
                    value={configuracion.zonaHoraria}
                    onValueChange={(value) => setConfiguracion({ ...configuracion, zonaHoraria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Lima">Lima (GMT-5)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notificaciones">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones por Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotificaciones">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones generales por email</p>
                  </div>
                  <Switch
                    id="emailNotificaciones"
                    checked={configuracion.emailNotificaciones}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, emailNotificaciones: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificacionesProyecto">Notificaciones de Proyecto</Label>
                    <p className="text-sm text-muted-foreground">Alertas sobre cambios en proyectos</p>
                  </div>
                  <Switch
                    id="notificacionesProyecto"
                    checked={configuracion.notificacionesProyecto}
                    onCheckedChange={(checked) =>
                      setConfiguracion({ ...configuracion, notificacionesProyecto: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificacionesFinanzas">Notificaciones Financieras</Label>
                    <p className="text-sm text-muted-foreground">Alertas sobre pagos y presupuestos</p>
                  </div>
                  <Switch
                    id="notificacionesFinanzas"
                    checked={configuracion.notificacionesFinanzas}
                    onCheckedChange={(checked) =>
                      setConfiguracion({ ...configuracion, notificacionesFinanzas: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Reportes Automáticos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reportesAutomaticos">Reportes Automáticos</Label>
                    <p className="text-sm text-muted-foreground">Generar reportes automáticamente</p>
                  </div>
                  <Switch
                    id="reportesAutomaticos"
                    checked={configuracion.reportesAutomaticos}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, reportesAutomaticos: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frecuenciaReportes">Frecuencia de Reportes</Label>
                  <Select
                    value={configuracion.frecuenciaReportes}
                    onValueChange={(value) => setConfiguracion({ ...configuracion, frecuenciaReportes: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Administración de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="Buscar usuarios..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Gerente de Proyecto">Gerente</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Técnico">Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Proyectos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nombre}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Badge className={getRolColor(usuario.rol)}>{usuario.rol}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoColor(usuario.estado)}>{usuario.estado}</Badge>
                      </TableCell>
                      <TableCell>{new Date(usuario.ultimoAcceso).toLocaleDateString()}</TableCell>
                      <TableCell className="text-center">{usuario.proyectosAsignados}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
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

        <TabsContent value="seguridad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configuración de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autenticacionDosFactor">Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">Requiere verificación adicional para el acceso</p>
                  </div>
                  <Switch
                    id="autenticacionDosFactor"
                    checked={configuracion.autenticacionDosFactor}
                    onCheckedChange={(checked) =>
                      setConfiguracion({ ...configuracion, autenticacionDosFactor: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sesionExpiracion">Expiración de Sesión (minutos)</Label>
                  <Input
                    id="sesionExpiracion"
                    type="number"
                    value={configuracion.sesionExpiracion}
                    onChange={(e) =>
                      setConfiguracion({ ...configuracion, sesionExpiracion: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup y Recuperación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="backupAutomatico">Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">Realizar copias de seguridad automáticas</p>
                  </div>
                  <Switch
                    id="backupAutomatico"
                    checked={configuracion.backupAutomatico}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, backupAutomatico: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frecuenciaBackup">Frecuencia de Backup</Label>
                  <Select
                    value={configuracion.frecuenciaBackup}
                    onValueChange={(value) => setConfiguracion({ ...configuracion, frecuenciaBackup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                    </SelectContent>\
