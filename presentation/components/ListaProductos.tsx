import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListaProductos = () => {
  const [productos, setProductos] = useState<any[]>([]);

  const agregarProducto = (producto: any) => {
    setProductos([...productos, producto]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <Text style={styles.text}>Código: {item.codigo}</Text>
            <Text style={styles.text}>Nombre: {item.nombre}</Text>
            <Text style={styles.text}>Categoría: {item.categoria}</Text>
            <Text style={styles.text}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.text}>Precio: ${item.precio}</Text>
            <Text style={styles.text}>Fecha de Ingreso: {item.fechaIngreso}</Text>
            <Text style={styles.text}>Observaciones: {item.observaciones}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  producto: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 14, marginBottom: 5 },
});

export default ListaProductos;