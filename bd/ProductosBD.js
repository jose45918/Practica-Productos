const ConectarBD = require("./ConectarBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(datosProducto){
        const sql="insert into productos values(null,'"+datosProducto.nombre+"','"+datosProducto.categoria+"','"+datosProducto.stock+"','"+datosProducto.precio+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            console.log("El producto fue registrado correctamente");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar un producto nuevo: "+error);
            console.error(sql);
        }
    }
    async mostrarProducto() {
        const sql = "select * from productos;";
        try {
            await this.conectarMySql();
            const [productoMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Se mostraron los productos correctamente");
            return (productoMySql);
        } catch (error) {
            console.error("Error al mostrar los datos: "+error);
            console.error(sql);
        }
    }
    async productoID(id) {
        const sql = "select * from usuarios where id_prod = "+id+";";
        try {
            await this.conectarMySql();
            const [[producto]] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return producto;
        } catch (error) {
            console.error("Error al consultar con id "+error);
            console.error(sql);
        }
    }
    async editarProducto(producto){
        const sql1 = `update productos set nom_prod ='${producto.nombre}', categoria ='${producto.categoria}', stock ='${producto.stock}', precio ='${producto.precio}' where id_usuario ='${producto.id_prod}';`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql1);
            await this.cerrarConexion();
            console.log("Actualizacion correcto de usuario");
        } catch (error) {
            console.error("Error al actualizar el producto: "+error);
            console.error(sql1);
        }
    }
    async borrarProducto(id){
        const sql = "delete from productos where id_prod = "+id+";";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario eliminado");
        } catch (error) {;
            console.error("Error al eliminar el producto: "+error);
            console.error(sql);
        }
    }
}

// async function prueba(){
//     var usu = new UsuarioBD();
//     await usu.nuevoUsuario();
// }

// prueba();

module.exports=ProductoBD;