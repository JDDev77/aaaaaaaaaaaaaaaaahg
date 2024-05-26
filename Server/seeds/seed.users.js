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
const imagePathAntonio = path.resolve(__dirname, "../../Client/src/assets/img/chico1.png");
const destPathAntonio = path.resolve(__dirname, "../uploads/avatars/chico1.png");

const imagePathMaria = path.resolve(__dirname, "../../Client/src/assets/img/chica1.png");
const destPathMaria = path.resolve(__dirname, "../uploads/avatars/chica1.png");

const imagePathJose = path.resolve(__dirname, "../../Client/src/assets/img/chico2.png");
const destPathJose = path.resolve(__dirname, "../uploads/avatars/chico2.png");

const imagePathCarmen = path.resolve(__dirname, "../../Client/src/assets/img/chica2.png");
const destPathCarmen = path.resolve(__dirname, "../uploads/avatars/chica2.png");

const imagePathCarla = path.resolve(__dirname, "../../Client/src/assets/img/chica3.png");
const destPathCarla = path.resolve(__dirname, "../uploads/avatars/chica3.png");

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
copyImage(imagePathAntonio, destPathAntonio);
copyImage(imagePathMaria, destPathMaria);
copyImage(imagePathJose, destPathJose);
copyImage(imagePathCarmen, destPathCarmen);
copyImage(imagePathCarla, destPathCarla);

const users = [
    { name: 'Antonio', surname: 'García', bio: 'Jubilado, amante de la jardinería y paseos al aire libre.', nick: 'antonioJardinero', email: 'antonio.garcia@example.com', password: 'securePassword', image: 'chico1.png' },
    { name: 'María', surname: 'López', bio: 'Jubilada, entusiasta del bordado y la cocina tradicional.', nick: 'mariaBordadora', email: 'maria.lopez@example.com', password: 'securePassword', image: 'chica1.png' },
    { name: 'José', surname: 'Martínez', bio: 'Jubilado, disfruta de la pesca y las tardes de dominó con amigos.', nick: 'josePescador', email: 'jose.martinez@example.com', password: 'securePassword', image: 'chico2.png' },
    { name: 'Carmen', surname: 'Gómez', bio: 'Jubilada, apasionada por la lectura y las tertulias literarias.', nick: 'carmenLectora', email: 'carmen.gomez@example.com', password: 'securePassword', image: 'chica2.png' },
    { name: 'Carla', surname: 'Ruiz', bio: 'Jubilada, dedica su tiempo al bricolaje y las manualidades.', nick: 'carlaBricolaje', email: 'carla.ruiz@example.com', password: 'securePassword', image: 'chica3.png' }
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
