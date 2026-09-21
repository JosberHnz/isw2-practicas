const { calcularMoraConAbonos } = require('./abonos');

// --- Mini-runner (mismo framework que practica-4) ---
function test(nombre, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${nombre}`);
  } catch (e) {
    console.log(`❌ FAIL: ${nombre} -> ${e.message}`);
  }
}

function assertEqual(actual, esperado) {
  if (actual !== esperado) {
    throw new Error(`esperado ${esperado}, obtuve ${actual}`);
  }
}
// --- Fin del runner ---

// Estos tests se escribieron ANTES de programar la implementación (TDD).
// Definen el contrato de "abonos parciales que reducen el saldo antes de calcular mora".

test('un abono parcial reduce el saldo antes de calcular la mora', () => {
  // monto 1000, abono 400 => saldo 600, mora 5% de 600 = 30
  assertEqual(calcularMoraConAbonos(1000, [400], 5), 30);
});

test('varios abonos se suman y se restan del monto original', () => {
  // monto 1000, abonos 300+200=500 => saldo 500, mora 5% de 500 = 25
  assertEqual(calcularMoraConAbonos(1000, [300, 200], 5), 25);
});

test('abonos que superan el monto original dejan el saldo en 0, sin mora', () => {
  // monto 1000, abonos 700+500=1200 => saldo no puede ser negativo, se trunca a 0
  assertEqual(calcularMoraConAbonos(1000, [700, 500], 5), 0);
});

test('sin abonos el comportamiento es igual al de la practica 4', () => {
  // arreglo vacio de abonos => se comporta igual que calcularMora(1000, 5)
  assertEqual(calcularMoraConAbonos(1000, [], 5), 50);
});

test('un abono negativo lanza error', () => {
  let lanzo = false;
  try {
    calcularMoraConAbonos(1000, [-100], 5);
  } catch (e) {
    lanzo = true;
  }
  assertEqual(lanzo, true);
});