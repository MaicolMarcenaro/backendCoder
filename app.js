import express from 'express';
import ProductManager from './ProductManager.js';

const app= express();
app.use(express.urlencoded({ extended:true }))

const classProducts = new ProductManager("./products.json")
const products= classProducts.getProductsPlain()
console.log(products)

app.get('/', (req, res)=>{
    res.send('Inicio de la app');
});
app.get('/products', (req, res)=>{
    const {limit} = req.query
    if (!limit) {
        res.json(products);
    } else {
        const productsLimited = [];
        for (let i = 0; i < limit; i++) {
            productsLimited.push(products[i])
        }
        res.json(productsLimited)
    }
    
});
app.get('/products/:idProduct', (req, res)=>{
    const {idProduct} = req.params
    const userFiltrado = products.find(u=>u.id === parseInt(idProduct))
    if (!userFiltrado) {
        res.send("Producto no existe")
    } else {
        res.json(userFiltrado);
    }
    
});

app.listen(8080, ()=>{
    console.log('Corriendo server en puerto 8080')
})