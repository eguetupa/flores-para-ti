# 📋 Historial de Cambios y Bitácora de Desarrollo

## 📅 [2026-09-21] — Lanzamiento de la Aplicación Interactiva "Flores Amarillas & Stray Kids (Bang Chan / Wolf Chan Edition)"

### 1. Resumen Ejecutivo
Desarrollo y entrega de una aplicación web interactiva, moderna y estética para el 21 de septiembre (Primavera / Día de las Flores Amarillas), diseñada especialmente como detalle conmemorativo con temática de Stray Kids (Bang Chan & Wolf Chan). La solución está construida sin dependencias pesadas (HTML5, Tailwind CSS por CDN, Canvas nativo y Vanilla JS) y optimizada para ser desplegada en GitHub Pages para su visualización perfecta en dispositivos móviles y de escritorio.

### 2. Detalle Técnico por Módulo
* **Canvas de Partículas y Pétalos (Rendimiento 60 FPS):**
  - Motor de renderizado en Canvas HTML5 que gestiona la física de pétalos amarillos flotantes y destellos dorados con oscilación senoidal suave y ciclo de vida infinito.
* **Jardín Interactivo de Flores Amarillas:**
  - Sistema de generación de flores SVG (girasoles, margaritas, tulipanes dorados) con efecto *bloom pop* y dispersión de confeti floral en coordenadas del cursor o toque táctil.
  - Contador de flores con barra de progreso dinámica y sistema de hitos emotivos (1, 5, 10 y 21 flores de primavera).
* **Zona Stray Kids — Photocard 3D & Chan's Room:**
  - Tarjeta coleccionable 3D con efecto parallax (*tilt* con aceleración basada en el cursor/toque) y capa de refracción holográfica tornasolada dinámica.
  - Mecanismo de giro 360° para alternar entre el anverso (Bang Chan sosteniendo flores amarillas) y el reverso (mensaje reconfortante manuscrito de Chan's Room).
* **Reproductor Lo-Fi con Sintetizador Web Audio API:**
  - Reproductor con interfaz retro / Spotify Glass que genera acordes lo-fi acústicos reales (Cmaj9, Am9, Fmaj7, Gsus4) mediante osciladores analógicos sintetizados sin depender de archivos de audio externos.
  - Ecualizador de barras dinámicas, barra de progreso y selector de canciones.
* **Buzón Secreto con Sello de Cera:**
  - Sobre interactivo con solapa 3D plegable que se abre al tocar el lacre dorado, revelando una dedicatoria personalizada con tipografía manuscrita y persistencia en `localStorage`.

### 3. Archivos Intervenidos
* `index.html`: Estructura semántica, metadata OpenGraph, diseño glassmorphism y secciones modulares.
* `style.css`: Clases de diseño *coquette / k-pop aesthetic*, gradientes holográficos, física de transformación 3D y reglas de animación.
* `script.js`: Lógica de animación de partículas, sintetizador Web Audio API, gestor del jardín y cálculo de física de la photocard.
* `assets/bangchan.jpg`: Ilustración/fotografía de alta resolución de Bang Chan con flores amarillas para la photocard coleccionable.
* `assets/wolfchan.jpg`: Ilustración chibi 3D de Wolf Chan con ramo de girasoles y lazo rosa.
* `README.md`: Guía de despliegue paso a paso en GitHub y activación de GitHub Pages.
* `docs/HISTORIAL_CAMBIOS.md`: Bitácora y registro formal de cambios según el protocolo de arquitectura.

### 4. Procedimiento de Despliegue (GitHub Pages)
1. Inicializar repositorio local: `git init`
2. Agregar archivos: `git add .`
3. Confirmar commit inicial: `git commit -m "feat: release flores amarillas skz bang chan edition"`
4. Vincular con GitHub: `git remote add origin https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>.git`
5. Subir a la rama principal: `git push -u origin main`
6. En GitHub: Acceder a **Settings** -> **Pages** -> Seleccionar rama `main` / `root` y hacer clic en **Save**. En 1 minuto se genera el enlace HTTPS público.

---

## 📅 [2026-09-21] — Personalización Emotiva & Dedicatoria para Gabriela Reggio ("Bombón")

### 1. Resumen Ejecutivo
Inyección de datos biográficos y emotivos para la destinataria: Gabriela Reggio (apodada cariñosamente "bombón"). Se integraron referencias específicas a su pasión por el arte en uñas, sus outfits aesthetic en tonos neutros relajantes, su dinámica tierna al "ponerse chiquita" frente al cariño, y la explicación sincera y simpática sobre por qué este detalle es un jardín digital frente a las limitaciones de un delivery convencional al trabajo.

### 2. Detalle Técnico por Módulo
* **Hero & Diálogo de Wolf Chan:**
  - Actualización del encabezado y del globo de diálogo interactivo de Wolf Chan para saludar directamente a "bombón", mencionando su amor por hacer uñas y su estilo relajante.
* **Hitos del Jardín Interactivo (`script.js`):**
  - Personalización de los hitos desbloqueables (1 flor, 5 flores, 10 flores y 21 flores) haciendo tributo a su arte, sus tonos neutros y a Gabriela Reggio.
* **Reverso de Photocard 3D (Chan's Room):**
  - Dedicatoria manuscrita personalizada de Bang Chan dirigida a Gabriela (Bombón).
* **Buzón Secreto & Carta con Sello de Cera:**
  - Redacción personalizada en tipografía manuscrita destacando su talento, su estética reconfortante, la complicidad tierna por la diferencia de edad, y la confesión honesta sobre la logística del delivery y las sospechas laborales que motivaron la creación de este jardín virtual permanente.

### 3. Archivos Intervenidos
* `index.html`: Textos del Hero, globo de Wolf Chan, reverso de la photocard y carta secreta.
* `script.js`: Hitos del jardín y protección de persistencia en `localStorage`.
* `docs/HISTORIAL_CAMBIOS.md`: Registro de la actualización.

---

## 📅 [2026-09-21] — Integración del Audio Original "Youtiful" de Stray Kids

### 1. Resumen Ejecutivo
Incorporación del archivo de audio original `assets/youtiful.mp3` (`Stray Kids Youtiful Video - Stray Kids.mp3`) dentro del reproductor musical de la aplicación. Se implementó una experiencia de audio completa con control de reproducción nativo, sincronización temporal precisa en la barra de progreso, capacidad de salto (*seeking*) interactivo y respaldo dinámico (*fallback*) al sintetizador armónico.

### 2. Detalle Técnico por Módulo
* **Reproductor de Música (`index.html` & `script.js`):**
  - Integración del elemento `<audio id="skzAudio">` con soporte multi-fuente (`assets/youtiful.mp3` y el archivo original con espacios).
  - Cálculo en tiempo real de tiempo transcurrido (`currentTime`) y duración total (`duration`) mediante eventos `timeupdate` y `loadedmetadata`.
  - Habilitación de interactividad táctil/clic en la barra de progreso (`#playerProgressContainer`) para adelantar o retroceder en la canción.
  - Sincronización del estado de silencio (*mute/unmute*) entre el control general y el elemento de audio HTML5.
* **Archivos Intervenidos:**
  - `assets/youtiful.mp3`: Copia normalizada para compatibilidad universal con servidores web y GitHub Pages.
  - `index.html`: Elemento de audio, etiquetas y contenedor interactivo de progreso.
  - `script.js`: Controladores de eventos de audio, temporizadores y lógica de reproducción.
  - `docs/HISTORIAL_CAMBIOS.md`: Documentación de cambios.

---

## 📅 [2026-09-21] — Refinamiento de Voz, Tono Natural y Espontaneidad

### 1. Resumen Ejecutivo
Ajuste profundo de la redacción en todos los componentes interactivos (diálogo de Wolf Chan, subtítulo del Hero, reverso de photocard y carta secreta). Se eliminó la enunciación mecánica o literal de los datos biográficos proporcionados por el usuario, sustituyéndola por una voz natural, espontánea, tierna y auténtica, propia de un detalle romántico sincero y no de un listado de características.

### 2. Detalle Técnico por Módulo
* **Diálogo de Wolf Chan:**
  - Redacción lúdica y cariñosa de bienvenida de la mascota, invitándola a relajarse y dejarse consentir.
* **Hero y Photocard de Bang Chan:**
  - Mensaje cálido y realista alineado con el espíritu original de *Chan's Room*.
* **Buzón Secreto (Carta Manuscrita):**
  - Transformación del texto a una conversación íntima, dulce y con humor genuino sobre las flores virtuales y la imposibilidad del delivery al trabajo.
* **Archivos Intervenidos:**
  - `index.html`: Diálogos, títulos y carta secreta.
  - `script.js`: Textos de hitos del jardín.
  - `docs/HISTORIAL_CAMBIOS.md`: Registro de bitácora.

---

## 📅 [2026-09-21] — Integración Completa de la Playlist: "Connected" y "Hug Me"

### 1. Resumen Ejecutivo
Conexión de las 2 canciones restantes solicitadas por el usuario: *"Connected"* (Bang Chan solo) y *"Hug Me"* (I.N & Bang Chan), completando la playlist de 3 pistas con audio original. Se normalizaron los nombres de archivo a `connected.mp3` y `hugme.mp3` con respaldo a sus nombres originales con espacios para garantizar total compatibilidad en la web y GitHub Pages.

### 2. Detalle Técnico por Módulo
* **Playlist Dinámica en `script.js`:**
  - Configuración de las 3 pistas completas:
    1. `Youtiful` (Stray Kids) -> `assets/youtiful.mp3`
    2. `Connected` (Bang Chan) -> `assets/connected.mp3`
    3. `Hug Me (안아줄게요)` (I.N & Bang Chan) -> `assets/hugme.mp3`
  - Sincronización instantánea de metadatos (título, artista, insignia y frase emotiva) en el DOM al cambiar de pista.
  - Avance automático al terminar cada canción y soporte de salto (*seeking*) en la barra de reproducción para todas las canciones.
* **Archivos Intervenidos:**
  - `assets/connected.mp3`: Audio normalizado de Connected.
  - `assets/hugme.mp3`: Audio normalizado de Hug Me.
  - `index.html`: Elemento de audio HTML5, identificadores dinámicos de badge y frase.
  - `script.js`: Lógica de rotación de pistas de audio real.
  - `docs/HISTORIAL_CAMBIOS.md`: Documentación de cambios.



