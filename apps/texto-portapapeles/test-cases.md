# TextTool V2 — casos de prueba manuales

Estos casos se añadieron como guía de auditoría para evitar regresiones en las funciones de limpieza.

## 1. Preparar texto no debe borrar frases legítimas

Entrada:

```txt
Debemos compartir los resultados con el equipo.
La privacidad de los datos debe protegerse.
```

Esperado: ambas frases se conservan.

## 2. Limpiar web solo debe eliminar líneas cortas de interfaz

Entrada:

```txt
Compartir
El derecho a la privacidad es fundamental.
Leer más
Artículo principal
```

Esperado:

```txt
El derecho a la privacidad es fundamental.
Artículo principal
```

## 3. Listas: no partir una frase con inciso aislado

Entrada:

```txt
La opción a) permite exportar el texto.
```

Esperado: se conserva en una sola línea.

## 4. Listas: partir lista en una sola línea

Entrada:

```txt
1. Introducción 2. Desarrollo 3. Conclusión
```

Esperado:

```txt
1. Introducción
2. Desarrollo
3. Conclusión
```

## 5. Tabla: no convertir doble espacio aislado

Entrada:

```txt
Este texto tiene  dos espacios por accidente.
```

Esperado: no convertir a tabuladores.

## 6. Tabla: convertir columnas consistentes

Entrada:

```txt
Nombre     Edad     País
Ana        25       Cuba
Luis       31       México
```

Esperado: filas separadas por tabuladores.

## 7. Guiones: reparar palabra partida

Entrada:

```txt
informa-
ción
```

Esperado:

```txt
información
```

## 8. Guiones: conservar compuesto frecuente

Entrada:

```txt
teórico-
práctico
```

Esperado:

```txt
teórico-práctico
```

## 9. PDF: no eliminar encabezados repetidos automáticamente

Entrada con una misma línea repetida 3 veces.

Esperado: reportar posible encabezado repetido, pero conservar la línea.

## 10. Privacidad

Desactivar “Guardar localmente”, escribir texto, recargar.

Esperado: el texto no debe persistir.
