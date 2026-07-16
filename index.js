// ==========================================
// 1. IMPORTS
// ==========================================
require('dotenv').config();

const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// ==========================================
// 2. MIDDLEWARES GLOBALES
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// ==========================================
// 3. CONFIGURACIÓN DEL MOTOR DE VISTAS
// ==========================================
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// 4. DATOS (mock, en memoria)
// ==========================================

const name_brand = 'Padel Ciaga'

const welcomeMsg = 'Bienvenida a nuestra tienda'

const products = [
    {
        nombre: "Camiseta Básica",
        precio: 15,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600"
    },
    {
        nombre: "Pantalón Jeans",
        precio: 30,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1583005008627-cf9c4e1a9d6d?w=600"
    },
    {
        nombre: "Zapatos Deportivos",
        precio: 50,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1528701800489-20be8c01c1a3?w=600"
    },
    {
        nombre: "Chaqueta de Cuero",
        precio: 80,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"
    },
    {
        nombre: "Gorra Clásica",
        precio: 12,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-bf2f5f0f3e3a?w=600"
    },
    {
        nombre: "Bolso de Mano",
        precio: 45,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-43f5d6d4f00f?w=600"
    },
    {
        nombre: "Reloj Digital",
        precio: 60,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6c60d6f0f47f?w=600"
    },
    {
        nombre: "Bufanda de Lana",
        precio: 18,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6b73d6d0f0aa?w=600"
    },
    {
        nombre: "Sudadera Hoodie",
        precio: 35,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-9f25d6f0f077?w=600"
    },
    {
        nombre: "Gafas de Sol",
        precio: 25,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-fc40d6f0f0cc?w=600"
    }
];

// ==========================================
// 5. RUTAS
// ==========================================
app.route('/')
    .get((req, res) => {
        res.render("home", {
            titulo: name_brand,
            products: products,
            msg_welcome: welcomeMsg
        });
    })
    .all((req, res) => {
        res.status(405).send("Método no permitido");
    });

app.route('/about')
    .get((req, res) => {
        res.render("about", {
        });
    })
    .all((req, res) => {
        res.status(405).send("Método no permitido");
    });

app.route('/contact')
    .get((req, res) => {
        res.render("contact", {
            titulo: "Contáctanos"
        });
    })
    .post((req, res) => {
        const { nombre, email, mensaje } = req.body;

        console.log("Nuevo mensaje de contacto:", { nombre, email, mensaje });

        res.render("success", {
            nombre: nombre
        });
    })
    .all((req, res) => {
        res.status(405).send("Método no permitido");
    });

// ==========================================
// 6. MANEJO DE ERRORES (siempre al final)
// ==========================================

// 404 - Ruta que no existe
app.use((req, res) => {
    res.status(404).render("404", {
        titulo: "Página no encontrada"
    });
});

// 500 - Error inesperado del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        titulo: "Error del servidor",
        mensaje: "Algo salió mal. Intenta de nuevo más tarde."
    });
});

// ==========================================
// 7. ARRANQUE DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});