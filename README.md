# 🌼 Flores Amarillas para Ti — Stray Kids & Bang Chan Edition 🐺

> **Un detalle web interactivo, estético y romántico para el 21 de Septiembre (Primavera & Flores Amarillas) con la compañía de Bang Chan y Wolf Chan.**

![Detalle Flores Amarillas Bang Chan](assets/bangchan.jpg)

---

## ✨ Características Principales

1. **🌸 Hero Section & Bienvenida:**
   - Animación de fondo continua a 60 FPS con pétalos de flores amarillas y destellos dorados suaves cayendo suavemente (usando Canvas HTML5).
   - Mascota **Wolf Chan** con su ramo de girasoles y globo de diálogo con palabras dulces.
   - Efectos de sonido relajantes y botón para silenciar o compartir.

2. **🌻 Jardín Interactivo de Flores Amarillas:**
   - Toca o haz clic en cualquier lugar del jardín para que broten nuevas flores amarillas (girasoles, margaritas y tulipanes) con animación de escala (`bloom-pop`) y confeti floral.
   - Botón *"💧 Regar Jardín (+1 Flor)"*.
   - Contador de flores con barra de progreso y desbloqueo de hitos emotivos (1 flor, 5 flores, 10 flores y 21 flores para el 21 de septiembre).

3. **🐺 Zona Stray Kids (Bang Chan & Wolf Chan):**
   - **Photocard 3D Coleccionable:** Efecto parallax 3D en tiempo real que reacciona al movimiento del mouse o al dedo en el móvil, con brillo tornasolado holográfico interactivo.
   - **Giro de Tarjeta 360°:** Al tocar la photocard, se voltea para revelar un mensaje reconfortante manuscrito de *Chan's Room*.
   - **Reproductor de Música Retro/Spotify Glass:** Incluye un sintetizador musical relajante generado en vivo con **Web Audio API** (sin necesidad de enlaces externos que fallen), ecualizador con barras animadas, botón de favoritos con corazones y selector de temas.

4. **💌 Buzón de Mensaje Secreto:**
   - Un sobre de estilo vintage con un **sello de cera dorado** que se abre en 3D al tocarlo.
   - Revela una carta con tipografía manuscrita y dedicatoria personalizada.
   - Puedes cambiar el nombre de la dedicatoria en cualquier momento haciendo clic en *"✏️ Cambiar Nombre"*.

---

## 🚀 Cómo Probarla Localmente en tu Computadora

1. Navega a la carpeta del proyecto:
   ```bash
   cd flores-amarillas-skz
   ```
2. Haz doble clic en el archivo `index.html` para abrirlo directamente en tu navegador (Chrome, Edge, Safari, Firefox).
3. ¡Listo! Puedes interactuar con el jardín, la photocard y la carta.

---

## 🌐 Cómo Subirlo a GitHub y Activar GitHub Pages (Paso a Paso)

Para que puedas enviarle un enlace web público que ella pueda abrir desde su teléfono celular:

### Paso 1: Crear un nuevo repositorio en GitHub
1. Inicia sesión en [GitHub.com](https://github.com).
2. Haz clic en el botón verde **"New"** (o ve a `github.com/new`).
3. Asigna un nombre a tu repositorio, por ejemplo: `flores-amarillas-skz` o `flores-para-ti`.
4. Déjalo como **Público (Public)**.
5. Haz clic en **"Create repository"** (no marques la casilla de añadir README, ya tenemos uno listo).

### Paso 2: Subir el proyecto desde tu terminal
Abre PowerShell o tu terminal en la carpeta `flores-amarillas-skz` y ejecuta:

```bash
# 1. Inicializar git si no lo has hecho
git init

# 2. Agregar todos los archivos
git add .

# 3. Guardar el primer commit
git commit -m "feat: detalle especial flores amarillas skz bang chan"

# 4. Cambiar a la rama main
git branch -M main

# 5. Conectar con tu repositorio de GitHub (reemplaza TU_USUARIO y TU_REPO con los tuyos)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# 6. Subir los archivos a GitHub
git push -u origin main
```

### Paso 3: Activar GitHub Pages (Enlace Web Gratuito)
1. En tu repositorio de GitHub, entra a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment** -> **Branch**:
   - Selecciona la rama **`main`**.
   - Deja la carpeta en **`/(root)`**.
   - Haz clic en **Save** (Guardar).
4. Espera aproximadamente 1 minuto y recarga la página. En la parte superior de esa misma pantalla aparecerá el enlace web de tu página:
   ```text
   https://<tu-usuario>.github.io/<nombre-del-repo>/
   ```
5. ¡Copia ese enlace y envíaselo por WhatsApp o Instagram! Le cargará de inmediato con vista móvil perfecta.

---

## 🎨 Personalización del Mensaje
Si deseas cambiar el texto de la carta de forma permanente antes de subirla:
- Abre el archivo `index.html` con cualquier editor de texto o VS Code.
- Busca la sección con el id `#letterBody` (alrededor de la línea 270) y edita las palabras con tu dedicatoria personal.
- Puedes cambiar también el nombre en `#letterRecipient`.

---

💛 *"You Make Stray Kids Stay — ¡Feliz 21 de Septiembre!"*
