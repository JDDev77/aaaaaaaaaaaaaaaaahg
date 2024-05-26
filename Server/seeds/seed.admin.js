const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const User = require('../models/user'); 

const imagePathAdmin = path.resolve(__dirname, "../../Client/src/assets/img/admin.png");
const destPathAdmin = path.resolve(__dirname, "../uploads/avatars/admin.png");

// Set mongoose's strictQuery option to prepare for Mongoose 7
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/mi_redsocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected');
    copyImageAndExecute();
})
.catch(err => console.log(err));

// Función para copiar archivos
const copyImage = (src, dest) => {
    try {
        fs.copyFileSync(src, dest);
        console.log('Imagen copiada:', dest);
    } catch (err) {
        console.error('Error al copiar la imagen:', err);
    }
};

const copyImageAndExecute = () => {
    copyImage(imagePathAdmin, destPathAdmin);
    ejecutar();
};

const ejecutar = async () => {
    try {
        const hashedPassword = await bcrypt.hash("securePassword", 12); 

        const adminExists = await User.findOne({ email: "admin@example.com" });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        await User.create({
            name: "Admin",
            surname: "User",
            bio: "Admin bio",
            nick: "AdminNick",
            email: "admin@example.com",
            password: hashedPassword,
            role: "role_admin",
            image: "admin.png" // Nombre de la imagen
        });
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Ensure all pending operations are completed before disconnecting
        mongoose.disconnect().then(() => console.log('Disconnected from MongoDB'));
    }
};
