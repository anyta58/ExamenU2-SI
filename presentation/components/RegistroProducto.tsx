import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import useFormulario from '../hooks/useFormulario';

const categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Medicina'];
const codigosExistentes = ['ABC123', 'XYZ789']; // Simulación de códigos únicos

const RegistroProducto = () => {
  const { values, errors, handleChange, handleSubmit, isValid } = useFormulario({
    initialValues: {
      codigo: '',
      nombre: '',
      categoria: '',
      cantidad: '',
      precio: '',
      fechaIngreso: '',
      observaciones: ''
    },
    validate: (values) => {
      let errors: any = {};
      
      if (!values.codigo || values.codigo.length > 10 || codigosExistentes.includes(values.codigo)) {
        errors.codigo = 'Código inválido o ya existe';
      }
      if (!values.nombre || values.nombre.length < 3) {
        errors.nombre = 'Debe tener al menos 3 caracteres';
      }
      if (!values.cantidad || isNaN(Number(values.cantidad)) || Number(values.cantidad) < 1) {
        errors.cantidad = 'Debe ser un número entero positivo';
      }
      if (!values.precio || isNaN(Number(values.precio)) || Number(values.precio) <= 0) {
        errors.precio = 'Debe ser un número positivo';
      }
      return errors;
    },
  });

  const [fecha, setFecha] = useState(new Date());

  const onChangeFecha = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fecha;
    setFecha(currentDate);
    handleChange('fechaIngreso', currentDate.toLocaleDateString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Código de Producto</Text>
      <TextInput style={styles.input} value={values.codigo} onChangeText={(text) => handleChange('codigo', text)} />
      {errors.codigo && <Text style={styles.error}>{errors.codigo}</Text>}

      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} value={values.nombre} onChangeText={(text) => handleChange('nombre', text)} />
      {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

      <Text style={styles.label}>Categoría</Text>
      <Picker selectedValue={values.categoria} onValueChange={(itemValue) => handleChange('categoria', itemValue)}>
        <Picker.Item label="Seleccione una categoría" value="" />
        {categorias.map((cat) => <Picker.Item key={cat} label={cat} value={cat} />)}
      </Picker>

      <Text style={styles.label}>Cantidad</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={values.cantidad} onChangeText={(text) => handleChange('cantidad', text)} />
      {errors.cantidad && <Text style={styles.error}>{errors.cantidad}</Text>}

      <Text style={styles.label}>Precio Unitario</Text>
      <TextInput style={styles.input} keyboardType="decimal-pad" value={values.precio} onChangeText={(text) => handleChange('precio', text)} />
      {errors.precio && <Text style={styles.error}>{errors.precio}</Text>}

      <Text style={styles.label}>Fecha de Ingreso</Text>
      <DateTimePicker
        value={fecha}
        mode="date"
        display="default"
        onChange={onChangeFecha}
      />

      <Text style={styles.label}>Observaciones</Text>
      <TextInput style={styles.input} value={values.observaciones} onChangeText={(text) => handleChange('observaciones', text)} multiline numberOfLines={4} />

      <Button title="Registrar Producto" onPress={handleSubmit} disabled={!isValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', fontSize: 12 },
});

export default RegistroProducto;