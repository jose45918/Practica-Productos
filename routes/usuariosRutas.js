const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuariosBD");
const ProductoClase=require("../clases/ProductoClase");
const ProductoBD=require("../bd/ProductosBD");

ruta.get("/", async (req,res)=>{
    const usuariobd = new UsuarioBD();
    const usuariosMysql = await usuariobd.mostrarUsuarios();
    var usuariosCorrectos = [];
    usuariosMysql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);
        // console.log("Usuario 1");
        // console.log(usuario1);
        // console.log("Usuario 2");
        // console.log(usuario);
        if(usuario1.nombre != undefined && usuario1.celular != undefined && usuario1.correo != undefined){
            usuariosCorrectos.push(usuario);
        }
    });
    // console.log(usuariosCorrectos);
    res.render("mostrarUsuarios", {usuariosCorrectos});
})

ruta.get("/agregarUsuario", (req, res)=>{
    res.render("formulario");
})

ruta.post("/agregarUsuario", (req,res)=>{
    console.log(req.body);
    var usuario1=new UsuarioClase(req.body);
    if(usuario1.nombre != undefined && usuario1.celular != undefined && usuario1.correo != undefined){
        const usuariobd = new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        console.log(usuario1.mostrarDatos);
        res.redirect("/");
    }else{
        res.render("error");
    }
});

ruta.get("/editarUsuario/:id_usuario", async (req,res)=>{
    try {
        const usuariobd = new UsuarioBD();
        const usuario = await usuariobd.usuarioID(req.params.id_usuario);
        res.render("editarUsuario", usuario);
    } catch (error) {
        console.error("Error al modificar el usuario: "+error);
    }
    // res.end();
})

ruta.get("/borrarUsuario/:id_usuario", async (req,res)=>{
    try {
        const usuariobd = new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id_usuario);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

ruta.post("/editarUsuario", async (req,res)=>{
    try {
        const usuariobd = new UsuarioBD();
        console.log(req.body);
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado correctamente");
        res.redirect("/");
    } catch (error) {
        console.log("Error al editar el usuario");
    }
})

// ------------------------------------ PRODUCTOS --------------------------

ruta.get("/mostrarProductos", async (req,res)=>{
    const productobd = new ProductoBD();
    const productosMysql = await productobd.mostrarProducto();
    console.log(productosMysql);
    var productosCorrectos = [];
    productosMysql.forEach(producto => {
        var producto1 = new ProductoClase(producto);
        if(producto1.nombre != undefined && producto1.categoria != undefined && producto1.stock != undefined && producto1.precio != undefined){
            productosCorrectos.push(producto);
        }
    });
    res.render("mostrarProductos", {productosCorrectos});
})

ruta.get("/agregarProducto", (req, res)=>{
    res.render("formulario2");
})

ruta.post("/agregarProducto", (req,res)=>{
    var producto1=new ProductoClase(req.body);
    if(producto1.nombre != undefined && producto1.stock != undefined && producto1.precio != undefined){
        const productobd = new ProductoBD();
        productobd.nuevoProducto(producto1.mostrarDatos);
        res.redirect("/mostrarProductos");
    }else{
        res.render("error");
    }
});

ruta.get("/editarProducto/:id_prod", async (req,res)=>{
    try {
        const productobd = new ProductoBD();
        const producto = await productobd.productoID(req.params.id_prod);
        res.render("editarProducto", producto);
    } catch (error) {
        console.error("Error al modificar el producto: "+error);
    }
    // res.end();
})

ruta.get("/borrarProducto/:id_prod", async (req,res)=>{
    try {
        const productobd = new ProductoBD();
        await productobd.borrarProducto(req.params.id_prod);
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.log(error);
    }
})

ruta.post("/editarProducto", async (req,res)=>{
    try {
        const productobd = new ProductoBD();
        console.log(req.body);
        await productobd.editarProducto(req.body);
        console.log("Producto editado correctamente");
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.log("Error al editar el producto");
    }
})

module.exports=ruta;