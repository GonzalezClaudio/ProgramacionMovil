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

## 02 - TP2: API Pública + QR

---

### 02 - A: Fetch a API pública + Búsqueda + Pull-to-refresh (media)

#### 📝 Consigna
- Consumir datos desde la API pública: `https://pokeapi.co/api/v2/pokemon?limit=50`.
- Mostrar estado de **carga** (spinner o skeleton) y **errores de red**.
- Agregar un **TextInput** para filtrar resultados por nombre (filtrado en cliente).
- Implementar **pull-to-refresh** que vuelva a hacer fetch de la lista.
- Mantener el texto de búsqueda aplicado tras el refresh.

#### ✅ Criterios de aceptación
- Al abrir la app, se muestra un **ActivityIndicator** hasta que termina el fetch.
- Ante error de red, se muestra un mensaje visible y permite reintentar con pull-to-refresh.
- El filtro es **case-insensitive** y filtra en tiempo real.
- Al refrescar la lista, el estado vuelve a “no refrescando” cuando se completa la carga.

#### ⚙️ Restricciones
- Usar **fetch nativo** y **useEffect** para la carga inicial.
- Optimizar el filtrado usando **useMemo** o técnica similar (mínimo 50 ítems).

#### 🌟 Bonus (opcional)
- Implementar **paginación** (next / previous) utilizando el campo `next` de la API.
- Mostrar un indicador de **“sin resultados”** cuando no haya coincidencias.
- Agregar **cacheo en memoria** para evitar flicker de loading entre páginas.

---

### 02 - B: Aplicación de accesos por QR (media)

#### 📝 Consigna
- Campo de texto para ingresar el valor a codificar.
- Renderizar el **QR code** con `react-native-qrcode-svg`.
- Botón **Escanear** (Expo) que solicita permisos y abre el **scanner** (`expo-barcode-scanner`).
- Al escanear, mostrar el valor leído y cerrar el scanner.

#### ✅ Criterios de aceptación
- El QR se **actualiza en tiempo real** al cambiar el texto.
- Si la cámara **no tiene permisos**, se muestra un mensaje claro.
- El scanner ocupa un área visible y **vuelve a la vista normal** al detectar un código.
- El **último valor escaneado** permanece visible en pantalla.

#### ⚙️ Restricciones
- Dependencias: `react-native-qrcode-svg` y, si se usa Expo, `expo-barcode-scanner`.
- Manejar el **estado de permisos y errores** sin que la app se crashee.

#### 🌟 Bonus (opcional)
- Botón **Copiar** el último valor escaneado al portapapeles.
- Validar formato de pago: `PAY:<id>|<monto>|ARS` y mostrarlo parseado.
- Guardar **historial de escaneos** usando `AsyncStorage`.


## 03 - TP3: App de Conferencias de Cerveceros Artesanales 🍺

---

### 📝 Consigna

Se necesita crear una **aplicación mobile** que permita visualizar las conferencias de un evento de **cerveceros artesanales**.  
La app debe mostrar la información de cada conferencia, permitir acceder al detalle y ver la ubicación de las mismas en un mapa.

---

### 🎯 Requerimientos

1. Ver un listado (grilla) de **10 conferencias diferentes**, con:
   - Imagen representativa.  
   - Nombre o título de la conferencia.  
   - Nombre del disertante.  
   - Horario de inicio y finalización.  

2. Al seleccionar una conferencia:
   - Ver un **detalle completo**, con toda la información relevante.  

3. Acceder a un **mapa del lugar de las conferencias** utilizando la API de **Google Maps**.

---

### ⚙️ Estructura técnica

- La app debe ser desarrollada con **React Native**.  
- Utilizar una **base de datos local** del dispositivo para manejar los datos (por ejemplo, SQLite o almacenamiento local simulado).  
- La navegación entre pantallas debe implementarse con **React Navigation**, incluyendo:
  - Pantalla de listado de conferencias.  
  - Pantalla de detalle.  
  - Pantalla de mapa.  

---

### 🌟 Bonus (opcional)

- Agregar marcadores personalizados en el mapa para cada conferencia.  
- Implementar búsqueda o filtrado de conferencias por disertante o tema.  
- Aplicar un diseño visual consistente (colores, tipografía y espaciado uniforme).  
- Mostrar mensajes o feedback visual al no haber datos o errores de carga.
