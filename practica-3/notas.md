```markdown
# Notas - Principios SOLID aplicados

**Principio 1 (SRP - Single Responsibility Principle)**  
Cada clase tiene una única razón de cambio: validador, calculador, impresor, guardador y notificador. El método `procesar` pasó de 40 líneas a coordinar 5 objetos especializados.

**Principio 2 (OCP - Open/Closed Principle)**  
Ahora podemos agregar nuevos métodos de notificación (email, SMS) o nuevos almacenamientos (archivo, API) sin modificar `Pedido`, solo creando nuevas clases que implementen la misma interfaz.

**Principio 3 (LSP - Liskov Substitution Principle)**  
Cualquier clase que cumpla con el contrato de `guardar()` o `notificar()` puede ser inyectada sin romper el comportamiento esperado del sistema.

**Principio 5 (DIP - Dependency Inversion Principle)**  
`Pedido` depende de abstracciones (interfaces implícitas) y no de implementaciones concretas. Las dependencias (`guardador`, `notificador`) se inyectan desde el exterior.

**Principio 9 (Single Responsibility en métodos)**  
El método `procesar` ahora tiene **una sola responsabilidad**: orquestar el flujo del pedido. Cada paso delega en objetos especializados, eliminando el acoplamiento y mejorando la testabilidad.