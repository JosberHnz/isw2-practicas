# Práctica 8 · Evidencia del pipeline

## Run verde en Actions

- URL del run: **[PEGAR AQUÍ el link a la pestaña Actions → tu run en verde]**
- (Opcional) Captura de pantalla: agrega aquí una imagen del run en verde,
  por ejemplo `![run verde](./run-verde.png)` si subes una captura a esta carpeta.

## URL pública viva

- URL de GitHub Pages: **[PEGAR AQUÍ la URL que te dio Settings → Pages, algo como
  https://josberhnz.github.io/isw2-practicas/]**

## Reflexión (5 líneas)

Hoy mi pipeline corre automáticamente, en cada push y pull request, todos los
archivos `*.test.js` que encuentra en el repo (por ahora solo los de la
práctica 4, ya que la práctica 5 aún no existe) usando Node.js, y falla el
build si encuentra un `❌ FAIL` en la salida en vez de mentir con un "verde"
falso. Lo próximo que agregaría es: (1) un paso de **lint** (ESLint) para
detectar estilo y errores antes de correr las pruebas, y (2) una prueba
**E2E** básica que simule el flujo completo de un pedido con fiado (crear
pedido → calcular mora → notificar) en vez de solo probar funciones
aisladas, para detectar fallos de integración que las pruebas unitarias no
ven.
