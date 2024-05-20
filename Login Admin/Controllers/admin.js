import { getAuth, signOut, deleteUser } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = '../index.html';
  }).catch((error) => {
    console.error('Error al cerrar sesión:', error);
  });
});

document.getElementById('createUser').addEventListener('click', () => {
  window.location.href = '../Templates/register.html';
});

document.getElementById('deleteUser').addEventListener('click', async () => {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Eliminar Usuario</h2>
    <form id="deleteUserForm">
      <div class="mb-3">
        <label for="deleteEmail" class="form-label">Correo Electrónico del Usuario</label>
        <input type="email" class="form-control" id="deleteEmail" required>
      </div>
      <button type="submit" class="btn btn-danger">Eliminar Usuario</button>
    </form>
  `;

  document.getElementById('deleteUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('deleteEmail').value;
    
    try {
      const usersCollection = collection(db, "users");
      const userDocs = await getDocs(usersCollection);
      let userId = null;

      userDocs.forEach((doc) => {
        if (doc.data().email === email) {
          userId = doc.id;
        }
      });

      if (userId) {
        await deleteDoc(doc(db, "users", userId));
        alert('Usuario eliminado exitosamente.');
      } else {
        alert('No se encontró el usuario con ese correo electrónico.');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  });
});

document.getElementById('viewUsers').addEventListener('click', async () => {
  const content = document.getElementById('content');
  content.innerHTML = `<h2>Usuarios Registrados</h2>`;
  const usersCollection = collection(db, "users");

  try {
    const userDocs = await getDocs(usersCollection);
    userDocs.forEach((doc) => {
      const user = doc.data();
      content.innerHTML += `
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">${user.email}</h5>
            <p class="card-text">Cédula: ${user.cedula}</p>
            <p class="card-text">Teléfono: ${user.telefono}</p>
            <p class="card-text">Fecha de Nacimiento: ${user.fechaNacimiento}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});
