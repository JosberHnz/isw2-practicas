/**
 * Feature: abonos parciales que reducen el saldo antes de calcular mora.
 *
 * Reutiliza calcularMora de la practica-4 en vez de reimplementar el 5%,
 * para no duplicar la regla de negocio (ver bitacora.md, critica a la
 * Propuesta 1 de la IA).
 */
const { calcularMora } = require('../practica-4/fiados');

/**
 * Calcula el saldo pendiente de un fiado despues de restar sus abonos.
 * Responsabilidad unica: sumar abonos y restarlos del monto original,
 * sin conocer nada sobre mora (Principio 1 / Principio 9 - SRP).
 *
 * @param {number} montoOriginal - monto original del fiado, no negativo.
 * @param {number[]} abonos - lista de abonos, ninguno puede ser negativo.
 * @returns {number} saldo pendiente (nunca negativo).
 * @throws {Error} si montoOriginal o algun abono no son numeros validos,
 *                 o si algun abono es negativo.
 */
function calcularSaldoPendiente(montoOriginal, abonos) {
  if (typeof montoOriginal !== 'number' || Number.isNaN(montoOriginal)) {
    throw new Error('montoOriginal debe ser un numero');
  }
  if (montoOriginal < 0) {
    throw new Error('montoOriginal no puede ser negativo');
  }
  if (!Array.isArray(abonos)) {
    throw new Error('abonos debe ser un arreglo de numeros');
  }

  let totalAbonado = 0;
  for (const abono of abonos) {
    if (typeof abono !== 'number' || Number.isNaN(abono)) {
      throw new Error('cada abono debe ser un numero');
    }
    if (abono < 0) {
      throw new Error('un abono no puede ser negativo');
    }
    totalAbonado += abono;
  }

  const saldo = montoOriginal - totalAbonado;
  return saldo > 0 ? saldo : 0;
}

/**
 * Calcula la mora de un fiado tomando en cuenta sus abonos parciales.
 * Orquesta calcularSaldoPendiente + calcularMora (Principio 5 - DIP:
 * depende de la funcion ya existente, no reimplementa su regla).
 *
 * @param {number} montoOriginal
 * @param {number[]} abonos
 * @param {number} diasVencidos
 * @returns {number} monto de la mora sobre el saldo pendiente.
 */
function calcularMoraConAbonos(montoOriginal, abonos, diasVencidos) {
  const saldoPendiente = calcularSaldoPendiente(montoOriginal, abonos);
  return calcularMora(saldoPendiente, diasVencidos);
}

module.exports = { calcularSaldoPendiente, calcularMoraConAbonos };