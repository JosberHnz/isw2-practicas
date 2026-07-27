# Práctica 1 - Limpieza de Código

## Código original

```tsx
const asignarEquipo = async () => {
  if (equipo) {
    try {
      const equiposData = await AsyncStorage.getItem('equipos');
      if (equiposData) {
        const equipos = JSON.parse(equiposData);
        const index = equipos.findIndex((eq: Equipo) => eq.serviceTag === equipo.serviceTag);
        if (index !== -1) {
          equipos[index] = equipo;
          await AsyncStorage.setItem('equipos', JSON.stringify(equipos));
          Alert.alert('Equipo asignado correctamente');
        }
      }
    } catch (error) {
      Alert.alert('Error al asignar el equipo');
    }
  }
};
```

## Code Smells identificados

- **Anidamiento excesivo de condicionales**: existen varios `if` dentro de otros `if`, lo que dificulta la lectura.
- **Método con múltiples responsabilidades**: el método busca datos, modifica la información, guarda cambios y muestra mensajes al usuario.
- **Manejo de errores muy genérico**: el bloque `catch` no proporciona información sobre el error ocurrido.
- **Dependencia directa de AsyncStorage**: el acceso al almacenamiento está mezclado con la lógica de negocio, dificultando el mantenimiento y las pruebas.
- **Código con baja reutilización**: la lógica para obtener y actualizar equipos podría reutilizarse en otros componentes.
