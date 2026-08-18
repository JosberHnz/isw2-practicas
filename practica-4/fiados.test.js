const { calcularMora } = require('./fiados');

// --- Mini-runner (tu framework) ---
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

// Camino feliz
test('mora de $1000 con 5 dias vencidos es 50 (5%)', () => {
  assertEqual(calcularMora(1000, 5), 50);
});

test('mora de $200 con 1 dia vencido es 10 (5%)', () => {
  assertEqual(calcularMora(200, 1), 10);
});

// Casos borde
test('0 dias vencidos => mora es 0', () => {
  assertEqual(calcularMora(1000, 0), 0);
});

test('monto 0 => mora es 0', () => {
  assertEqual(calcularMora(0, 5), 0);
});

test('monto negativo => lanza error', () => {
  let lanzo = false;
  try {
    calcularMora(-100, 5);
  } catch (e) {
    lanzo = true;
  }
  assertEqual(lanzo, true);
});

test('dias no numericos => lanza error', () => {
  let lanzo = false;
  try {
    calcularMora(1000, "cinco");
  } catch (e) {
    lanzo = true;
  }
  assertEqual(lanzo, true);
});

test('dias negativos se tratan como no vencido (mora 0)', () => {
  assertEqual(calcularMora(1000, -3), 0);
});