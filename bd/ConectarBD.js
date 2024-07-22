require('dotenv').config();
class ConectarBD {
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        try{
             this.conexion=await this.mysql.createConnection({
                host:process.env.HOST,
                user:process.env.USER,
                password:process.env.PASSWORD,
                database:process.env.DATABASE,
                port:process.env.PORTBD
            });
            console.log("Conectado MySQL");
        } catch (error){
            console.error("Error al conectar con MySQL: "+error);
        }
    }
    async cerrarConexion(){
         try {
            await this.conexion.end();
            console.log("Conexion de MySQL terminada");
        } catch (error) {
            console.error("Error en terminar la conexion: "+error);
        }
    }
}
module.exports=ConectarBD;
// hola que hace :D