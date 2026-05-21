"""Datos iniciales migrados desde el prototipo HTML/JS."""

BUSINESS_INFO = {
    "name": "La Cabaña",
    "tagline": "Pizza, pasta y sabor casero",
    "facebook_url": "https://www.facebook.com/pizzerialacabania/",
    "schedule": "Horario por confirmar",
}

FEATURED_DISHES = [
    {"name": "Pizza La Cabaña", "category": "Pizza", "description": "Salsa de tomate, mozzarella extra, pepperoni, jamón, tocino y chorizo.", "price": "$155 normal / $95 personal", "icon": "🍕"},
    {"name": "Pasta con albóndigas", "category": "Pasta", "description": "Pasta al dente con salsa de tomate estilo casero, hierbas y albóndigas.", "price": "Desde $120", "icon": "🍝"},
    {"name": "Ensalada fresca", "category": "Ensalada", "description": "Aguacate, crutones, queso y vegetales frescos.", "price": "Desde $95", "icon": "🥗"},
]

SERVICES = [
    {"title": "Restaurante familiar", "description": "Espacio cómodo para comer pizza, pasta y ensaladas.", "icon": "🏡"},
    {"title": "Menú digital", "description": "Consulta platillos, descripciones y precios desde la página web.", "icon": "📋"},
    {"title": "Pedidos por contacto", "description": "Estructura lista para agregar compra en línea o WhatsApp.", "icon": "🛒"},
]

MENU_CATEGORIES = [
    {"name": "Pizzas", "slug": "pizzas", "items": [
        {"name": "Pizza La Cabaña", "description": "Salsa de tomate, queso mozzarella extra, pepperoni, jamón, tocino y chorizo.", "prices": {"Normal": "$155", "Personal": "$95"}},
        {"name": "Pizza Mexicana", "description": "Salsa de frijol, mozzarella, chorizo, tocino, cebolla y chile jalapeño.", "prices": {"Normal": "$140", "Personal": "$95"}},
        {"name": "Pizza de Pepperoni", "description": "Salsa de tomate, queso mozzarella y pepperoni.", "prices": {"Normal": "$105", "Personal": "$85"}},
        {"name": "Pizza Campirana", "description": "Salsa de tomate, mozzarella, pepperoni, salchicha italiana, morrón y cebolla.", "prices": {"Normal": "$135", "Personal": "$95"}},
        {"name": "Pizza Vegetariana", "description": "Salsa de tomate, mozzarella, champiñón, morrón, cebolla y aceituna negra.", "prices": {"Normal": "$135", "Personal": "$95"}},
        {"name": "Pizza Margarita", "description": "Salsa de tomate, mozzarella, tomate, albahaca y aceite de oliva.", "prices": {"Normal": "$130", "Personal": "$95"}},
        {"name": "Pizza Hawaiana", "description": "Salsa de tomate, queso mozzarella, piña y jamón.", "prices": {"Normal": "$130", "Personal": "$95"}},
        {"name": "Pizza Rústica", "description": "Salsa de tomate, mozzarella, pepperoni, jamón, aceituna negra, cebolla y champiñón.", "prices": {"Normal": "$140", "Personal": "$95"}},
        {"name": "Pizza Pepperoni con Albahaca", "description": "Salsa de tomate, mozzarella, pepperoni y albahaca.", "prices": {"Normal": "$110", "Personal": "$85"}},
        {"name": "Pizza Tres Carnes", "description": "Salsa de tomate, mozzarella, pepperoni, tocino y salchicha italiana.", "prices": {"Normal": "$135", "Personal": "$95"}},
        {"name": "Pizza Salchicha Italiana", "description": "Salsa de tomate, queso mozzarella y salchicha italiana.", "prices": {"Normal": "$110", "Personal": "$85"}},
        {"name": "Pizza Campestre", "description": "Crema de la casa, pollo, mozzarella, cebolla morada y albahaca.", "prices": {"Normal": "$165"}},
        {"name": "Pizza Marina", "description": "Crema de la casa, camarón picosito, mozzarella, cebolla morada y cilantro.", "prices": {"Normal": "$180"}},
        {"name": "Pizza Vaquera", "description": "Salsa BBQ de la casa, pollo, mozzarella, cebolla morada y cilantro.", "prices": {"Normal": "$170"}},
    ]},
    {"name": "Pastas", "slug": "pastas", "items": [
        {"name": "Pasta con albóndigas", "description": "Pasta al dente con salsa de tomate, hierbas italianas y albóndigas.", "prices": {"Porción": "$120"}},
        {"name": "Pasta cremosa de la casa", "description": "Pasta con crema de la casa, queso y toque de ajo.", "prices": {"Porción": "$115"}},
    ]},
    {"name": "Ensaladas", "slug": "ensaladas", "items": [
        {"name": "Ensalada fresca", "description": "Mezcla de vegetales, aguacate, crutones y queso.", "prices": {"Porción": "$95"}},
        {"name": "Ensalada de la casa", "description": "Opción ligera para acompañar pizza o pasta.", "prices": {"Porción": "$85"}},
    ]},
    {"name": "Extras", "slug": "extras", "items": [
        {"name": "Ingrediente extra", "description": "Agrega más sabor a tu pizza favorita.", "prices": {"Desde": "$20"}},
        {"name": "Bebidas", "description": "Consulta disponibilidad en restaurante.", "prices": {"Desde": "$25"}},
    ]},
]
