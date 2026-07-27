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

