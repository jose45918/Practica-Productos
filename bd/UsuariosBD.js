const ConectarBD = require("./ConectarBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(datosUsuario){
        const sql="insert into usuarios values(null,'"+datosUsuario.nombre+"','"+datosUsuario.celular+"','"+datosUsuario.correo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            console.log("Crea un nuevo usuario");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar un usuario nuevo: "+error)
            console.error(sql);
        }
    }
    async mostrarUsuarios() {
        const sql = "select * from usuarios;";
        try {
            await this.conectarMySql();
            const [usuarioMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Se mostraron los datos correctamente");
            return (usuarioMySql);
        } catch (error) {
            console.error("Error al mostrar los datos: "+error);
            console.error(sql);
        }
    }
    async usuarioID(id) {
        const sql = "select * from usuarios where id_usuario = "+id+";";
        try {
            await this.conectarMySql();
            const [[usuario]] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return usuario;
        } catch (error) {
            console.error("Error al consultar con id "+error);
            console.error(sql);
        }
    }
    async editarUsuario(usuarioo){
        const sql = "update usuarios set nom_usuario = '"+usuarioo.nombre+"', cel_usuario = '"+usuarioo.celular+"', correo_usuario = '"+usuarioo.correo+"' where id_usuario= '"+usuarioo.id_usuario+"':";
        const sql1 = `update usuarios set nom_usuario ='${usuarioo.nombre}', cel_usuario ='${usuarioo.celular}', correo_usuario ='${usuarioo.correo}' where id_usuario ='${usuarioo.id_usuario}';`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql1);
            await this.cerrarConexion();
            console.log("Actualizacion correcto de usuario");
        } catch (error) {
            console.error("Error al actualizar el usuario: "+error);
            console.error(sql1);
        }
    }
    async borrarUsuario(id){
        const sql = "delete from usuarios where id_usuario = "+id+";";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario eliminado");
        } catch (error) {
            console.error("Error al eliminar el usuario: "+error);
            console.error(sql);
        }
    }
}

// async function prueba(){
//     var usu = new UsuarioBD();
//     await usu.nuevoUsuario();
// }

// prueba();

module.exports=UsuarioBD;