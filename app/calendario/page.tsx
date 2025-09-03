"use client"

import { useState } from "react"
import { Plus, CalendarIcon, Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const eventos = [
  {
    id: 1,
    titulo: "Reunión de Seguimiento - Mall San Miguel",
    tipo: "Reunión",
    proyecto: "Tienda Mall San Miguel",
    fecha: "2024-03-15",
    hora: "10:00",
    duracion: 60,
    ubicacion: "Oficina Principal - San Isidro",
    participantes: ["Ana Quispe", "Carlos Mendoza"],
    descripcion: "Revisión semanal del progreso del proyecto y próximos hitos.",
    estado: "Confirmado",
  },
  {
    id: 2,
    titulo: "Inspección Técnica - Instalaciones Eléctricas",
    tipo: "Inspección",
    proyecto: "Oficina Centro Empresarial",
    fecha: "2024-03-16",
    hora: "14:30",
    duracion: 120,
    ubicacion: "Obra - Miraflores",
    participantes: ["David Vargas", "Inspector Municipal"],
    descripcion: "Inspección de las instalaciones eléctricas antes de la conexión definitiva.",
    estado: "Pendiente",
  },
  {
    id: 3,
    titulo: "Entrega de Materiales",
    tipo: "Actividad",
    proyecto: "Tienda Plaza Norte",
    fecha: "2024-03-17",
    hora: "08:00",
    duracion: 240,
    ubicacion: "Obra - Independencia",
    participantes: ["María Huamán", "Proveedor Materiales"],
    descripcion: "Recepción y verificación de materiales para la fase final del proyecto.",
    estado: "Confirmado",
  },
  {
    id: 4,
    titulo: "Hito: Finalización Estructura",
    tipo: "Hito",
    proyecto: "Oficina Regional Arequipa",
    fecha: "2024-03-20",
    hora: "12:00",
    duracion: 30,
    ubicacion: "Obra - Cercado, Arequipa",
    participantes: ["Laura Castillo", "Equipo Construcción"],
    descripcion: "Finalización de la estructura principal del edificio.",
    estado: "Programado",
  },
  {
    id: 5,
    titulo: "Reunión con Cliente",
    tipo: "Reunión",
    proyecto: "Tienda Real Plaza Trujillo",
    fecha: "2024-03-22",
    hora: "16:00",
    duracion: 90,
    ubicacion: "Oficina Cliente - Trujillo",
    participantes: ["Ana Quispe", "Cliente", "Arquitecto"],
    descripcion: "Presentación de avances y aprobación de cambios menores en el diseño.",
    estado: "Confirmado",
  },
]

const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Reunión":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Inspección":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Actividad":
      return "bg-green-100 text-green-800 border-green-200"
    case "Hito":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Confirmado":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Programado":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Cancelado":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function CalendarioPage() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [proyectoFiltro, setProyectoFiltro] = useState("todos")
  const { toast } = useToast()

  const eventosFiltrados = eventos.filter((evento) => {
    if (tipoFiltro !== "todos" && evento.tipo !== tipoFiltro) return false
    if (proyectoFiltro !== "todos" && evento.proyecto !== proyectoFiltro) return false
    return true
  })

  const eventosHoy = eventos.filter((evento) => evento.fecha === new Date().toISOString().split("T")[0])
  const proximosEventos = eventos.filter((evento) => new Date(evento.fecha) > new Date()).slice(0, 5)

  const estadisticas = {
    totalEventos: eventos.length,
    eventosHoy: eventosHoy.length,
    reuniones: eventos.filter((e) => e.tipo === "Reunión").length,
    inspecciones: eventos.filter((e) => e.tipo === "Inspección").length,
  }

  const handleCrearEvento = () => {
    toast({
      title: "Evento creado",
      description: "El nuevo evento ha sido añadido al calendario.",
    })
  }

  // Generar días del mes para el calendario
  const generarDiasCalendario = () => {
    const año = fechaSeleccionada.getFullYear()
    const mes = fechaSeleccionada.getMonth()
    const primerDia = new Date(año, mes, 1)
    const ultimoDia = new Date(año, mes + 1, 0)
    const diasEnMes = ultimoDia.getDate()
    const diaSemanaInicio = primerDia.getDay()

    const dias = []

    // Días vacíos al inicio
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null)
    }

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fechaDia = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
      const eventosDelDia = eventos.filter((evento) => evento.fecha === fechaDia)
      dias.push({ dia, eventos: eventosDelDia })
    }

    return dias
  }

  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(fechaSeleccionada)
    nuevaFecha.setMonth(nuevaFecha.getMonth() + direccion)
    setFechaSeleccionada(nuevaFecha)
  }

  const diasCalendario = generarDiasCalendario()
  const nombreMes = fechaSeleccionada.toLocaleDateString("es-ES", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Calendario</h2>
          <p className="text-muted-foreground mt-1">Gestión de eventos, reuniones e hitos del proyecto</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los Tipos</SelectItem>
                <SelectItem value="Reunión">Reunión</SelectItem>
                <SelectItem value="Inspección">Inspección</SelectItem>
                <SelectItem value="Actividad">Actividad</SelectItem>
                <SelectItem value="Hito">Hito</SelectItem>
              </SelectContent>
            </Select>
            <Select value={proyectoFiltro} onValueChange={setProyectoFiltro}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los Proyectos</SelectItem>
                <SelectItem value="Tienda Mall San Miguel">Tienda Mall San Miguel</SelectItem>
                <SelectItem value="Oficina Centro Empresarial">Oficina Centro Empresarial</SelectItem>
                <SelectItem value="Tienda Plaza Norte">Tienda Plaza Norte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Evento</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="titulo">Título del Evento</Label>
                  <Input id="titulo" placeholder="Ej: Reunión de seguimiento semanal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reunión">Reunión</SelectItem>
                      <SelectItem value="Inspección">Inspección</SelectItem>
                      <SelectItem value="Actividad">Actividad</SelectItem>
                      <SelectItem value="Hito">Hito</SelectItem>
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
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input id="fecha" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input id="hora" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración (minutos)</Label>
                  <Input id="duracion" type="number" placeholder="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input id="ubicacion" placeholder="Oficina principal, Sala de reuniones..." />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="participantes">Participantes</Label>
                  <Input id="participantes" placeholder="Separar con comas: Ana Quispe, Carlos Mendoza..." />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea id="descripcion" placeholder="Descripción del evento..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCrearEvento}>
                  Crear Evento
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
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Eventos</p>
                <p className="text-2xl font-bold">{estadisticas.totalEventos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Eventos Hoy</p>
                <p className="text-2xl font-bold">{estadisticas.eventosHoy}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reuniones</p>
                <p className="text-2xl font-bold">{estadisticas.reuniones}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Filter className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inspecciones</p>
                <p className="text-2xl font-bold">{estadisticas.inspecciones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize">{nombreMes}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => cambiarMes(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => cambiarMes(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
                <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {dia}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {diasCalendario.map((dia, index) => (
                <div key={index} className="min-h-[80px] p-1 border rounded">
                  {dia && (
                    <>
                      <div className="text-sm font-medium mb-1">{dia.dia}</div>
                      <div className="space-y-1">
                        {dia.eventos.slice(0, 2).map((evento) => (
                          <div key={evento.id} className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate">
                            {evento.titulo}
                          </div>
                        ))}
                        {dia.eventos.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dia.eventos.length - 2} más</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Eventos de Hoy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eventos de Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              {eventosHoy.length > 0 ? (
                <div className="space-y-3">
                  {eventosHoy.map((evento) => (
                    <div key={evento.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTipoColor(evento.tipo)}>{evento.tipo}</Badge>
                        <span className="text-sm text-muted-foreground">{evento.hora}</span>
                      </div>
                      <h4 className="font-medium text-sm">{evento.titulo}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{evento.proyecto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No hay eventos programados para hoy</p>
              )}
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximosEventos.map((evento) => (
                  <div key={evento.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTipoColor(evento.tipo)}>{evento.tipo}</Badge>
                      <Badge className={getEstadoColor(evento.estado)}>{evento.estado}</Badge>
                    </div>
                    <h4 className="font-medium text-sm">{evento.titulo}</h4>
                    <div className="text-xs text-muted-foreground mt-1 space-y-1">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(evento.fecha).toLocaleDateString()} - {evento.hora}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {evento.ubicacion}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
