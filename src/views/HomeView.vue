<template>   
  <Navbar/>
  <div class="container-fluid my-4 p-5" style="background-color: #f5f5f5; border-radius: 15px; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); width: 95%;"> <!-- Ocupa el 95% del ancho de la pantalla -->
    
    <!-- Formulario para añadir usuario -->  
    <div class="row justify-content-center mb-4"> 
      <div class="col-md-10"> <!-- Ajuste de tamaño -->
        <form>  
          <div class="input-group mb-4">
            <span class="input-group-text w-25" style="background-color: #007bff; color: white; font-weight: bold;">Nombre</span> <!-- Azul vivo -->
            <input v-model="usuario.nombre" type="text" class="form-control w-75" style="border-color: #007bff;">
          </div>
          <!-- Correo -->
          <div class="input-group mb-4">
            <span class="input-group-text w-25" style="background-color: #28a745; color: white; font-weight: bold;">Correo</span> <!-- Verde vivo -->
            <input v-model="usuario.correo" type="text" class="form-control w-75" style="border-color: #28a745;">
          </div>
          <!-- Botón Guardar -->
          <div class="d-grid gap-2">  
            <button @click.prevent="agregarDato()" class="btn btn-primary" style="background-color: #17a2b8; border-color: #17a2b8; font-weight: bold;">Guardar</button> <!-- Azul claro vibrante -->
          </div>
        </form>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="row justify-content-center">
      <div class="col-md-10"> <!-- Ajuste de tamaño -->
        <table class="table table-hover table-striped" style="background-color: #ffffff; border-radius: 15px; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1); width: 100%;"> <!-- Ampliado al 100% del contenedor -->
          <thead class="table-light" style="background-color: #ffc107; color: #333; font-weight: bold;"> <!-- Amarillo vibrante -->
            <tr>
              <th scope="col" class="text-center">ID</th> 
              <th scope="col" class="text-center">Nombre</th>
              <th scope="col" class="text-center">Correo</th>
              <th scope="col" class="text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in usuarios" :key="index" style="font-size: 1.1rem; background-color: #f1f1f1; border-radius: 10px;"> <!-- Fondo gris claro -->
              <td class="text-center">{{item.id}}</td>
              <td class="text-center">{{item.nombre}}</td>
              <td class="text-center">{{item.correo}}</td>
              <td class="text-center">
                <button @click.prevent="eliminarDato(item.id)" class="btn btn-danger" style="background-color: #dc3545; border-color: #dc3545; font-weight: bold;">Eliminar</button> <!-- Rojo vivo -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Importamos todo desde firestore
import { db } from "../main";
import router from '../router/index'; // Importamos el router

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      usuarios: [], // Lista de usuarios
      usuario: {    // Usuario para el formulario
        nombre: '',
        correo: ''
      }
    }
  },
  methods: {
    // Método para obtener usuarios
    async obtenerDatos () {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const usuariosTemp = [];
        querySnapshot.forEach((doc) => {
          let usuario = doc.data();
          usuario.id = doc.id;
          usuariosTemp.push(usuario);
        });
        this.usuarios = usuariosTemp;
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    },

    // Método para añadir un nuevo usuario
    async agregarDato() {
      if (this.usuario.nombre && this.usuario.correo) {
        try {
          await addDoc(collection(db, "usuarios"), {
            nombre: this.usuario.nombre,
            correo: this.usuario.correo
          });
          console.log("Documento añadido");
          // Limpiar el formulario
          this.usuario.nombre = '';
          this.usuario.correo = '';
          // Actualizar la lista de usuarios
          this.obtenerDatos();
          router.go('/'); // Redirigir o recargar la página
        } catch (error) {
          console.error("Error al añadir el documento: ", error);
        }
      } else {
        alert('Por favor llena ambos campos');
      }
    },

    // Método para eliminar un usuario
    async eliminarDato(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          await deleteDoc(doc(db, "usuarios", id)); // Eliminar documento en Firestore
          console.log("Documento eliminado");
          this.obtenerDatos(); // Actualizar la lista de usuarios
          router.go('/'); // Redirigir o recargar la página
        } catch (error) {
          console.error("Error al eliminar el documento: ", error);
        }
      }
    }
  },
  mounted() {
    this.obtenerDatos();
  },
}
</script>
