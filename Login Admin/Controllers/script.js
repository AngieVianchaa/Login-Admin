import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase"; // Importa tu configuración de Firebase

const auth = getAuth(app);

// Escucha el evento submit del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    // Obtén los valores de correo electrónico y contraseña
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Inicia sesión con correo electrónico y contraseña
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso, redirige a admin.html
        window.location.href = "../Templates/admin.html";
      })
      .catch((error) => {
        // Si hay un error durante el inicio de sesión, muestra un mensaje de error
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error: ' + errorMessage);
      });
});

// Configura el proveedor de Google
const googleProvider = new GoogleAuthProvider();

// Escucha el evento click del botón de inicio de sesión con Google
document.getElementById('googleLoginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del botón

    // Inicia sesión con Google
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Inicio de sesión exitoso, redirige a admin.html
        window.location.href = "../Templates/admin.html";
      })
      .catch((error) => {
        // Si hay un error durante el inicio de sesión, muestra un mensaje de error
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error: ' + errorMessage);
      });
});

  