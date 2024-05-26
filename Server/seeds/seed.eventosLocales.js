const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/mi_redsocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

// Ruta de la imagen de origen Eventos Locales
const imagePathEventos = path.resolve(__dirname, "../../Client/src/assets/img/Icono_Eventos.png");
const destPathEventos = path.resolve(__dirname, "../uploads/avatars/Icono_Eventos.png");

// Función para copiar archivos
const copyImage = (src, dest) => {
    try {
        fs.copyFileSync(src, dest);
        console.log('Imagen copiada:', dest);
    } catch (err) {
        console.error('Error al copiar la imagen:', err);
    }
};

// Copiar la imagen a la carpeta de destino
copyImage(imagePathEventos, destPathEventos);

const users = [
    { 
        name: 'Eventos', 
        surname: 'Locales', 
        bio: 'Siguenos para saber todo lo que se cuece en la ciudad!! Nuestro grupo de telegram es: https://t.me/eventoslocales y nuestro teléfono es: 111-111-111', 
        nick: 'EVENTOS', 
        email: 'eventos@example.com', 
        password: 'securePassword', 
        image: 'Icono_Eventos.png',
        role: 'role_user'
    }
];

const ejecutar = async () => {
    try {
        for (let user of users) {
            user.password = await bcrypt.hash(user.password, 12);
        }
        await User.insertMany(users);
        console.log('Usuarios insertados correctamente');
    } catch (err) {
        console.error('Error al insertar usuarios:', err);
    } finally {
        mongoose.connection.close();
    }
};

ejecutar();
