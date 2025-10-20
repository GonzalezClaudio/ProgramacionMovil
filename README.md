# Programación Móvil

## 01 - Práctica Base de React Native

---

### 01 - A: Contador + Toggle de Tema (baja)

#### 📝 Consigna
- Implementar un contador con tres acciones: **+1**, **Reset**, y **Toggle de tema (claro/oscuro)**.  
- El tema debe afectar **fondo, tipografía y tarjeta (contenedor)**.  
- El valor del contador se muestra **grande y centrado**.

#### ✅ Criterios de aceptación
- Estado inicial: `count = 0`, tema claro.  
- Tap en **+1** incrementa de a uno.  
- Tap en **Reset** vuelve a 0.  
- Tap en **Toggle** alterna estilos (colores visibles distintos).  
- La UI no se rompe en pantallas pequeñas (probar en iPhone SE / Android chico).

#### ⚙️ Restricciones
- Usar `useState` para ambos estados.  
- Estilos condicionados por el tema (no crear dos pantallas diferentes).

#### 🌟 Bonus (opcional)
- Deshabilitar **+1** al llegar a 10 y mostrar aviso.  
- Extraer `getStyles` a un `useThemeStyles()` y tipar con TypeScript.  
- Agregar `Pressable` con feedback visual en iOS/Android.

---

### 02 - B: To-Do con FlatList + Persistencia (baja/media)

#### 📝 Consigna
- Crear un **input** para agregar tareas (texto) y listarlas con `FlatList`.  
- Tap para **marcar como completada / no completada**.  
- Long press para **eliminar**.  
- **Persistir automáticamente** en `AsyncStorage`.  
- Mostrar **contador total / completadas** y **filtro** (Todas, Activas, Completadas).

#### ✅ Criterios de aceptación
- No se agregan tareas vacías (`trim`).  
- Al reiniciar la app, las tareas se restauran desde `AsyncStorage`.  
- El filtro cambia el listado sin perder estado.  
- Long press elimina inmediatamente la tarea seleccionada.  
- Performance: `keyExtractor` estable, sin warnings de keys.

#### ⚙️ Restricciones
- Estado local en el componente (sin Redux/MobX).  
- Persistencia con `@react-native-async-storage/async-storage`.

#### 🌟 Bonus (opcional)
- Confirmación de borrado con `Alert`.  
- Edición inline del título (doble tap → `TextInput`).  
- Animaciones simples al completar/eliminar (`LayoutAnimation`).

---

## 02 - 