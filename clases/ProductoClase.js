
class Producto{
    constructor(producto1){
        this.id=producto1.id_prod;
        this.nombre=producto1.nom_prod;
        this.categoria=producto1.categoria;
        this.stock=producto1.stock;
        this.precio=producto1.precio;
    }
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)){
            this._nombre=nombre;
        }
    };
    set categoria(categoria){
        var regexCategoria = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexCategoria.test(categoria)){
            this._categoria=categoria;
        }
    };
    set stock(stock){
        var regexStock = /^[0-9]/;
        if (regexStock.test(stock)){
            this._stock=stock;
        }
    };
    set precio(precio){
        var regexPrecio = /^[0-9]/;
        if (regexPrecio.test(precio)){
            this._precio=precio;
        }
    };
    get id(){
        return this._id;
    };
    get nombre(){
        return this._nombre;
    };
    get categoria(){
        return this._categoria;
    };
    get stock(){
        return this._stock;
    };
    get precio(){
        return this._precio;
    };
    get mostrarDatos(){
        return {
            nombre:this.nombre,
            categoria:this.categoria,
            stock:this.stock,
            precio:this.precio
        }
    }
}

module.exports=Producto;