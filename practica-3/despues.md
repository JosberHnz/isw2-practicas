```javascript
// ============================================================
// 1. Responsabilidad: Validación de stock (S)
// ============================================================
class ValidadorStock {
  validar(items) {
    for (let item of items) {
      const stock = this.obtenerStock(item.id);
      if (stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${item.nombre}`);
      }
    }
  }
  obtenerStock(id) { /* consulta a BD */ return 10; }
}

// ============================================================
// 2. Responsabilidad: Cálculo de total (S)
// ============================================================
class CalculadorTotal {
  calcular(items) {
    const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    return subtotal * 1.15; // ISV 15%
  }
}

// ============================================================
// 3. Responsabilidad: Impresión de ticket (S)
// ============================================================
class ImpresorTicket {
  imprimir(cliente, items, total) {
    console.log("===== TICKET =====");
    console.log(`Cliente: ${cliente}`);
    for (let item of items) {
      console.log(`${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`);
    }
    console.log(`Total (con ISV): $${total}`);
    console.log("=================");
  }
}

// ============================================================
// 4. Dependencias inyectadas (D)
// ============================================================
class Pedido {
  constructor(cliente, items, validador, calculador, impresor, guardador, notificador) {
    this.cliente = cliente;
    this.items = items;
    this.validador = validador;
    this.calculador = calculador;
    this.impresor = impresor;
    this.guardador = guardador;   // inyectado
    this.notificador = notificador; // inyectado
  }

  procesar() {
    this.validador.validar(this.items);
    const total = this.calculador.calcular(this.items);
    this.guardador.guardar(this.cliente, total);
    this.impresor.imprimir(this.cliente, this.items, total);
    this.notificador.notificar(this.cliente.telefono, total);
    return total;
  }
}

// ============================================================
// 5. Implementaciones concretas (inyectables)
// ============================================================
class GuardadorDB {
  guardar(cliente, total) {
    const connection = this.getDBConnection();
    const query = `INSERT INTO pedidos (cliente, total, fecha) VALUES ('${cliente}', ${total}, NOW())`;
    connection.query(query);
  }
  getDBConnection() { /* conexión a BD */ }
}

class NotificadorWhatsApp {
  notificar(telefono, total) {
    const mensaje = `Gracias por tu compra. Total: $${total}`;
    // enviar por API de WhatsApp
  }
}

// ============================================================
// 6. Uso (composición)
// ============================================================
const pedido = new Pedido(
  cliente,
  items,
  new ValidadorStock(),
  new CalculadorTotal(),
  new ImpresorTicket(),
  new GuardadorDB(),
  new NotificadorWhatsApp()
);
pedido.procesar();