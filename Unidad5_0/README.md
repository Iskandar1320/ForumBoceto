# Unidad 5 — Relevo generacional (Three.js + Vite)

Presentación generativa de **13 momentos** en Three.js para el Centro de Eventos Fórum UPB.
Mantiene la versión visual aprobada: partículas, singularidad, agujero de gusano, transiciones,
imágenes, textos oficiales, QR y logos.

## Probar localmente

Necesitas **Node.js 20.19+ o 22.12+** (recomendado: Node 22 LTS o superior).
Si tienes Node 20.15, debes actualizarlo antes de ejecutar Vite 8.

Dentro de esta carpeta `Unidad5_0`:

```bash
npm install
npm run dev
```

Abre la dirección `http://localhost:5173/` (u otra que muestre Vite).

Para generar y comprobar la versión que se publica:

```bash
npm run build
npm run preview
```

`npm run build` genera la carpeta `dist/`, que **no se sube a Git**.

## Navegación

- `→` o `Espacio`: avanzar
- `←`: volver
- `F`: pantalla completa
- `H`: ocultar/mostrar interfaz
- `R`: reiniciar

## Publicar con GitHub Actions

El workflow del ZIP se encuentra **en la raíz del repositorio**:

`.github/workflows/deploy-unidad5.yml`

Está preparado para un repositorio con esta estructura:

```text
repositorio/
├── .github/workflows/deploy-unidad5.yml
└── Unidad5_0/
    ├── index.html
    ├── main.js
    ├── styles.css
    ├── package.json
    ├── vite.config.js
    └── README.md
```

1. Copia las carpetas del ZIP a la raíz de tu repositorio (no pongas `.github` dentro de `Unidad5_0`).
2. En GitHub, entra a **Settings > Pages > Build and deployment > Source > GitHub Actions**.
3. Confirma que la rama principal se llama `main` o `master`.
4. Desde la raíz del repositorio ejecuta:

   ```bash
   git add .
   git commit -m "Unidad 5: preparar Vite y GitHub Pages"
   git push
   ```

5. En GitHub, abre **Actions**, selecciona **Publicar Unidad 5 (Vite)** y comprueba que finalice correctamente.

La dirección tendrá este formato: `https://USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.
No hay que editar la ruta base manualmente: `vite.config.js` la construye a partir del repositorio.

**Si ya hay otro workflow publicando en el mismo GitHub Pages, evita dejar ambos activos a la vez**:
GitHub Pages mantiene un solo sitio publicado por repositorio y el despliegue nuevo puede sustituir el anterior.
Este workflow publica la Unidad 5 como **sitio principal** del repositorio.

## Imágenes y recursos

Las seis fotografías, logos y códigos QR de la versión aprobada siguen enlazados
al sitio público de referencia del profesor. Necesitarás Internet para verlos.
Los elementos 3D y toda la lógica del sistema de partículas se ejecutan desde el código del proyecto.
Para independizar la entrega del sitio de referencia, en una siguiente etapa se pueden copiar
los recursos autorizados a `public/assets/` y actualizar sus rutas.

## Archivos clave

- `main.js`: los 13 momentos, sistema de partículas y transiciones 3D.
- `styles.css`: distribución y legibilidad de la interfaz.
- `index.html`: textos, logos y controles.
- `vite.config.js`: ruta base de GitHub Pages.
- `.gitattributes`: mantiene LF en archivos de código, evitando conflictos entre Windows y Linux.
- `.github/workflows/deploy-unidad5.yml`: compilación y publicación automática.
