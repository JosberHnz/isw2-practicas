# Práctica 6 · Diagrama C4 de mi sistema

Sistema base: **Sistema de Ventas y Fiados** (evidenciado en `practica-3/despues.md`: clases `Pedido`, `ValidadorStock`, `CalculadorTotal`, `NotificadorWhatsApp`; y en `practica-4/fiados.js`: `calcularMora`).

## Nivel 1 · Diagrama de Contexto

```mermaid
C4Context
    title Diagrama de Contexto - Sistema de Ventas y Fiados (SVF)

    Person(vendedor, "Vendedor/Cajero", "Registra pedidos, cobra y consulta fiados")
    Person(cliente, "Cliente", "Compra productos y puede quedar fiado (crédito)")
    Person(admin, "Administrador", "Da seguimiento a mora y reportes de ventas")

    System(svf, "Sistema de Ventas y Fiados", "Registra pedidos, calcula ISV y mora, gestiona fiados")

    System_Ext(whatsapp, "WhatsApp Business API", "Mensajería externa para notificar al cliente")

    Rel(vendedor, svf, "Registra pedidos y consulta fiados", "UI")
    Rel(admin, svf, "Consulta reportes y gestiona mora", "UI")
    Rel(svf, whatsapp, "Envía notificación de compra/mora", "API HTTPS")
    Rel(whatsapp, cliente, "Entrega el mensaje", "WhatsApp")
```

## Nivel 2 · Diagrama de Contenedores

```mermaid
C4Container
    title Diagrama de Contenedores - Sistema de Ventas y Fiados (SVF)

    Person(vendedor, "Vendedor/Cajero", "Registra pedidos y cobros")
    Person(admin, "Administrador", "Gestiona fiados y reportes")

    System_Boundary(svf, "Sistema de Ventas y Fiados") {
        Container(app, "Aplicación Cliente", "React / React Native (inferido)", "UI para registrar pedidos, ver stock y consultar fiados")
        Container(api, "API de Negocio", "Node.js", "Orquesta Pedido, ValidadorStock, CalculadorTotal y calcularMora; expone endpoints REST")
        ContainerDb(db, "Base de Datos", "SQL (motor no confirmado en el repo)", "Almacena pedidos, clientes, stock y fiados")
        Container(notif, "Servicio de Notificaciones", "Node.js", "Encapsula NotificadorWhatsApp; envía mensajes vía WhatsApp API")
    }

    System_Ext(whatsapp, "WhatsApp Business API", "Mensajería externa")

    Rel(vendedor, app, "Usa", "HTTPS")
    Rel(admin, app, "Usa", "HTTPS")
    Rel(app, api, "Llama", "JSON/HTTPS")
    Rel(api, db, "Lee/Escribe", "SQL")
    Rel(api, notif, "Solicita envío de mensaje", "Llamada interna")
    Rel(notif, whatsapp, "Envía mensaje", "API HTTPS")
```

## Justificación de decisiones (atributos de calidad)

1. **Servicio de Notificaciones separado del API de Negocio**: prioricé **mantenibilidad** sobre rendimiento, porque desacoplar `NotificadorWhatsApp` permite cambiar de proveedor de mensajería sin tocar las reglas de negocio (`Pedido`, mora), tal como ya se inyectaba por interfaz en la Práctica 3.
2. **API de Negocio centralizada en un solo backend Node.js** en vez de lógica embebida en la app cliente: prioricé **mantenibilidad y testabilidad** sobre latencia mínima, porque centraliza el cálculo de ISV, stock y mora en un solo lugar y evita duplicar reglas entre plataformas, como lo confirma la suite de pruebas de `fiados.test.js`.

## Nota sobre corrección de alucinaciones de la IA

Generé el borrador con IA y corregí lo siguiente antes de dejarlo:
- La IA asumía inicialmente **MySQL** como motor de base de datos con total certeza; lo cambié a "SQL (motor no confirmado en el repo)" porque el código no especifica ningún motor concreto.
- La IA propuso un contenedor de **microservicio de pagos** que no existe en ningún archivo del repo; lo eliminé por no tener evidencia.
- Marqué "React / React Native" como **inferido** (no confirmado) en vez de afirmarlo como dato duro, ya que solo `practica-1` usa `AsyncStorage` (típico de React Native) pero no hay confirmación explícita del framework en este dominio de ventas/fiados.
