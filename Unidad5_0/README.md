# Unidad 5 — Boceto Three.js

Boceto conceptual de la presentación generativa **“Relevo generacional: la ventaja que nadie está aprovechando”**.

Esta versión conserva la narrativa 3D de singularidad, órbitas y agujero de gusano, pero ya usa el **texto en español de los 13 momentos de la presentación de referencia** y muestra las **imágenes de referencia en los momentos 02, 04, 05, 08, 12 y 13**. También incluye los logos de Fórum / 90 años y los QR del cierre.

## Cómo abrirlo

Por usar módulos ES de Three.js, ábrelo desde un servidor local.

### Python

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

Para detener el servidor vuelve a la terminal y presiona:

```text
Ctrl + C
```

Si un puerto quedó ocupado en Windows:

```bash
netstat -ano | findstr :8000
```

Toma el PID que aparece al final y ciérralo con:

```bash
taskkill /PID NUMERO_DEL_PID /F
```

### Node

```bash
npx serve .
```

## Controles

- `→` o `Espacio`: siguiente momento
- `←`: momento anterior
- `F`: pantalla completa
- `R`: volver al momento 01
- `H`: ocultar/mostrar interfaz

## Estructura

- `index.html`: interfaz, marca, QR y canvas.
- `styles.css`: tipografía, imágenes y UI superpuesta.
- `main.js`: escena 3D, partículas, 13 estados, cámara y transiciones.

## Nota de prototipo

Three.js se carga desde CDN y las imágenes de referencia se cargan temporalmente desde la presentación pública del profesor. Por eso esta versión necesita conexión a Internet. Para la entrega final conviene guardar los recursos suministrados para la actividad dentro del propio repositorio y evitar dependencias externas.
