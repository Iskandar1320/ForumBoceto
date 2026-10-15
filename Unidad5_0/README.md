# Unidad 5 — Boceto Three.js (versión corregida)

Esta versión corrige el tamaño excesivo de los logos, la falta de texto al cambiar de momento y los posibles archivos antiguos cargados desde caché. Conserva los 13 momentos, las imágenes de referencia, la singularidad, el agujero de gusano y los controles originales.

## Ejecución

1. Descomprime el ZIP en una carpeta **nueva**.
2. Abre una terminal **dentro de esa carpeta**, donde está `index.html`.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.

Si el puerto 8000 está ocupado, usa `python -m http.server 8001` y visita `http://localhost:8001`.

Para detenerlo, usa **Ctrl + C** en la terminal.

### Controles

- `→` / `Espacio`: momento siguiente
- `←`: momento anterior
- `F`: pantalla completa
- `R`: reiniciar
- `H`: ocultar o mostrar interfaz

Los archivos JavaScript y CSS tienen nombres nuevos para impedir que el navegador cargue sus versiones anteriores. Las fotografías, logos y códigos QR siguen viniendo del sitio público de referencia y necesitan conexión a Internet.
