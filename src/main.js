import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Usamos `getFirestore` para la base de datos
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHU-3sZr3AOf5aD3n5BYQ4kxzTZLSxbGk",
  authDomain: "fir-cacaf.firebaseapp.com",
  projectId: "fir-cacaf",
  storageBucket: "fir-cacaf.appspot.com",
  messagingSenderId: "974401323187",
  appId: "1:974401323187:web:f3e9b636e0624f037af0c6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore (ahora usamos `getFirestore`)
const db = getFirestore(app); // Aquí inicializamos correctamente Firestore

// Exportamos `db` para poder usarlo en los demás componentes de Vue
export { db };

// Función 
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
      const usuarioActivo ={
        email: user.email,
        uid: user.uid
      }
     store.dispatch('detectarUsuario', usuarioActivo)
     console.log(usuarioActivo)
    // ...
  } else {
    console.log(user)
    store.dispatch('detectarUsuario', user)
    // User is signed out
    // ...
  } 
});
// Crear y montar la aplicación de Vue
createApp(App).use(store).use(router).mount('#app');
