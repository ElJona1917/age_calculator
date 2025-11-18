# 📅 Age Calculator

Una calculadora de edad desarrollada en HTML, CSS y JavaScript que permite obtener la diferencia exacta en **años, meses y días** a partir de una fecha de nacimiento.  
Incluye validaciones completas, mensajes de error dinámicos y animación en los resultados.

---

## 🚀 Funcionalidades principales

### ✔️ Validación avanzada
La app verifica:

- Campos vacíos
- Formato numérico válido
- Día entre 1 y 31
- Mes entre 1 y 12
- Fechas inexistentes (como 30/02)
- Años bisiestos
- Fecha no futura

Los mensajes de error se muestran justo debajo del campo correspondiente.

---

## 🧮 Cálculo de edad

El sistema calcula:

- **Años**
- **Meses**
- **Días**

Corrigiendo automáticamente cuando:

- El mes actual es menor al mes de nacimiento
- El día actual es menor al día de nacimiento

---

## 🎞️ Animación

Los valores finales se muestran mediante una animación que cuenta desde **0 → valor final** para:

- Años  
- Meses  
- Días  

Función usada: `animateValue()`.


---

## 📁 Archivos

### **index.html**
Estructura visual, formularios, etiquetas, mensajes de error y contenedores.

### **style.css**
Diseño general, layout, colores, estilos de error, animaciones básicas y responsive.

### **app.js**
- Validaciones
- Cálculo de edad
- Animación de resultados
- Actualización de interfaz
- Manejo de errores

---

## 🌐 Deploy con GitHub Pages

Puedes ver el proyecto desplegado en:

https://eljona1917.github.io/age_calculator/
