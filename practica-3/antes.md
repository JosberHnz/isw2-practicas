# Antes - Código monolítico

```javascript
class Pedido {
  constructor(cliente, items) {
    this.cliente = cliente;
    this.items = items;
    this.total = 0;
  }

  procesar() {
    // 1. Validar stock
    for (let item of this.items) {
      const stock = this.obtenerStock(item.id);
      if (stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${item.nombre}`);
      }
    }

    // 2. Calcular total con ISV (15%)
    let subtotal = 0;
    for (let item of this.items) {
      subtotal += item.precio * item.cantidad;
    }
    this.total = subtotal * 1.15;

    // 3. Guardar en base de datos
    const connection = this.getDBConnection();
    const query = `INSERT INTO pedidos (cliente, total, fecha) VALUES ('${this.cliente}', ${this.total}, NOW())`;
    connection.query(query);

    // 4. Imprimir ticket
    console.log("===== TICKET =====");
    console.log(`Cliente: ${this.cliente}`);
    for (let item of this.items) {
      console.log(`${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`);
    }
    console.log(`Total (con ISV): $${this.total}`);
    console.log("=================");

    // 5. Enviar WhatsApp al cliente
    const mensaje = `Gracias por tu compra. Total: $${this.total}`;
    this.enviarWhatsApp(this.cliente.telefono, mensaje);

    return this.total;
  }

  obtenerStock(id) { /* simula consulta a BD */ return 10; }
  getDBConnection() { /* retorna conexión a BD */ }
  enviarWhatsApp(telefono, mensaje) { /* envía mensaje por API */ }
}