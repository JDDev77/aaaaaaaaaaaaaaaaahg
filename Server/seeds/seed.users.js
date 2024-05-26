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

// Ruta de la imagen de origen John
const imagePathJohn = path.resolve(__dirname, "../../Client/src/assets/img/chico1.png");
const destPathJohn = path.resolve(__dirname, "../uploads/avatars/chico1.png");
// Ruta de la imagen de origen Jane
const imagePathJane = path.resolve(__dirname, "../../Client/src/assets/img/chica1.png");
const destPathJane = path.resolve(__dirname, "../uploads/avatars/chica1.png");
// Ruta de la imagen de origen Mike
const imagePathMike = path.resolve(__dirname, "../../Client/src/assets/img/chico2.png");
const destPathMike = path.resolve(__dirname, "../uploads/avatars/chico2.png");
// Ruta de la imagen de origen Rachel
const imagePathRachel = path.resolve(__dirname, "../../Client/src/assets/img/chica2.png");
const destPathRachel = path.resolve(__dirname, "../uploads/avatars/chica2.png");
// Ruta de la imagen de origen Lesley
const imagePathLesley = path.resolve(__dirname, "../../Client/src/assets/img/chica3.png");
const destPathLesley = path.resolve(__dirname, "../uploads/avatars/chica3.png");


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
copyImage(imagePathJane, destPathJane);
copyImage(imagePathMike, destPathMike);
copyImage(imagePathRachel, destPathRachel);
copyImage(imagePathLesley, destPathLesley);
const users = [
    { name: 'John', surname: 'Doe', bio: 'Desarrollador Full Stack.', nick: 'johnFullStack', email: 'john@example.com', password: 'password123', image: 'chico1.png' },
    { name: 'Jane', surname: 'Doe', bio: 'Ingeniera de Software.', nick: 'janeEngineer', email: 'jane@example.com', password: 'password456', image: 'chica1.png' },
    { name: 'Mike', surname: 'Ross', bio: 'Analista de Sistemas.', nick: 'mikeAnalyst', email: 'mike@example.com', password: 'password789', image: 'chico2.png' },
    { name: 'Rachel', surname: 'Zane', bio: 'Desarrolladora Frontend.', nick: 'rachelFrontend', email: 'rachel@example.com', password: 'password101112', image: 'chica2.png' },
    { name: 'Lesley', surname: 'Specter', bio: 'Gerente de Proyecto.', nick: 'LesleyManager', email: 'Lesleyy@example.com', password: 'password131415', image: 'chica3.png' }
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

