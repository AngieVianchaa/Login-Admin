// Controllers/user.js

document.addEventListener('DOMContentLoaded', () => {
    const deleteUserLink = document.getElementById("deleteUserLink");

    deleteUserLink.addEventListener('click', async (event) => {
        event.preventDefault();

        if (confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
            try {
                const user = firebase.auth().currentUser;
                await user.delete();
                alert('Usuario eliminado correctamente.');
                // Redirigir a index.html o a donde sea necesario después de eliminar
                window.location.href = "../index.html";
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                alert('Error al eliminar el usuario.');
            }
        }
    });

    const recoverPasswordLink = document.getElementById("recoverPasswordLink");

    recoverPasswordLink.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = prompt("Por favor, ingresa tu correo electrónico registrado:");

        if (email) {
            try {
                await firebase.auth().sendPasswordResetEmail(email);
                alert('Se ha enviado un correo electrónico para restablecer tu contraseña.');
            } catch (error) {
                console.error('Error al enviar el correo de recuperación:', error);
                alert('Error al enviar el correo de recuperación.');
            }
        }
    });

    const logoutLink = document.getElementById("logoutLink");

    logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
        
        try {
            await firebase.auth().signOut();
            alert('Sesión cerrada correctamente.');
            // Redirigir a index.html o a donde sea necesario después de cerrar sesión
            window.location.href = "../index.html";
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión.');
        }
    });
});
