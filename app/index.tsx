import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import RegistroProducto from '../presentation/components/RegistroProducto';

// Define la interfaz Producto
interface Producto {
  codigo: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  precio: number;
  fechaIngreso: string;
  observaciones: string;
}

const index = () => {
  // Usa la interfaz Producto para el estado de productos
  const [productos, setProductos] = useState<Producto[]>([]);
  const [verLista, setVerLista] = useState(false);

  const agregarProducto = (producto: Producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
    setVerLista(true); // Mostrar la lista después de registrar un producto
  };

  return (
    <View style={styles.container}>
      <Text className='text-3xl text-purple-400 text-center'>Gestión de Inventario</Text>
      {!verLista ? (
        <>
          <RegistroProducto onSubmit={agregarProducto} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Lista de Productos</Text>
          <ScrollView>
            {productos.map((producto, index) => (
              <View key={index} style={styles.productoContainer}>
                <Text>Código: {producto.codigo}</Text>
                <Text>Nombre: {producto.nombre}</Text>
                <Text>Categoría: {producto.categoria}</Text>
                <Text>Cantidad: {producto.cantidad}</Text>
                <Text>Precio: {producto.precio}</Text>
                <Text>Fecha de Ingreso: {producto.fechaIngreso}</Text>
                <Text>Observaciones: {producto.observaciones}</Text>
              </View>
            ))}
          </ScrollView>
          <Button title="Agregar otro producto" onPress={() => setVerLista(false)} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productoContainer: { marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
});

export default index;