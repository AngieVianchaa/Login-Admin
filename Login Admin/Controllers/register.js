import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const confirmEmail = document.getElementById('confirmEmail').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const cedula = document.getElementById('cedula').value;
  const telefono = document.getElementById('telefono').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;

  if (email !== confirmEmail) {
    alert('Los correos electrónicos no coinciden.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        cedula: cedula,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento
      });
      alert('Usuario registrado exitosamente!');
      document.getElementById('registerForm').reset();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error: ' + errorMessage);
    });
});

