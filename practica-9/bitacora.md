# Práctica 9 · Bitácora de sesión agéntica

## Feature elegida

**Abonos parciales que reducen el saldo antes de calcular mora.** Sobre la
calculadora de fiados de la Práctica 4 (`calcularMora`), un cliente puede
abonar parte de su deuda antes de que se le cobre mora; la mora debe
calcularse sobre el saldo pendiente, no sobre el monto original.

## 1. Tests escritos ANTES de programar (el contrato)

Archivo: `practica-9/abonos.test.js`. Se escribieron primero, contra una
función `calcularMoraConAbonos` que todavía no existía (fallaban con
`require` roto), para fijar el comportamiento esperado:

1. Un abono parcial reduce el saldo antes de calcular la mora.
2. Varios abonos se suman y se restan del monto original.
3. Abonos que superan el monto original dejan el saldo en 0 (sin mora),
   nunca negativo.
4. Sin abonos, el comportamiento es idéntico al de `calcularMora` de la
   Práctica 4 (no rompe lo ya entregado).
5. Un abono negativo lanza error (evita "inflar" el saldo con un abono
   inválido).

## 2. Prompts clave usados con el asistente de IA

1. "Necesito una función `calcularMoraConAbonos(montoOriginal, abonos,
   diasVencidos)` para mi calculadora de fiados de la práctica 4. Los
   abonos son un arreglo de números que se restan del monto original antes
   de calcular la mora. Aquí están mis 5 tests, que ya escribí primero;
   hacé que pasen." (se adjuntó `abonos.test.js`)
2. "Antes de aceptarla: ¿esta primera versión duplica alguna regla que ya
   existe en `fiados.js` de la práctica 4? ¿Está validando todos los casos
   borde de mis tests, incluido el abono negativo?"
3. "Dame una alternativa que reutilice `calcularMora` en vez de
   reimplementar el 5%, y que separe el cálculo del saldo del cálculo de
   la mora en dos funciones distintas."

## 3. Qué propuso la IA — Propuesta 1 (primer intento)

```javascript
function calcularMoraConAbonos(montoOriginal, abonos, diasVencidos) {
  let totalAbonado = 0;
  for (const abono of abonos) {
    totalAbonado += abono;
  }
  let saldo = montoOriginal - totalAbonado;
  if (saldo < 0) saldo = 0;

  if (diasVencidos > 0) {
    return saldo * 0.05;
  }
  return 0;
}

module.exports = { calcularMoraConAbonos };
```

Esta primera versión **pasaba 4 de los 5 tests**, pero no la acepté tal
cual. Forcé una segunda vuelta con el prompt 3 de arriba, en vez de
quedarme con la primera respuesta.

## 4. Mi crítica del diff (≥3 observaciones fundamentadas)

Cito los principios por el número que ya usamos en `practica-3/notas.md`
de este mismo repo, para mantener el mismo lenguaje del equipo:

1. **Duplica una regla de negocio en vez de reutilizarla (viola Principio 2
   — OCP).** La Propuesta 1 reescribe `saldo * 0.05` en vez de llamar a
   `calcularMora` de la práctica 4. Si mañana la cooperativa cambia el
   porcentaje de mora (de 5% a, digamos, 7%), habría que recordar
   modificarlo en **dos** archivos distintos, y es fácil que uno de los
   dos quede desactualizado. `notas.md` de la práctica 3 ya señala que el
   sistema debe poder extenderse "sin modificar" el código existente, solo
   componiendo piezas ya probadas — aquí se rompió eso.
2. **No valida abonos negativos (falla el test 5).** Al correr
   `abonos.test.js` contra la Propuesta 1, el test *"un abono negativo
   lanza error"* falla: un abono de `-100` se **suma** igual que uno
   positivo, lo que en la práctica **aumentaría** el saldo pendiente en
   vez de reducirlo — el comportamiento opuesto al que pide la feature.
   Rechacé esta versión por incumplir el contrato que yo mismo escribí
   antes de programar.
3. **Mezcla dos responsabilidades en una sola función (viola Principio 1 /
   Principio 9 — SRP, incluido SRP en métodos).** `calcularMoraConAbonos`
   calcula el saldo pendiente y calcula la mora en el mismo bloque, sin
   forma de reutilizar solo el cálculo del saldo (por ejemplo, para
   mostrarle a un cliente "cuánto te falta pagar" sin necesariamente
   calcular su mora). La práctica 3 de este mismo repo (`ValidadorStock`,
   `CalculadorTotal`, etc.) ya había separado responsabilidades por esta
   misma razón; la Propuesta 1 no siguió ese mismo criterio.

## 5. Qué acepté, qué corregí y por qué

- **Acepté** de la Propuesta 1: la idea de truncar el saldo a 0 cuando los
  abonos superan el monto original (`if (saldo < 0) saldo = 0`) — esa
  parte del razonamiento era correcta y la mantuve en la versión final.
- **Corregí/reemplacé**: separé el cálculo en dos funciones
  (`calcularSaldoPendiente` y `calcularMoraConAbonos`), y la segunda
  **reutiliza** `calcularMora` de la práctica 4 en vez de reimplementar el
  5%. Esto resuelve las observaciones 1 y 3.
- **Corregí**: agregué validación explícita de cada abono (debe ser un
  número y no puede ser negativo), lo que resuelve la observación 2 y hace
  pasar el test 5.
- **Rechacé** dejar la función como una sola pieza monolítica, aunque
  técnicamente era más corta — la separación de responsabilidades vale más
  aquí que ahorrarse 4 líneas, siguiendo el mismo criterio que el equipo
  ya adoptó en la práctica 3.

## 6. Resultado final

Implementación final: `practica-9/abonos.js` (funciones
`calcularSaldoPendiente` y `calcularMoraConAbonos`, reutilizando
`calcularMora` de la práctica 4).

Suite de tests (`node abonos.test.js`), corrida real:

```
✅ PASS: un abono parcial reduce el saldo antes de calcular la mora
✅ PASS: varios abonos se suman y se restan del monto original
✅ PASS: abonos que superan el monto original dejan el saldo en 0, sin mora
✅ PASS: sin abonos el comportamiento es igual al de la practica 4
✅ PASS: un abono negativo lanza error
```

5/5 tests pasando (mínimo pedido: 3-5, escritos antes de implementar).