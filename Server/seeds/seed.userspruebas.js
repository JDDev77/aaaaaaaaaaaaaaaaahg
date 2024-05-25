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

// Ruta de la imagen de origen
const imagePathJohn = path.resolve(__dirname, "../../Client/src/assets/img/949635.png");
const destPathJohn = path.resolve(__dirname, "../uploads/avatars/949635.png");

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
copyImage(imagePathJohn, destPathJohn);

const users = [
    { name: 'John', surname: 'Doe', bio: 'Desarrollador Full Stack.', nick: 'johnFullStack', email: 'john@example.com', password: 'password123', image: '949635.png' },
    { name: 'Jane', surname: 'Doe', bio: 'Ingeniera de Software.', nick: 'janeEngineer', email: 'jane@example.com', password: 'password456', image: 'default.png' },
    { name: 'Mike', surname: 'Ross', bio: 'Analista de Sistemas.', nick: 'mikeAnalyst', email: 'mike@example.com', password: 'password789', image: 'default.png' },
    { name: 'Rachel', surname: 'Zane', bio: 'Desarrolladora Frontend.', nick: 'rachelFrontend', email: 'rachel@example.com', password: 'password101112', image: 'default.png' },
    { name: 'Harvey', surname: 'Specter', bio: 'Gerente de Proyecto.', nick: 'harveyManager', email: 'harvey@example.com', password: 'password131415', image: 'default.png' }
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

