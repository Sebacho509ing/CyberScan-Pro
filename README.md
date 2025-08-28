# CyberScan Pro - SQL Injection Scanner

<div align="center">
  <img src="https://img.shields.io/badge/Security-SQL%20Injection%20Scanner-red?style=for-the-badge&logo=shield" alt="Security Badge">
  <img src="https://img.shields.io/badge/SQLMap-Integrated-darkred?style=for-the-badge&logo=python" alt="SQLMap">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Flask-2.3.3-green?style=for-the-badge&logo=flask" alt="Flask">
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-cyan?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite" alt="Vite">
</div>

## 🛡️ Descripción

**CyberScan Pro** es una herramienta avanzada de validación de seguridad web que integra **SQLMap** para detectar vulnerabilidades reales de inyección SQL en aplicaciones web. Con una interfaz intuitiva y moderna, proporciona análisis profesionales en tiempo real con clasificación de riesgos y reportes detallados.

### ✨ Características Principales

- 🔍 **SQLMap Integrado**: Utiliza la herramienta profesional SQLMap para análisis reales
- 🎯 **Análisis Profesional**: Escaneo real con técnicas avanzadas de penetration testing
- 📊 **Clasificación de Riesgos**: Sistema de severidad (Crítica, Alta, Media, Baja)
- 🔬 **Payloads Reales**: Muestra los payloads específicos utilizados en cada vulnerabilidad
- 🎨 **Interfaz Moderna**: Diseño oscuro profesional con animaciones fluidas
- 📱 **Responsive Design**: Optimizado para todos los dispositivos
- ⚡ **Backend Robusto**: API Flask con procesamiento asíncrono

## ⚠️ Advertencia Legal

**IMPORTANTE**: Esta herramienta utiliza SQLMap real y puede detectar vulnerabilidades reales. 

- ✅ **USO PERMITIDO**: Solo en sitios web propios o con autorización explícita
- ❌ **USO PROHIBIDO**: En sitios web sin permiso (es ilegal)
- 📚 **PROPÓSITO**: Educativo y pruebas de seguridad autorizadas

El uso indebido de esta herramienta puede constituir un delito. Los desarrolladores no se hacen responsables del mal uso.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.5.3** - Tipado estático para JavaScript
- **Tailwind CSS 3.4.1** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos y consistentes

### Backend
- **Flask 2.3.3** - Framework web de Python
- **SQLMap** - Herramienta de penetration testing para SQL injection
- **Flask-CORS** - Manejo de CORS para API
- **Threading** - Procesamiento asíncrono de escaneos

### Herramientas de Desarrollo
- **Vite 5.4.2** - Bundler y servidor de desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **Concurrently** - Ejecución simultánea de frontend y backend
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos automáticos de CSS

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- Python 3.8+
- Git
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/cyberscan-pro.git
   cd cyberscan-pro
   ```

2. **Instalar dependencias de Node.js**
   ```bash
   npm install
   ```

3. **Configurar SQLMap y dependencias de Python**
   ```bash
   python setup_sqlmap.py
   ```

4. **Iniciar la aplicación completa**
   ```bash
   npm run dev:full
   ```
   
   Esto iniciará:
   - Frontend React en `http://localhost:5173`
   - Backend Flask en `http://localhost:5000`

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Instalación Manual (Alternativa)

Si el script automático falla:

1. **Instalar dependencias de Python**
   ```bash
   cd server
   pip install -r requirements.txt
   ```

2. **Descargar SQLMap**
   ```bash
   git clone https://github.com/sqlmapproject/sqlmap.git
   ```

3. **Iniciar servicios por separado**
   ```bash
   # Terminal 1: Backend
   cd server && python app.py
   
   # Terminal 2: Frontend
   npm run dev
   ```

## 🎮 Uso de la Aplicación

### 1. Escaneo Básico
1. Ingresa la URL del sitio web a analizar
2. Verifica que el servidor esté conectado (indicador verde)
3. Haz clic en "Escanear" para iniciar el análisis con SQLMap
4. Observa el progreso en tiempo real con las fases de escaneo
5. Revisa los resultados reales clasificados por severidad

### 2. Interpretación de Resultados

#### Niveles de Severidad
- 🔴 **Crítica**: Vulnerabilidades que requieren atención inmediata
- 🟠 **Alta**: Riesgos significativos que deben ser corregidos pronto
- 🟡 **Media**: Vulnerabilidades moderadas para revisión
- 🟢 **Baja**: Problemas menores de seguridad

#### Información Detallada
- **Parámetro Vulnerable**: Qué parámetro específico es vulnerable
- **Tipo de Inyección**: Método de inyección detectado por SQLMap
- **Payload**: El código específico utilizado para explotar la vulnerabilidad
- **Ubicación**: Dónde se encontró la vulnerabilidad

### 3. Funciones Avanzadas
- **Generar Reporte**: Exporta resultados detallados
- **Nuevo Escaneo**: Reinicia el proceso para otra URL
- **Análisis Progresivo**: Seguimiento en tiempo real del escaneo SQLMap
- **Estado del Servidor**: Monitoreo de conexión con el backend

## 🏗️ Estructura del Proyecto

```
cyberscan-pro/
├── server/
│   ├── app.py              # Servidor Flask principal
│   ├── sqlmap_scanner.py   # Integración con SQLMap
│   ├── report_generator.py # Generador de reportes
│   ├── requirements.txt    # Dependencias Python
│   ├── sqlmap/            # SQLMap (descargado automáticamente)
│   └── scans/             # Resultados de escaneos
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx          # Componente principal
│   ├── services/
│   │   └── scannerService.ts # Servicio API
│   ├── main.tsx         # Punto de entrada
│   ├── index.css        # Estilos globales
│   └── vite-env.d.ts    # Tipos de Vite
├── setup_sqlmap.py      # Script de configuración automática
├── package.json         # Dependencias y scripts
├── tailwind.config.js   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
├── vite.config.ts       # Configuración de Vite
└── README.md           # Documentación
```

## 🔧 API Endpoints

### Backend Flask (Puerto 5000)

- `POST /api/scan` - Iniciar nuevo escaneo
  ```json
  {
    "url": "https://ejemplo.com",
    "risk_level": 1
  }
  ```

- `GET /api/scan/{scan_id}/status` - Obtener estado del escaneo
- `GET /api/health` - Verificar estado del servidor

## 🎨 Características de Diseño

### Paleta de Colores
- **Fondo Principal**: `bg-gray-900` - Negro profundo
- **Elementos Secundarios**: `bg-gray-800` - Gris oscuro
- **Acentos de Seguridad**: Verde neón (`text-green-400`)
- **Alertas**: Rojo (`text-red-400`), Naranja (`text-orange-400`)
- **Estado Conectado**: Verde (`bg-green-400`)
- **Estado Desconectado**: Rojo (`bg-red-400`)

### Animaciones
- **Carga Progresiva**: Barras de progreso animadas
- **Elementos Flotantes**: Efectos de fondo sutiles
- **Transiciones Suaves**: Hover states y cambios de estado
- **Indicadores Visuales**: Pulsos y rotaciones para estados activos
- **Estado del Servidor**: Indicador visual de conexión

### Iconografía
- **Shield**: Protección y seguridad
- **Search**: Funciones de escaneo
- **AlertTriangle**: Advertencias de seguridad
- **Database**: Vulnerabilidades SQL
- **Terminal**: Aspecto técnico/hacker

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Solo frontend React
npm run dev:full     # Frontend + Backend completo
npm run server       # Solo backend Flask

# Construcción
npm run build        # Construye para producción
npm run preview      # Vista previa de build

# Calidad de Código
npm run lint         # Ejecuta ESLint

# Configuración
python setup_sqlmap.py  # Configura SQLMap automáticamente
```

## ⚙️ Configuración Avanzada

### Configuración de SQLMap

Puedes ajustar los parámetros de SQLMap en `server/sqlmap_scanner.py`:

```python
comando = [
    "python", sqlmap_script, "-u", url,
    "--batch",                    # Modo no interactivo
    f"--risk={risk_level}",      # Nivel de riesgo (1-3)
    "--level=5",                 # Nivel de pruebas (1-5)
    "--random-agent",            # User-agent aleatorio
    "--output-dir", carpeta      # Directorio de salida
]
```

### Personalización
- **Colores**: Modifica `tailwind.config.js` para cambiar la paleta
- **Animaciones**: Ajusta las clases CSS en `src/App.tsx`
- **Parámetros SQLMap**: Modifica `sqlmap_scanner.py` para ajustar técnicas
- **Timeouts**: Configura tiempos de espera en `scannerService.ts`

## 🐛 Solución de Problemas

### Problemas Comunes

1. **"Servidor desconectado"**
   - Verifica que Flask esté ejecutándose en puerto 5000
   - Ejecuta `python server/app.py` manualmente
   - Revisa que las dependencias Python estén instaladas

2. **"Error al iniciar escaneo"**
   - Verifica que SQLMap esté instalado en `server/sqlmap/`
   - Ejecuta `python setup_sqlmap.py` nuevamente
   - Revisa permisos de ejecución en SQLMap

3. **"SQLMap no encontrado"**
   - Clona SQLMap manualmente: `git clone https://github.com/sqlmapproject/sqlmap.git`
   - Colócalo en `server/sqlmap/`
   - Verifica que `server/sqlmap/sqlmap.py` exista

4. **Problemas de CORS**
   - Verifica que Flask-CORS esté instalado
   - Revisa la configuración de CORS en `server/app.py`

### Logs y Debugging

- **Frontend**: Abre DevTools del navegador (F12)
- **Backend**: Los logs aparecen en la consola donde ejecutas Flask
- **SQLMap**: Los resultados se guardan en `server/scans/`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Sigue las convenciones de TypeScript
- Mantén el estilo de código con ESLint
- Prueba tanto frontend como backend
- Documenta nuevas funcionalidades
- Incluye tests cuando sea apropiado
- Respeta las consideraciones de seguridad

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔒 Consideraciones de Seguridad

⚠️ **MUY IMPORTANTE**: Esta aplicación utiliza SQLMap real y puede detectar vulnerabilidades reales.

### Uso Responsable
- ✅ Solo usar en sitios web propios
- ✅ Solo usar con autorización explícita por escrito
- ✅ Fines educativos y de investigación
- ❌ NUNCA usar en sitios web sin permiso
- ❌ NUNCA usar para actividades maliciosas

### Recomendaciones Adicionales
- Mantén SQLMap actualizado
- Usa niveles de riesgo apropiados
- Documenta todos los escaneos realizados
- Respeta los términos de servicio de los sitios web
- Considera el impacto en el rendimiento del servidor objetivo

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- 🐛 **Issues**: [GitHub Issues](https://github.com/tu-usuario/cyberscan-pro/issues)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/cyberscan-pro/discussions)
- 📧 **Email**: tu-email@ejemplo.com
- 📚 **Wiki**: Documentación adicional en el wiki del proyecto

## 🙏 Agradecimientos

- [React Team](https://reactjs.org/) por la increíble biblioteca
- [SQLMap Team](https://sqlmap.org/) por la herramienta de penetration testing
- [Flask Team](https://flask.palletsprojects.com/) por el framework web
- [Tailwind CSS](https://tailwindcss.com/) por el framework de estilos
- [Lucide](https://lucide.dev/) por los iconos modernos
- [Vite](https://vitejs.dev/) por la herramienta de desarrollo

---

<div align="center">
  <p>Hecho con ❤️ para la comunidad de ciberseguridad</p>
  <p><strong>⚠️ Usar responsablemente - Solo en sitios autorizados ⚠️</strong></p>
  <p>© 2024 CyberScan Pro. Todos los derechos reservados.</p>
</div>