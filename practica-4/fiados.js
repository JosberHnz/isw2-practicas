/**
 * Calcula la mora de un fiado.
 * Regla: 5% del monto si esta vencido (diasVencidos > 0), 0 si no.
 *
 * @param {number} monto - monto del fiado, no puede ser negativo.
 * @param {number} diasVencidos - dias de atraso.
 * @returns {number} monto de la mora.
 * @throws {Error} si monto es negativo o diasVencidos no es un numero.
 */
function calcularMora(monto, diasVencidos) {
  if (typeof monto !== 'number' || Number.isNaN(monto)) {
    throw new Error('monto debe ser un numero');
  }
  if (monto < 0) {
    throw new Error('monto no puede ser negativo');
  }
  if (typeof diasVencidos !== 'number' || Number.isNaN(diasVencidos)) {
    throw new Error('diasVencidos debe ser un numero');
  }

  if (diasVencidos > 0) {
    return monto * 0.05;
  }
  return 0;
}

module.exports = { calcularMora };