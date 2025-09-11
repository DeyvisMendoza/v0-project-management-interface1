"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Euro,
  Calendar,
  Star,
  Download,
  Eye,
  Compass as Compare,
  Activity,
  Users,
  Target,
  Edit,
  Trash2,
  X,
  File,
} from "lucide-react"

const partidasTecnicas = [
  {
    id: 1,
    nombre: "Obra Civil",
    descripcion: "Cimentación, muros, pisos y trabajo estructural completo",
    estado: "En Progreso",
    progreso: 85,
    presupuestoEstimado: 200000,
    requerimientos: [
      {
        id: 1,
        nombre: "Cimentación y Estructura",
        descripcion: "Excavación, cimentación de concreto armado y estructura principal",
        estado: "En Progreso",
        prioridad: "Alta",
        fechaCreacion: "2024-01-10",
        fechaLimite: "2024-03-15",
        responsable: "Juan Martínez",
        presupuestoAsignado: 120000,
        especificaciones: {
          descripcionDetallada:
            "Excavación de 2m de profundidad, cimentación de concreto armado f'c=210 kg/cm², muros de mampostería con bloque de 15cm, losa de entrepiso.",
          especificacionesTecnicas:
            "Concreto f'c=210 kg/cm², acero de refuerzo fy=4200 kg/cm², mampostería con bloque de 15cm, impermeabilización con membrana asfáltica.",
          cronogramaRequerido: "8 semanas",
          condicionesEspeciales:
            "Trabajo en horario diurno únicamente (7:00 AM - 6:00 PM), acceso limitado por construcciones adyacentes, requiere coordinación con servicios públicos.",
          entregables: [
            "Planos as-built",
            "Certificados de calidad de materiales",
            "Pruebas de resistencia del concreto",
            "Informe geotécnico final",
          ],
          criteriosAceptacion: [
            "Resistencia del concreto ≥ 210 kg/cm²",
            "Tolerancias dimensionales ±2cm",
            "Impermeabilización sin filtraciones",
          ],
        },
        actividades: [
          {
            id: 1,
            nombre: "Excavación y Movimiento de Tierras",
            descripcion: "Excavación manual y mecánica hasta 2m de profundidad",
            estado: "Completado",
            fechaInicio: "2024-01-20",
            fechaFin: "2024-01-27",
            progreso: 100,
            responsable: "Equipo de Excavación",
            observaciones: "Completado sin inconvenientes, suelo estable encontrado",
          },
          {
            id: 2,
            nombre: "Colocación de Acero de Refuerzo",
            descripcion: "Armado de parrillas y columnas según planos estructurales",
            estado: "En Progreso",
            fechaInicio: "2024-01-28",
            fechaFin: "2024-02-10",
            progreso: 75,
            responsable: "Cuadrilla de Armado",
            observaciones: "Avance según cronograma, revisión estructural aprobada",
          },
          {
            id: 3,
            nombre: "Vaciado de Concreto",
            descripcion: "Fundición de cimentación y elementos estructurales",
            estado: "Pendiente",
            fechaInicio: "2024-02-11",
            fechaFin: "2024-02-18",
            progreso: 0,
            responsable: "Equipo de Concreto",
            observaciones: "Pendiente de finalización del armado",
          },
          {
            id: 4,
            nombre: "Curado y Desencofrado",
            descripcion: "Proceso de curado del concreto y retiro de formaletas",
            estado: "Pendiente",
            fechaInicio: "2024-02-19",
            fechaFin: "2024-02-26",
            progreso: 0,
            responsable: "Equipo de Acabados",
            observaciones: "Programado después del vaciado",
          },
        ],
        proformas: [
          {
            id: 1,
            proveedor: "Constructora Madrid SL",
            contacto: "juan.martinez@constructoramadrid.es",
            telefono: "+34 91 123 4567",
            precio: 115000,
            tiempoEntrega: "8 semanas",
            condiciones: "Pago neto 30 días",
            experiencia: "15 años",
            calificacion: 4.8,
            notas: "Excelente historial en proyectos similares, equipo especializado",
            fechaEnvio: "2024-01-10",
            validez: "30 días",
            incluye: [
              "Materiales certificados",
              "Mano de obra especializada",
              "Herramientas y equipos",
              "Supervisión técnica",
              "Seguros",
            ],
            excluye: ["Permisos municipales", "Conexiones de servicios públicos", "Estudios geotécnicos adicionales"],
            garantia: "12 meses",
            formaPago: "30% anticipo, 40% avance de obra, 30% entrega",
            archivo: "proforma_constructora_madrid_cimentacion.pdf",
            seleccionado: true,
            detallesCosto: {
              materiales: 65000,
              manoObra: 35000,
              equipos: 10000,
              supervision: 5000,
            },
          },
          {
            id: 2,
            proveedor: "Obras y Construcciones BCN",
            contacto: "maria.lopez@obrasbcn.es",
            telefono: "+34 93 456 7890",
            precio: 125000,
            tiempoEntrega: "10 semanas",
            condiciones: "50% anticipo",
            experiencia: "12 años",
            calificacion: 4.5,
            notas: "Materiales de alta calidad, mayor tiempo de ejecución pero mejor acabado",
            fechaEnvio: "2024-01-12",
            validez: "45 días",
            incluye: [
              "Materiales premium",
              "Mano de obra especializada",
              "Herramientas",
              "Control de calidad avanzado",
              "Garantía extendida",
            ],
            excluye: ["Permisos", "Servicios temporales", "Transporte especial"],
            garantia: "18 meses",
            formaPago: "50% anticipo, 30% avance, 20% entrega",
            archivo: "proforma_obras_bcn_cimentacion.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 70000,
              manoObra: 38000,
              equipos: 12000,
              supervision: 5000,
            },
          },
          {
            id: 3,
            proveedor: "Edificaciones Levante",
            contacto: "carlos.ruiz@edificacioneslevante.es",
            telefono: "+34 96 789 0123",
            precio: 108000,
            tiempoEntrega: "9 semanas",
            condiciones: "Pago neto 15 días",
            experiencia: "10 años",
            calificacion: 4.2,
            notas: "Precio más competitivo, menor experiencia pero buena relación calidad-precio",
            fechaEnvio: "2024-01-15",
            validez: "20 días",
            incluye: ["Materiales estándar", "Mano de obra", "Herramientas básicas", "Supervisión básica"],
            excluye: ["Permisos", "Supervisión especializada", "Pruebas adicionales", "Seguros"],
            garantia: "6 meses",
            formaPago: "20% anticipo, 60% avance, 20% entrega",
            archivo: "proforma_edificaciones_levante_cimentacion.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 60000,
              manoObra: 32000,
              equipos: 8000,
              supervision: 8000,
            },
          },
        ],
      },
      {
        id: 2,
        nombre: "Acabados Estructurales",
        descripcion: "Acabados de muros, pisos y elementos estructurales",
        estado: "Pendiente",
        prioridad: "Media",
        fechaCreacion: "2024-01-15",
        fechaLimite: "2024-04-30",
        responsable: "Ana García",
        presupuestoAsignado: 80000,
        especificaciones: {
          descripcionDetallada:
            "Aplicación de acabados en muros con estuco, pintura, instalación de pisos cerámicos y acabados en elementos estructurales.",
          especificacionesTecnicas:
            "Estuco liso en muros, pintura vinílica lavable, cerámica antideslizante 60x60cm, guardaescobas cerámicos.",
          cronogramaRequerido: "6 semanas",
          condicionesEspeciales:
            "Trabajo después de completar estructura, ventilación adecuada durante pintura, protección de acabados.",
          entregables: [
            "Muestras de acabados aprobadas",
            "Certificados de calidad de materiales",
            "Manual de mantenimiento",
          ],
          criteriosAceptacion: [
            "Acabados uniformes sin defectos",
            "Adherencia adecuada",
            "Colores según especificación",
          ],
        },
        actividades: [
          {
            id: 5,
            nombre: "Preparación de Superficies",
            descripcion: "Limpieza y preparación de muros y pisos para acabados",
            estado: "Pendiente",
            fechaInicio: "2024-03-01",
            fechaFin: "2024-03-08",
            progreso: 0,
            responsable: "Equipo de Acabados",
            observaciones: "Pendiente de finalización de estructura",
          },
          {
            id: 6,
            nombre: "Aplicación de Estuco",
            descripcion: "Estucado de muros interiores y exteriores",
            estado: "Pendiente",
            fechaInicio: "2024-03-09",
            fechaFin: "2024-03-20",
            progreso: 0,
            responsable: "Especialistas en Estuco",
            observaciones: "Requiere condiciones climáticas favorables",
          },
        ],
        proformas: [
          {
            id: 4,
            proveedor: "Acabados Profesionales SL",
            contacto: "pedro.sanchez@acabadospro.es",
            telefono: "+34 91 987 6543",
            precio: 75000,
            tiempoEntrega: "6 semanas",
            condiciones: "Pago neto 30 días",
            experiencia: "8 años",
            calificacion: 4.4,
            notas: "Especialistas en acabados de alta calidad",
            fechaEnvio: "2024-01-20",
            validez: "30 días",
            incluye: ["Materiales de acabado", "Mano de obra especializada", "Herramientas", "Limpieza final"],
            excluye: ["Preparación de superficies", "Pintura exterior"],
            garantia: "12 meses",
            formaPago: "25% anticipo, 50% avance, 25% entrega",
            archivo: "proforma_acabados_profesionales.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 45000,
              manoObra: 25000,
              equipos: 3000,
              supervision: 2000,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Instalación Eléctrica",
    descripcion: "Cableado, iluminación, tomas de corriente y paneles eléctricos",
    estado: "Pendiente",
    progreso: 0,
    presupuestoEstimado: 90000,
    requerimientos: [
      {
        id: 3,
        nombre: "Sistema Eléctrico Principal",
        descripcion: "Instalación del tablero principal y circuitos de distribución",
        estado: "Pendiente",
        prioridad: "Alta",
        fechaCreacion: "2024-02-01",
        fechaLimite: "2024-05-15",
        responsable: "Carlos Ruiz",
        presupuestoAsignado: 90000,
        especificaciones: {
          descripcionDetallada:
            "Instalación eléctrica completa incluyendo tablero principal, circuitos de iluminación y fuerza, puntos de datos y sistema de tierra física.",
          especificacionesTecnicas:
            "Cable THHN calibre según cálculo, tubería EMT, tableros Square D, interruptores y tomacorrientes Leviton, sistema de tierra física.",
          cronogramaRequerido: "6 semanas",
          condicionesEspeciales:
            "Certificación por ingeniero eléctrico colegiado, cumplimiento RETIE, coordinación con otros gremios.",
          entregables: [
            "Planos eléctricos finales",
            "Certificado RETIE",
            "Manual de operación",
            "Garantías de equipos",
            "Protocolos de pruebas",
          ],
          criteriosAceptacion: [
            "Cumplimiento normativo RETIE",
            "Pruebas de continuidad exitosas",
            "Certificación profesional",
          ],
        },
        actividades: [],
        proformas: [
          {
            id: 5,
            proveedor: "ElectroTech Profesional",
            contacto: "ana.garcia@electrotech.es",
            telefono: "+34 91 234 5678",
            precio: 85000,
            tiempoEntrega: "6 semanas",
            condiciones: "Pago neto 15 días",
            experiencia: "10 años",
            calificacion: 4.6,
            notas: "Especializado en instalaciones comerciales, certificación RETIE incluida",
            fechaEnvio: "2024-02-01",
            validez: "30 días",
            incluye: [
              "Materiales certificados",
              "Mano de obra especializada",
              "Pruebas y certificaciones",
              "Planos as-built",
            ],
            excluye: ["Excavaciones", "Obra civil para canalizaciones", "Permisos municipales"],
            garantia: "24 meses",
            formaPago: "25% anticipo, 50% avance, 25% entrega",
            archivo: "proforma_electrotech.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 50000,
              manoObra: 25000,
              equipos: 5000,
              supervision: 5000,
            },
          },
        ],
      },
    ],
  },
]

const partidasTecnicasUpdated = [
  {
    id: 1,
    nombre: "Obra Civil",
    descripcion: "Cimentación, muros, pisos y trabajo estructural completo",
    estado: "En Progreso",
    progreso: 85,
    presupuestoEstimado: 200000,
    requerimientos: [
      {
        id: 1,
        nombre: "Cimentación y Estructura",
        descripcion: "Excavación, cimentación de concreto armado y estructura principal",
        estado: "En Progreso",
        prioridad: "Alta",
        fechaCreacion: "2024-01-10",
        fechaLimite: "2024-03-15",
        responsable: "Juan Pérez",
        presupuestoAsignado: 120000,
        especificaciones: {
          descripcionDetallada:
            "Excavación de 2m de profundidad, cimentación de concreto armado f'c=210 kg/cm², muros de mampostería con bloque de 15cm, losa de entrepiso.",
          especificacionesTecnicas:
            "Concreto f'c=210 kg/cm², acero de refuerzo fy=4200 kg/cm², mampostería con bloque de 15cm, impermeabilización con membrana asfáltica.",
          cronogramaRequerido: "8 semanas",
          condicionesEspeciales:
            "Trabajo en horario diurno únicamente (7:00 AM - 6:00 PM), acceso limitado por construcciones adyacentes, requiere coordinación con servicios públicos.",
          entregables: [
            "Planos as-built",
            "Certificados de calidad de materiales",
            "Pruebas de resistencia del concreto",
            "Informe geotécnico final",
          ],
          criteriosAceptacion: [
            "Resistencia del concreto ≥ 210 kg/cm²",
            "Tolerancias dimensionales ±2cm",
            "Impermeabilización sin filtraciones",
          ],
        },
        actividades: [
          {
            id: 1,
            nombre: "Excavación y Movimiento de Tierras",
            descripcion: "Excavación manual y mecánica hasta 2m de profundidad",
            estado: "Completado",
            fechaInicio: "2024-01-20",
            fechaFin: "2024-01-27",
            progreso: 100,
            responsable: "Equipo de Excavación",
            observaciones: "Completado sin inconvenientes, suelo estable encontrado",
          },
          {
            id: 2,
            nombre: "Colocación de Acero de Refuerzo",
            descripcion: "Armado de parrillas y columnas según planos estructurales",
            estado: "En Progreso",
            fechaInicio: "2024-01-28",
            fechaFin: "2024-02-10",
            progreso: 75,
            responsable: "Cuadrilla de Armado",
            observaciones: "Avance según cronograma, revisión estructural aprobada",
          },
          {
            id: 3,
            nombre: "Vaciado de Concreto",
            descripcion: "Fundición de cimentación y elementos estructurales",
            estado: "Pendiente",
            fechaInicio: "2024-02-11",
            fechaFin: "2024-02-18",
            progreso: 0,
            responsable: "Equipo de Concreto",
            observaciones: "Pendiente de finalización del armado",
          },
          {
            id: 4,
            nombre: "Curado y Desencofrado",
            descripcion: "Proceso de curado del concreto y retiro de formaletas",
            estado: "Pendiente",
            fechaInicio: "2024-02-19",
            fechaFin: "2024-02-26",
            progreso: 0,
            responsable: "Equipo de Acabados",
            observaciones: "Programado después del vaciado",
          },
        ],
        proformas: [
          {
            id: 1,
            proveedor: "Constructora Peruana SAC",
            contacto: "juan.perez@constructoraperuana.pe",
            telefono: "+51 911 123 456",
            precio: 115000,
            tiempoEntrega: "8 semanas",
            condiciones: "Pago neto 30 días",
            experiencia: "15 años",
            calificacion: 4.8,
            notas: "Excelente historial en proyectos similares, equipo especializado",
            fechaEnvio: "2024-01-10",
            validez: "30 días",
            incluye: [
              "Materiales certificados",
              "Mano de obra especializada",
              "Herramientas y equipos",
              "Supervisión técnica",
              "Seguros",
            ],
            excluye: ["Permisos municipales", "Conexiones de servicios públicos", "Estudios geotécnicos adicionales"],
            garantia: "12 meses",
            formaPago: "30% anticipo, 40% avance de obra, 30% entrega",
            archivo: "proforma_constructora_peruana_cimentacion.pdf",
            seleccionado: true,
            detallesCosto: {
              materiales: 65000,
              manoObra: 35000,
              equipos: 10000,
              supervision: 5000,
            },
          },
          {
            id: 2,
            proveedor: "Obras y Construcciones Lima SAC",
            contacto: "maria.lopez@obraslima.pe",
            telefono: "+51 934 456 789",
            precio: 125000,
            tiempoEntrega: "10 semanas",
            condiciones: "50% anticipo",
            experiencia: "12 años",
            calificacion: 4.5,
            notas: "Materiales de alta calidad, mayor tiempo de ejecución pero mejor acabado",
            fechaEnvio: "2024-01-12",
            validez: "45 días",
            incluye: [
              "Materiales premium",
              "Mano de obra especializada",
              "Herramientas",
              "Control de calidad avanzado",
              "Garantía extendida",
            ],
            excluye: ["Permisos", "Servicios temporales", "Transporte especial"],
            garantia: "18 meses",
            formaPago: "50% anticipo, 30% avance, 20% entrega",
            archivo: "proforma_obras_lima_cimentacion.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 70000,
              manoObra: 38000,
              equipos: 12000,
              supervision: 5000,
            },
          },
          {
            id: 3,
            proveedor: "Edificaciones del Perú SAC",
            contacto: "carlos.ruiz@edificacionesperu.pe",
            telefono: "+51 967 789 012",
            precio: 108000,
            tiempoEntrega: "9 semanas",
            condiciones: "Pago neto 15 días",
            experiencia: "10 años",
            calificacion: 4.2,
            notas: "Precio más competitivo, menor experiencia pero buena relación calidad-precio",
            fechaEnvio: "2024-01-15",
            validez: "20 días",
            incluye: ["Materiales estándar", "Mano de obra", "Herramientas básicas", "Supervisión básica"],
            excluye: ["Permisos", "Supervisión especializada", "Pruebas adicionales", "Seguros"],
            garantia: "6 meses",
            formaPago: "20% anticipo, 60% avance, 20% entrega",
            archivo: "proforma_edificaciones_peru_cimentacion.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 60000,
              manoObra: 32000,
              equipos: 8000,
              supervision: 8000,
            },
          },
        ],
      },
      {
        id: 2,
        nombre: "Acabados Estructurales",
        descripcion: "Acabados de muros, pisos y elementos estructurales",
        estado: "Pendiente",
        prioridad: "Media",
        fechaCreacion: "2024-01-15",
        fechaLimite: "2024-04-30",
        responsable: "Ana García",
        presupuestoAsignado: 80000,
        especificaciones: {
          descripcionDetallada:
            "Aplicación de acabados en muros con estuco, pintura, instalación de pisos cerámicos y acabados en elementos estructurales.",
          especificacionesTecnicas:
            "Estuco liso en muros, pintura vinílica lavable, cerámica antideslizante 60x60cm, guardaescobas cerámicos.",
          cronogramaRequerido: "6 semanas",
          condicionesEspeciales:
            "Trabajo después de completar estructura, ventilación adecuada durante pintura, protección de acabados.",
          entregables: [
            "Muestras de acabados aprobadas",
            "Certificados de calidad de materiales",
            "Manual de mantenimiento",
          ],
          criteriosAceptacion: [
            "Acabados uniformes sin defectos",
            "Adherencia adecuada",
            "Colores según especificación",
          ],
        },
        actividades: [
          {
            id: 5,
            nombre: "Preparación de Superficies",
            descripcion: "Limpieza y preparación de muros y pisos para acabados",
            estado: "Pendiente",
            fechaInicio: "2024-03-01",
            fechaFin: "2024-03-08",
            progreso: 0,
            responsable: "Equipo de Acabados",
            observaciones: "Pendiente de finalización de estructura",
          },
          {
            id: 6,
            nombre: "Aplicación de Estuco",
            descripcion: "Estucado de muros interiores y exteriores",
            estado: "Pendiente",
            fechaInicio: "2024-03-09",
            fechaFin: "2024-03-20",
            progreso: 0,
            responsable: "Especialistas en Estuco",
            observaciones: "Requiere condiciones climáticas favorables",
          },
        ],
        proformas: [
          {
            id: 4,
            proveedor: "Acabados Peruanos SAC",
            contacto: "pedro.sanchez@acabadosperuanos.pe",
            telefono: "+51 919 987 654",
            precio: 75000,
            tiempoEntrega: "6 semanas",
            condiciones: "Pago neto 30 días",
            experiencia: "8 años",
            calificacion: 4.4,
            notas: "Especialistas en acabados de alta calidad",
            fechaEnvio: "2024-01-20",
            validez: "30 días",
            incluye: ["Materiales de acabado", "Mano de obra especializada", "Herramientas", "Limpieza final"],
            excluye: ["Preparación de superficies", "Pintura exterior"],
            garantia: "12 meses",
            formaPago: "25% anticipo, 50% avance, 25% entrega",
            archivo: "proforma_acabados_peruanos.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 45000,
              manoObra: 25000,
              equipos: 3000,
              supervision: 2000,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Instalación Eléctrica",
    descripcion: "Cableado, iluminación, tomas de corriente y paneles eléctricos",
    estado: "Pendiente",
    progreso: 0,
    presupuestoEstimado: 90000,
    requerimientos: [
      {
        id: 3,
        nombre: "Sistema Eléctrico Principal",
        descripcion: "Instalación del tablero principal y circuitos de distribución",
        estado: "Pendiente",
        prioridad: "Alta",
        fechaCreacion: "2024-02-01",
        fechaLimite: "2024-05-15",
        responsable: "Carlos Ruiz",
        presupuestoAsignado: 90000,
        especificaciones: {
          descripcionDetallada:
            "Instalación eléctrica completa incluyendo tablero principal, circuitos de iluminación y fuerza, puntos de datos y sistema de tierra física.",
          especificacionesTecnicas:
            "Cable THHN calibre según cálculo, tubería EMT, tableros Square D, interruptores y tomacorrientes Leviton, sistema de tierra física.",
          cronogramaRequerido: "6 semanas",
          condicionesEspeciales:
            "Certificación por ingeniero eléctrico colegiado, cumplimiento RETIE, coordinación con otros gremios.",
          entregables: [
            "Planos eléctricos finales",
            "Certificado RETIE",
            "Manual de operación",
            "Garantías de equipos",
            "Protocolos de pruebas",
          ],
          criteriosAceptacion: [
            "Cumplimiento normativo RETIE",
            "Pruebas de continuidad exitosas",
            "Certificación profesional",
          ],
        },
        actividades: [],
        proformas: [
          {
            id: 5,
            proveedor: "ElectroTech Perú SAC",
            contacto: "ana.garcia@electrotechperu.pe",
            telefono: "+51 912 234 567",
            precio: 85000,
            tiempoEntrega: "6 semanas",
            condiciones: "Pago neto 15 días",
            experiencia: "10 años",
            calificacion: 4.6,
            notas: "Especializado en instalaciones comerciales, certificación RETIE incluida",
            fechaEnvio: "2024-02-01",
            validez: "30 días",
            incluye: [
              "Materiales certificados",
              "Mano de obra especializada",
              "Pruebas y certificaciones",
              "Planos as-built",
            ],
            excluye: ["Excavaciones", "Obra civil para canalizaciones", "Permisos municipales"],
            garantia: "24 meses",
            formaPago: "25% anticipo, 50% avance, 25% entrega",
            archivo: "proforma_electrotech.pdf",
            seleccionado: false,
            detallesCosto: {
              materiales: 50000,
              manoObra: 25000,
              equipos: 5000,
              supervision: 5000,
            },
          },
        ],
      },
    ],
  },
]

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case "Completado":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "En Progreso":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "Pendiente":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />
  }
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "Completado":
      return "bg-green-100 text-green-800 border-green-200"
    case "En Progreso":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
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

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ))
}

export function PartidasTecnicasTab() {
  const [partidaSeleccionada, setPartidaSeleccionada] = useState<number | null>(null)
  const [mostrarDialogoRequerimiento, setMostrarDialogoRequerimiento] = useState<number | null>(null)
  const [mostrarDialogoProforma, setMostrarDialogoProforma] = useState<{
    partidaId: number
    requerimientoId: number
  } | null>(null)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)
  const [itemsIncluidos, setItemsIncluidos] = useState<string[]>([])
  const [itemsExcluidos, setItemsExcluidos] = useState<string[]>([])
  const [nuevoItemIncluido, setNuevoItemIncluido] = useState("")
  const [nuevoItemExcluido, setNuevoItemExcluido] = useState("")
  const [mostrarDialogoActividad, setMostrarDialogoActividad] = useState<{
    partidaId: number
    requerimientoId: number
    actividad?: any
  } | null>(null)

  const estadisticas = {
    completadas: partidasTecnicasUpdated.filter((p) => p.estado === "Completado").length,
    enProgreso: partidasTecnicasUpdated.filter((p) => p.estado === "En Progreso").length,
    pendientes: partidasTecnicasUpdated.filter((p) => p.estado === "Pendiente").length,
    presupuestoTotal: partidasTecnicasUpdated.reduce((sum, p) => sum + p.presupuestoEstimado, 0),
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setArchivoSeleccionado(file)
    }
  }

  const agregarItemIncluido = () => {
    if (nuevoItemIncluido.trim() && !itemsIncluidos.includes(nuevoItemIncluido.trim())) {
      setItemsIncluidos([...itemsIncluidos, nuevoItemIncluido.trim()])
      setNuevoItemIncluido("")
    }
  }

  const agregarItemExcluido = () => {
    if (nuevoItemExcluido.trim() && !itemsExcluidos.includes(nuevoItemExcluido.trim())) {
      setItemsExcluidos([...itemsExcluidos, nuevoItemExcluido.trim()])
      setNuevoItemExcluido("")
    }
  }

  const eliminarItemIncluido = (index: number) => {
    setItemsIncluidos(itemsIncluidos.filter((_, i) => i !== index))
  }

  const eliminarItemExcluido = (index: number) => {
    setItemsExcluidos(itemsExcluidos.filter((_, i) => i !== index))
  }

  const resetearFormularioProforma = () => {
    setArchivoSeleccionado(null)
    setItemsIncluidos([])
    setItemsExcluidos([])
    setNuevoItemIncluido("")
    setNuevoItemExcluido("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Partidas Técnicas</h3>
          <p className="text-muted-foreground">Gestión de partidas, requerimientos, proformas y proveedores</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Partida
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Partida Técnica</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-partida">Nombre de la Partida</Label>
                  <Input id="nombre-partida" placeholder="Ej: Sistema de Seguridad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presupuesto-estimado">Presupuesto Estimado (S/)</Label>
                  <Input id="presupuesto-estimado" type="number" placeholder="50000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion-partida">Descripción General</Label>
                <Textarea id="descripcion-partida" placeholder="Descripción general de la partida..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsable-partida">Responsable</Label>
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
                  <Label htmlFor="estado-partida">Estado Inicial</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="en-progreso">En Progreso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Crear Partida</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completadas</p>
                <p className="text-2xl font-bold">{estadisticas.completadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
                <p className="text-2xl font-bold">{estadisticas.enProgreso}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{estadisticas.pendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Euro className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto Total</p>
                <p className="text-xl font-bold">S/{(estadisticas.presupuestoTotal / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Partidas */}
      <Accordion type="single" collapsible className="space-y-4">
        {partidasTecnicasUpdated.map((partida) => (
          <AccordionItem key={partida.id} value={`partida-${partida.id}`}>
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-4">
                    {getEstadoIcon(partida.estado)}
                    <div className="text-left">
                      <h4 className="font-semibold">{partida.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{partida.descripcion}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {partida.requerimientos.length} requerimientos
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getEstadoColor(partida.estado)}>{partida.estado}</Badge>
                    <div className="flex items-center gap-2 min-w-32">
                      <Progress value={partida.progreso} className="w-20" />
                      <span className="text-sm font-medium">{partida.progreso}%</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">S/{partida.presupuestoEstimado.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {partida.requerimientos.reduce((sum, req) => sum + req.proformas.length, 0)} proformas
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-6">
                  {/* Header con botón para agregar requerimiento */}
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Requerimientos de la Partida</h5>
                    <Dialog
                      open={mostrarDialogoRequerimiento === partida.id}
                      onOpenChange={(open) => setMostrarDialogoRequerimiento(open ? partida.id : null)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Requerimiento
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Crear Nuevo Requerimiento - {partida.nombre}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nombre-requerimiento">Nombre del Requerimiento</Label>
                              <Input id="nombre-requerimiento" placeholder="Ej: Sistema de Iluminación LED" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="presupuesto-requerimiento">Presupuesto Asignado (S/)</Label>
                              <Input id="presupuesto-requerimiento" type="number" placeholder="25000" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="descripcion-requerimiento">Descripción</Label>
                            <Textarea
                              id="descripcion-requerimiento"
                              placeholder="Descripción detallada del requerimiento..."
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="prioridad-requerimiento">Prioridad</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="alta">Alta</SelectItem>
                                  <SelectItem value="media">Media</SelectItem>
                                  <SelectItem value="baja">Baja</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="responsable-requerimiento">Responsable</Label>
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
                              <Label htmlFor="fecha-limite">Fecha Límite</Label>
                              <Input id="fecha-limite" type="date" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-medium">Especificaciones Técnicas</h4>

                            <div className="space-y-2">
                              <Label htmlFor="descripcion-detallada">Descripción Detallada</Label>
                              <Textarea
                                id="descripcion-detallada"
                                placeholder="Descripción técnica completa de los trabajos a realizar..."
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="especificaciones-tecnicas">Especificaciones Técnicas</Label>
                              <Textarea
                                id="especificaciones-tecnicas"
                                placeholder="Materiales, normas, estándares de calidad requeridos..."
                                rows={3}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="cronograma-requerido">Cronograma Requerido</Label>
                                <Input id="cronograma-requerido" placeholder="Ej: 6 semanas" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="condiciones-especiales">Condiciones Especiales</Label>
                                <Input id="condiciones-especiales" placeholder="Restricciones, horarios, etc." />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="entregables">Entregables Requeridos</Label>
                              <Textarea
                                id="entregables"
                                placeholder="Lista de documentos, certificaciones, garantías requeridas..."
                                rows={2}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="criterios-aceptacion">Criterios de Aceptación</Label>
                              <Textarea
                                id="criterios-aceptacion"
                                placeholder="Criterios específicos para aprobar el requerimiento..."
                                rows={2}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setMostrarDialogoRequerimiento(null)}>
                              Cancelar
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">Crear Requerimiento</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Lista de Requerimientos */}
                  <div className="space-y-4">
                    {partida.requerimientos.map((requerimiento) => (
                      <Card key={requerimiento.id} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h6 className="font-semibold">{requerimiento.nombre}</h6>
                                <Badge className={getEstadoColor(requerimiento.estado)}>{requerimiento.estado}</Badge>
                                <Badge className={getPrioridadColor(requerimiento.prioridad)}>
                                  {requerimiento.prioridad}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{requerimiento.descripcion}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {requerimiento.responsable}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Límite: {new Date(requerimiento.fechaLimite).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Euro className="h-3 w-3" />
                                  S/{requerimiento.presupuestoAsignado.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setMostrarDialogoActividad({
                                    partidaId: partida.id,
                                    requerimientoId: requerimiento.id,
                                    actividad: null,
                                  })
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="actividades" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="actividades">
                                Actividades ({requerimiento.actividades.length})
                              </TabsTrigger>
                              <TabsTrigger value="proformas">Proformas ({requerimiento.proformas.length})</TabsTrigger>
                              <TabsTrigger value="comparacion">Comparación</TabsTrigger>
                            </TabsList>

                            <TabsContent value="actividades" className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h6 className="font-medium">Actividades del Requerimiento</h6>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setMostrarDialogoActividad({
                                      partidaId: partida.id,
                                      requerimientoId: requerimiento.id,
                                    })
                                  }
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Nueva Actividad
                                </Button>
                              </div>

                              {requerimiento.actividades.length > 0 ? (
                                <div className="space-y-3">
                                  {requerimiento.actividades.map((actividad) => (
                                    <Card key={actividad.id} className="p-4">
                                      <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-3">
                                            {getEstadoIcon(actividad.estado)}
                                            <h6 className="font-medium">{actividad.nombre}</h6>
                                            <Badge className={getEstadoColor(actividad.estado)} variant="outline">
                                              {actividad.estado}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{actividad.descripcion}</p>
                                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span>
                                              <strong>Responsable:</strong> {actividad.responsable}
                                            </span>
                                            <span>
                                              <strong>Inicio:</strong>{" "}
                                              {new Date(actividad.fechaInicio).toLocaleDateString()}
                                            </span>
                                            <span>
                                              <strong>Fin:</strong> {new Date(actividad.fechaFin).toLocaleDateString()}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Progress value={actividad.progreso} className="w-32" />
                                            <span className="text-sm font-medium">{actividad.progreso}%</span>
                                          </div>
                                          {actividad.observaciones && (
                                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                              <strong>Observaciones:</strong> {actividad.observaciones}
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              setMostrarDialogoActividad({
                                                partidaId: partida.id,
                                                requerimientoId: requerimiento.id,
                                                actividad: actividad,
                                              })
                                            }
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              ) : (
                                <Card className="border-dashed border-2 border-gray-200">
                                  <CardContent className="p-8 text-center">
                                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h6 className="font-medium mb-2">No hay actividades registradas</h6>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Agrega actividades para organizar el trabajo de este requerimiento
                                    </p>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setMostrarDialogoActividad({
                                          partidaId: partida.id,
                                          requerimientoId: requerimiento.id,
                                        })
                                      }
                                    >
                                      <Plus className="h-4 w-4 mr-2" />
                                      Crear Primera Actividad
                                    </Button>
                                  </CardContent>
                                </Card>
                              )}
                            </TabsContent>

                            <TabsContent value="proformas" className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h6 className="font-medium">Proformas Recibidas</h6>
                                <Dialog
                                  open={
                                    mostrarDialogoProforma?.partidaId === partida.id &&
                                    mostrarDialogoProforma?.requerimientoId === requerimiento.id
                                  }
                                  onOpenChange={(open) =>
                                    setMostrarDialogoProforma(
                                      open ? { partidaId: partida.id, requerimientoId: requerimiento.id } : null,
                                    )
                                  }
                                >
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Agregar Proforma
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Agregar Nueva Proforma - {requerimiento.nombre}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6">
                                      {/* Información del Proveedor */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Información del Proveedor</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="nombre-proveedor">Nombre del Proveedor *</Label>
                                            <Input
                                              id="nombre-proveedor"
                                              placeholder="Ej: Constructora ABC SAC"
                                              required
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="contacto-proveedor">Persona de Contacto *</Label>
                                            <Input
                                              id="contacto-proveedor"
                                              placeholder="Ej: juan.perez@constructoraabc.pe"
                                              required
                                            />
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="telefono-proveedor">Teléfono</Label>
                                            <Input id="telefono-proveedor" placeholder="+51 911 123 456" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="experiencia-proveedor">Años de Experiencia</Label>
                                            <Input id="experiencia-proveedor" placeholder="10" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="calificacion-proveedor">Calificación (1-5)</Label>
                                            <Select>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="5">5 - Excelente</SelectItem>
                                                <SelectItem value="4.5">4.5 - Muy Bueno</SelectItem>
                                                <SelectItem value="4">4 - Bueno</SelectItem>
                                                <SelectItem value="3.5">3.5 - Regular</SelectItem>
                                                <SelectItem value="3">3 - Aceptable</SelectItem>
                                                <SelectItem value="2.5">2.5 - Deficiente</SelectItem>
                                                <SelectItem value="2">2 - Malo</SelectItem>
                                                <SelectItem value="1">1 - Muy Malo</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Información Comercial */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Información Comercial</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="precio-total">Precio Total (S/) *</Label>
                                            <Input id="precio-total" type="number" placeholder="75000" required />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="tiempo-entrega">Tiempo de Entrega *</Label>
                                            <Input id="tiempo-entrega" placeholder="Ej: 8 semanas" required />
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="condiciones-pago">Condiciones de Pago</Label>
                                            <Input id="condiciones-pago" placeholder="Ej: Pago neto 30 días" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="validez-oferta">Validez de la Oferta</Label>
                                            <Input id="validez-oferta" placeholder="Ej: 30 días" />
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="garantia">Garantía</Label>
                                            <Input id="garantia" placeholder="Ej: 12 meses" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="forma-pago">Forma de Pago</Label>
                                            <Input
                                              id="forma-pago"
                                              placeholder="Ej: 30% anticipo, 40% avance, 30% entrega"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Desglose de Costos */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">
                                          Desglose de Costos (Opcional)
                                        </h4>
                                        <div className="grid grid-cols-4 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="costo-materiales">Materiales (S/)</Label>
                                            <Input id="costo-materiales" type="number" placeholder="45000" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="costo-mano-obra">Mano de Obra (S/)</Label>
                                            <Input id="costo-mano-obra" type="number" placeholder="25000" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="costo-equipos">Equipos (S/)</Label>
                                            <Input id="costo-equipos" type="number" placeholder="3000" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="costo-supervision">Supervisión (S/)</Label>
                                            <Input id="costo-supervision" type="number" placeholder="2000" />
                                          </div>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Items Incluidos */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Items Incluidos</h4>
                                        <div className="flex gap-2">
                                          <Input
                                            value={nuevoItemIncluido}
                                            onChange={(e) => setNuevoItemIncluido(e.target.value)}
                                            placeholder="Agregar item incluido..."
                                            onKeyPress={(e) => e.key === "Enter" && agregarItemIncluido()}
                                          />
                                          <Button type="button" onClick={agregarItemIncluido} variant="outline">
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {itemsIncluidos.map((item, index) => (
                                            <Badge key={index} variant="outline" className="text-sm">
                                              {item}
                                              <button
                                                type="button"
                                                onClick={() => eliminarItemIncluido(index)}
                                                className="ml-2 hover:text-red-600"
                                              >
                                                <X className="h-3 w-3" />
                                              </button>
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Items Excluidos */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Items Excluidos</h4>
                                        <div className="flex gap-2">
                                          <Input
                                            value={nuevoItemExcluido}
                                            onChange={(e) => setNuevoItemExcluido(e.target.value)}
                                            placeholder="Agregar item excluido..."
                                            onKeyPress={(e) => e.key === "Enter" && agregarItemExcluido()}
                                          />
                                          <Button type="button" onClick={agregarItemExcluido} variant="outline">
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {itemsExcluidos.map((item, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="text-sm bg-red-50 text-red-700 border-red-200"
                                            >
                                              {item}
                                              <button
                                                type="button"
                                                onClick={() => eliminarItemExcluido(index)}
                                                className="ml-2 hover:text-red-800"
                                              >
                                                <X className="h-3 w-3" />
                                              </button>
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Documento de Proforma */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Documento de Proforma</h4>
                                        <div className="space-y-4">
                                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                            <div className="text-center">
                                              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                              <div className="space-y-2">
                                                <Label htmlFor="archivo-proforma" className="cursor-pointer">
                                                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Seleccionar archivo
                                                  </span>
                                                  <span className="text-muted-foreground"> o arrastra aquí</span>
                                                </Label>
                                                <Input
                                                  id="archivo-proforma"
                                                  type="file"
                                                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                  onChange={handleFileChange}
                                                  className="hidden"
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                  PDF, DOC, DOCX, XLS, XLSX (máx. 10MB)
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {archivoSeleccionado && (
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                              <File className="h-5 w-5 text-blue-600" />
                                              <div className="flex-1">
                                                <p className="text-sm font-medium">{archivoSeleccionado.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                  {(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                              </div>
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setArchivoSeleccionado(null)}
                                              >
                                                <X className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Notas Adicionales */}
                                      <div className="space-y-4">
                                        <h4 className="font-medium text-lg border-b pb-2">Notas Adicionales</h4>
                                        <div className="space-y-2">
                                          <Label htmlFor="notas-proforma">Observaciones y Comentarios</Label>
                                          <Textarea
                                            id="notas-proforma"
                                            placeholder="Cualquier información adicional relevante sobre esta proforma..."
                                            rows={3}
                                          />
                                        </div>
                                      </div>

                                      {/* Botones de Acción */}
                                      <div className="flex justify-end gap-3 pt-4 border-t">
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setMostrarDialogoProforma(null)
                                            resetearFormularioProforma()
                                          }}
                                        >
                                          Cancelar
                                        </Button>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                          <Plus className="h-4 w-4 mr-2" />
                                          Crear Proforma
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              <div className="space-y-4">
                                {requerimiento.proformas.map((proforma) => (
                                  <Card
                                    key={proforma.id}
                                    className={proforma.seleccionado ? "border-green-200 bg-green-50" : ""}
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between mb-3">
                                        <div>
                                          <h6 className="font-semibold flex items-center gap-2">
                                            {proforma.proveedor}
                                            {proforma.seleccionado && (
                                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                                Seleccionado
                                              </Badge>
                                            )}
                                          </h6>
                                          <div className="flex items-center gap-1 mt-1">
                                            {renderStars(proforma.calificacion)}
                                            <span className="text-sm ml-1">({proforma.calificacion})</span>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-lg font-bold">S/{proforma.precio.toLocaleString()}</div>
                                          <div className="text-sm text-muted-foreground">{proforma.tiempoEntrega}</div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p>
                                            <strong>Contacto:</strong> {proforma.contacto}
                                          </p>
                                          <p>
                                            <strong>Teléfono:</strong> {proforma.telefono}
                                          </p>
                                          <p>
                                            <strong>Experiencia:</strong> {proforma.experiencia}
                                          </p>
                                          <p>
                                            <strong>Condiciones:</strong> {proforma.condiciones}
                                          </p>
                                        </div>
                                        <div>
                                          <p>
                                            <strong>Fecha Envío:</strong>{" "}
                                            {new Date(proforma.fechaEnvio).toLocaleDateString()}
                                          </p>
                                          <p>
                                            <strong>Validez:</strong> {proforma.validez}
                                          </p>
                                          <p>
                                            <strong>Garantía:</strong> {proforma.garantia}
                                          </p>
                                          <p>
                                            <strong>Forma de Pago:</strong> {proforma.formaPago}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-3 space-y-2">
                                        <div>
                                          <strong className="text-sm">Incluye:</strong>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {proforma.incluye.map((item, index) => (
                                              <Badge key={index} variant="outline" className="text-xs">
                                                {item}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <strong className="text-sm">Excluye:</strong>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {proforma.excluye.map((item, index) => (
                                              <Badge
                                                key={index}
                                                variant="outline"
                                                className="text-xs bg-red-50 text-red-700"
                                              >
                                                {item}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-4 w-4 text-blue-600" />
                                          <span className="text-sm">{proforma.archivo}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          {!proforma.seleccionado && (
                                            <Button variant="outline" size="sm">
                                              Seleccionar
                                            </Button>
                                          )}
                                        </div>
                                      </div>

                                      {proforma.notas && (
                                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                                          <strong>Notas:</strong> {proforma.notas}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="comparacion" className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h6 className="font-medium">Comparación de Proformas</h6>
                                <Button variant="outline" size="sm">
                                  <Compare className="h-4 w-4 mr-2" />
                                  Exportar Comparación
                                </Button>
                              </div>

                              {requerimiento.proformas.length > 0 ? (
                                <>
                                  <div className="overflow-x-auto">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Proveedor</TableHead>
                                          <TableHead>Precio</TableHead>
                                          <TableHead>Tiempo</TableHead>
                                          <TableHead>Calificación</TableHead>
                                          <TableHead>Garantía</TableHead>
                                          <TableHead>Condiciones</TableHead>
                                          <TableHead>Estado</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {requerimiento.proformas.map((proforma) => (
                                          <TableRow
                                            key={proforma.id}
                                            className={proforma.seleccionado ? "bg-green-50" : ""}
                                          >
                                            <TableCell className="font-medium">{proforma.proveedor}</TableCell>
                                            <TableCell className="font-bold">
                                              S/{proforma.precio.toLocaleString()}
                                            </TableCell>
                                            <TableCell>{proforma.tiempoEntrega}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center gap-1">
                                                {renderStars(proforma.calificacion)}
                                                <span className="text-sm ml-1">{proforma.calificacion}</span>
                                              </div>
                                            </TableCell>
                                            <TableCell>{proforma.garantia}</TableCell>
                                            <TableCell>{proforma.condiciones}</TableCell>
                                            <TableCell>
                                              {proforma.seleccionado ? (
                                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                                  Seleccionado
                                                </Badge>
                                              ) : (
                                                <Button variant="outline" size="sm">
                                                  Seleccionar
                                                </Button>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>

                                  {/* Análisis de Comparación */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Análisis de Comparación</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                          <div className="text-2xl font-bold text-green-600">
                                            S/
                                            {Math.min(...requerimiento.proformas.map((p) => p.precio)).toLocaleString()}
                                          </div>
                                          <div className="text-sm text-muted-foreground">Precio Más Bajo</div>
                                          <div className="text-xs mt-1">
                                            {
                                              requerimiento.proformas.find(
                                                (p) =>
                                                  p.precio ===
                                                  Math.min(...requerimiento.proformas.map((pr) => pr.precio)),
                                              )?.proveedor
                                            }
                                          </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                          <div className="text-2xl font-bold text-blue-600">
                                            {Math.max(...requerimiento.proformas.map((p) => p.calificacion))}
                                          </div>
                                          <div className="text-sm text-muted-foreground">Mejor Calificación</div>
                                          <div className="text-xs mt-1">
                                            {
                                              requerimiento.proformas.find(
                                                (p) =>
                                                  p.calificacion ===
                                                  Math.max(...requerimiento.proformas.map((pr) => pr.calificacion)),
                                              )?.proveedor
                                            }
                                          </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                          <div className="text-2xl font-bold text-purple-600">
                                            S/
                                            {(
                                              requerimiento.proformas.reduce((sum, p) => sum + p.precio, 0) /
                                              requerimiento.proformas.length
                                            ).toLocaleString()}
                                          </div>
                                          <div className="text-sm text-muted-foreground">Precio Promedio</div>
                                          <div className="text-xs mt-1">
                                            Diferencia: S/
                                            {(
                                              Math.max(...requerimiento.proformas.map((p) => p.precio)) -
                                              Math.min(...requerimiento.proformas.map((p) => p.precio))
                                            ).toLocaleString()}
                                          </div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                          <div className="text-2xl font-bold text-orange-600">
                                            {requerimiento.proformas.filter((p) => p.seleccionado).length > 0
                                              ? "S/" +
                                                requerimiento.proformas
                                                  .find((p) => p.seleccionado)
                                                  ?.precio.toLocaleString()
                                              : "N/A"}
                                          </div>
                                          <div className="text-sm text-muted-foreground">Precio Seleccionado</div>
                                          <div className="text-xs mt-1">
                                            {requerimiento.proformas.find((p) => p.seleccionado)?.proveedor ||
                                              "Sin seleccionar"}
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </>
                              ) : (
                                <Card className="border-dashed border-2 border-gray-200">
                                  <CardContent className="p-8 text-center">
                                    <Compare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h6 className="font-medium mb-2">No hay proformas para comparar</h6>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Sube al menos 2 proformas para poder realizar una comparación
                                    </p>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setMostrarDialogoProforma({
                                          partidaId: partida.id,
                                          requerimientoId: requerimiento.id,
                                        })
                                      }
                                    >
                                      <Plus className="h-4 w-4 mr-2" />
                                      Agregar Primera Proforma
                                    </Button>
                                  </CardContent>
                                </Card>
                              )}
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {partida.requerimientos.length === 0 && (
                    <Card className="border-dashed border-2 border-gray-200">
                      <CardContent className="p-8 text-center">
                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h6 className="font-medium mb-2">No hay requerimientos registrados</h6>
                        <p className="text-sm text-muted-foreground mb-4">
                          Crea requerimientos específicos para organizar mejor el trabajo de esta partida
                        </p>
                        <Button variant="outline" onClick={() => setMostrarDialogoRequerimiento(partida.id)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Primer Requerimiento
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Diálogo para Crear/Editar Actividad */}
      <Dialog
        open={mostrarDialogoActividad !== null}
        onOpenChange={(open) => !open && setMostrarDialogoActividad(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mostrarDialogoActividad?.actividad ? "Editar" : "Crear Nueva"} Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Información Básica</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-actividad">Nombre de la Actividad *</Label>
                  <Input
                    id="nombre-actividad"
                    placeholder="Ej: Excavación y Movimiento de Tierras"
                    defaultValue={mostrarDialogoActividad?.actividad?.nombre || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable-actividad">Responsable *</Label>
                  <Select defaultValue={mostrarDialogoActividad?.actividad?.responsable || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equipo de Excavación">Equipo de Excavación</SelectItem>
                      <SelectItem value="Cuadrilla de Armado">Cuadrilla de Armado</SelectItem>
                      <SelectItem value="Equipo de Concreto">Equipo de Concreto</SelectItem>
                      <SelectItem value="Equipo de Acabados">Equipo de Acabados</SelectItem>
                      <SelectItem value="Especialistas en Estuco">Especialistas en Estuco</SelectItem>
                      <SelectItem value="Supervisión Técnica">Supervisión Técnica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion-actividad">Descripción Detallada *</Label>
                <Textarea
                  id="descripcion-actividad"
                  placeholder="Descripción completa de la actividad a realizar..."
                  defaultValue={mostrarDialogoActividad?.actividad?.descripcion || ""}
                  rows={3}
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Cronograma */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Cronograma</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha-inicio-actividad">Fecha de Inicio *</Label>
                  <Input
                    id="fecha-inicio-actividad"
                    type="date"
                    defaultValue={mostrarDialogoActividad?.actividad?.fechaInicio || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-fin-actividad">Fecha de Fin *</Label>
                  <Input
                    id="fecha-fin-actividad"
                    type="date"
                    defaultValue={mostrarDialogoActividad?.actividad?.fechaFin || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion-estimada">Duración Estimada</Label>
                  <Input id="duracion-estimada" placeholder="Ej: 7 días" readOnly className="bg-gray-50" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Estado y Progreso */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Estado y Progreso</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado-actividad">Estado de la Actividad</Label>
                  <Select defaultValue={mostrarDialogoActividad?.actividad?.estado || "Pendiente"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="En Progreso">En Progreso</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                      <SelectItem value="Pausado">Pausado</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progreso-actividad">Progreso (%)</Label>
                  <Input
                    id="progreso-actividad"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    defaultValue={mostrarDialogoActividad?.actividad?.progreso || 0}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Recursos y Costos */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Recursos y Costos (Opcional)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costo-estimado">Costo Estimado (S/)</Label>
                  <Input id="costo-estimado" type="number" placeholder="15000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recursos-necesarios">Recursos Necesarios</Label>
                  <Input id="recursos-necesarios" placeholder="Ej: 2 excavadoras, 4 operarios" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Dependencias */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Dependencias</h4>
              <div className="space-y-2">
                <Label htmlFor="actividades-previas">Actividades Previas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar actividades que deben completarse antes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ninguna">Ninguna dependencia</SelectItem>
                    <SelectItem value="excavacion">Excavación y Movimiento de Tierras</SelectItem>
                    <SelectItem value="armado">Colocación de Acero de Refuerzo</SelectItem>
                    <SelectItem value="vaciado">Vaciado de Concreto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Observaciones */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Observaciones y Notas</h4>
              <div className="space-y-2">
                <Label htmlFor="observaciones-actividad">Observaciones</Label>
                <Textarea
                  id="observaciones-actividad"
                  placeholder="Cualquier observación, restricción o nota importante sobre esta actividad..."
                  defaultValue={mostrarDialogoActividad?.actividad?.observaciones || ""}
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Criterios de Aceptación */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">Criterios de Aceptación</h4>
              <div className="space-y-2">
                <Label htmlFor="criterios-aceptacion-actividad">Criterios para Considerar Completada</Label>
                <Textarea
                  id="criterios-aceptacion-actividad"
                  placeholder="Definir los criterios específicos que deben cumplirse para considerar la actividad como completada..."
                  rows={2}
                />
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setMostrarDialogoActividad(null)}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                {mostrarDialogoActividad?.actividad ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Actualizar Actividad
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Actividad
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
