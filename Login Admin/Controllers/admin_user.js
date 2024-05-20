// Controllers/admin.js

import { app, firebase } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById("createUserForm");

    createUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cedula = document.getElementById("cedula").value;
        const phone = document.getElementById("phone").value;
        const birthdate = document.getElementById("birthdate").value;

        try {
            // Crear usuario en Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Agregar datos adicionales a Firestore (base de datos)
            await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                email: email,
                cedula: cedula,
                phone: phone,
                birthdate: birthdate
            });

            alert('Usuario creado correctamente.');
            // Redirigir a admin.html o a donde sea necesario después de crear el usuario
            window.location.href = "admin.html";
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear usuario.');
        }
    });
});
